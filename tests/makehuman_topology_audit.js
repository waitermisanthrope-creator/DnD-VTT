#!/usr/bin/env node
/**
 * MakeHuman/GLB topology audit.
 *
 * Usage:
 *   node tests/makehuman_topology_audit.js <base.obj> <human.glb> <target.gz> [...]
 *
 * The script intentionally does NOT copy or modify MakeHuman assets.
 * It checks whether standard MakeHuman targets can be applied directly
 * to the vertex ordering of the GLB mesh.
 */

const fs = require('fs');
const zlib = require('zlib');

function die(msg) {
  console.error('MAKEHUMAN_TOPOLOGY_AUDIT_ERROR');
  console.error(msg);
  process.exit(1);
}

function readObj(path) {
  const text = fs.readFileSync(path, 'utf8');
  let vertices = 0;
  let faces = 0;
  let firstVertex = null;
  let lastVertex = null;
  let firstFace = null;
  let lastFace = null;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line[0] === '#') continue;

    const parts = line.split(/\s+/);
    const kind = parts[0];

    if (kind === 'v') {
      if (parts.length >= 4) {
        vertices++;
        if (!firstVertex) firstVertex = parts.slice(1, 4).map(Number);
        lastVertex = parts.slice(1, 4).map(Number);
      }
    } else if (kind === 'f') {
      if (parts.length >= 4) {
        faces++;
        if (!firstFace) firstFace = parts.slice(1);
        lastFace = parts.slice(1);
      }
    }
  }

  return { vertices, faces, firstVertex, lastVertex, firstFace, lastFace };
}
function readGlb(path) {
  const b = fs.readFileSync(path);
  if (b.length < 20 || b.toString('ascii', 0, 4) !== 'glTF') die('Invalid GLB: ' + path);
  const version = b.readUInt32LE(4);
  if (version !== 2) die('Unsupported GLB version: ' + version);
  const total = b.readUInt32LE(8);
  let p = 12;
  let json = null;
  let bin = null;
  while (p + 8 <= b.length) {
    const len = b.readUInt32LE(p);
    const type = b.readUInt32LE(p + 4);
    const chunk = b.subarray(p + 8, p + 8 + len);
    if (type === 0x4e4f534a) json = JSON.parse(chunk.toString('utf8').replace(/\\0+$/, '').trim());
    if (type === 0x004e4942) bin = chunk;
    p += 8 + len;
  }
  if (!json) die('GLB has no JSON chunk');
  const componentBytes = {5121:1,5123:2,5125:4,5126:4};
  const typeCount = {SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16};
  const views = json.bufferViews || [];
  const accessors = json.accessors || [];

  function accessorData(ai) {
    const a = accessors[ai];
    if (!a) return null;
    const v = views[a.bufferView];
    if (!v || !bin) return null;
    const count = a.count || 0;
    const n = typeCount[a.type] || 1;
    const cb = componentBytes[a.componentType];
    const stride = v.byteStride || cb * n;
    const start = (v.byteOffset || 0) + (a.byteOffset || 0);
    return {a, count, n, cb, stride, start};
  }

  let positionCounts = [];
  let skinnedPrimitives = 0;
  let joints = 0;
  for (const skin of (json.skins || [])) joints = Math.max(joints, (skin.joints || []).length);
  for (const mesh of (json.meshes || [])) {
    for (const prim of (mesh.primitives || [])) {
      const pos = prim.attributes && prim.attributes.POSITION;
      if (pos != null) {
        const d = accessorData(pos);
        if (d) positionCounts.push(d.count);
      }
      if (prim.attributes && prim.attributes.JOINTS_0 != null && prim.attributes.WEIGHTS_0 != null) {
        skinnedPrimitives++;
      }
    }
  }
  return {
    bytes: b.length,
    totalLength: total,
    version,
    nodes: (json.nodes || []).length,
    meshes: (json.meshes || []).length,
    skins: (json.skins || []).length,
    joints,
    positionCounts,
    skinnedPrimitives
  };
}

function readTarget(path) {
  const raw = fs.readFileSync(path);
  let text;
  try {
    text = zlib.gunzipSync(raw).toString('utf8');
  } catch {
    text = raw.toString('utf8');
  }
  let entries = 0, maxIndex = -1, bad = 0, minIndex = Infinity;
  for (const rawLine of text.split(/\\r?\\n/)) {
    const line = rawLine.trim();
    if (!line || line[0] === '#' || line[0] === '"') continue;
    const parts = line.split(/\s+/);
    if (parts.length < 4) continue;
    const idx = Number(parts[0]);
    if (!Number.isInteger(idx) || idx < 0) { bad++; continue; }
    entries++;
    maxIndex = Math.max(maxIndex, idx);
    minIndex = Math.min(minIndex, idx);
  }
  return { entries, minIndex: entries ? minIndex : null, maxIndex, malformed: bad };
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node tests/makehuman_topology_audit.js <base.obj> <human.glb> <target.gz> [...]');
  process.exit(2);
}

const [objPath, glbPath, ...targets] = args;
for (const p of [objPath, glbPath, ...targets]) if (!fs.existsSync(p)) die('File not found: ' + p);

const obj = readObj(objPath);
const glb = readGlb(glbPath);
const targetReports = targets.map(p => ({file:p, ...readTarget(p)}));
const glbVertices = [...new Set(glb.positionCounts)];
const directCompatible =
  glbVertices.length === 1 &&
  glbVertices[0] === obj.vertices &&
  targetReports.every(t => t.malformed === 0 && (t.maxIndex < obj.vertices));

const report = {
  baseObj: obj,
  glb: {...glb, uniquePositionVertexCounts: glbVertices},
  targets: targetReports,
  directCompatible
};

console.log('MAKEHUMAN_TOPOLOGY_AUDIT');
console.log(JSON.stringify(report, null, 2));
console.log('');
console.log('RESULT:');
console.log('MakeHuman base.obj vertices:', obj.vertices);
console.log('GLB POSITION vertices:', glbVertices.join(', '));
console.log('GLB skinned primitives:', glb.skinnedPrimitives);
console.log('MakeHuman target max indices:', targetReports.map(t => t.maxIndex).join(', '));
console.log('DIRECT_COMPATIBLE:', directCompatible ? 'YES' : 'NO');

if (!directCompatible) {
  console.log('NEXT_STEP: topology/index remapping or a MakeHuman-compatible base mesh is required before direct target application.');
} else {
  console.log('NEXT_STEP: direct sparse target -> morph buffer conversion can be implemented.');
}
