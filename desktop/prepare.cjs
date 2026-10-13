'use strict';

/**
 * Stage exactly the same HTML/JS tree as the Android Gradle WebView build.
 * This directory is generated and must not be committed.
 * Run from the repository root with: npm run desktop:prepare
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const out = path.join(__dirname, 'web');
const source = name => path.join(root, name);
const target = name => path.join(out, name);

function copy(src, dst) {
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}
function copyDirectoryIfPresent(src, dst) {
  if (fs.existsSync(src)) fs.cpSync(src, dst, { recursive: true });
}
function rootFiles(exts, fn) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.isFile() && exts.has(path.extname(entry.name).toLowerCase())) fn(entry.name);
  }
}

if (!fs.existsSync(source('index.html')) || !fs.existsSync(source('app/styles.css'))) {
  throw new Error('Run from the full DnD-VTT source repository (index.html and app/ required).');
}
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
copy(source('index.html'), target('index.html'));
fs.cpSync(source('app'), target('app'), { recursive: true });

// Android Gradle/Pages move root MP3s into ambience and root PNGs into wallpapers.
copyDirectoryIfPresent(source('wallpapers'), target('wallpapers'));
copyDirectoryIfPresent(source('ambience'), target('ambience'));
rootFiles(new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.glb', '.gltf', '.bin']), name => {
  copy(source(name), target(name));
  if (['.png', '.svg'].includes(path.extname(name).toLowerCase())) {
    copy(source(name), target(path.join('wallpapers', name)));
  }
});
rootFiles(new Set(['.mp3', '.ogg', '.wav', '.flac']), name => {
  copy(source(name), target(path.join('ambience', name)));
});

// Android APK icon previews are a generated asset. Generate the same paths here
// so both old Settings.js and icon_settings_v2.js can display their images.
const gradle = fs.readFileSync(source('android/app/build.gradle'), 'utf8');
const list = gradle.match(/def launcherDiceFiles\s*=\s*\[([\s\S]*?)\]/);
if (!list) throw new Error('Cannot find launcherDiceFiles in Android build.gradle');
const diceFiles = [...list[1].matchAll(/"([^"]+)"/g)].map(match => match[1]);
const diceDir = source('app/assets/dice');
for (const [i, name] of diceFiles.entries()) {
  const src = path.join(diceDir, name);
  if (!fs.existsSync(src)) {
    console.warn('Missing optional launcher preview: ' + src);
    continue;
  }
  copy(src, target(path.join('icon_previews', 'dice_' + String(i + 1).padStart(2, '0') + '.png')));
}
const defaultIcon = source('1790788500741.png');
const fallback = path.join(diceDir, 'dice1.png');
if (fs.existsSync(defaultIcon)) copy(defaultIcon, target('icon_previews/default.png'));
else if (fs.existsSync(fallback)) copy(fallback, target('icon_previews/default.png'));

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else files.push(path.relative(out, p));
  }
}
walk(out);
console.log('Desktop webroot prepared: ' + files.length + ' files, ' + out);
