/* V755 — layered forest-fire update scene.
 * Presentation only: never owns updater state or invents progress.
 * Uses full-screen forest layers, alpha fire front and PNG dragon VFX.
 */
(function (global) {
  'use strict';

  var ASSET = './app/assets/ui/';
  var ID = 'dndForestFireUpdateScene';

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }

  function formatBytes(bytes) {
    var n = Number(bytes);
    if (!Number.isFinite(n) || n < 0) return '—';
    if (n < 1024) return Math.round(n) + ' Б';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' КБ';
    if (n < 1024 * 1024 * 1024) return (n / (1024 * 1024)).toFixed(1) + ' МБ';
    return (n / (1024 * 1024 * 1024)).toFixed(2) + ' ГБ';
  }

  function create(state) {
    var old = document.getElementById(ID);
    if (old && old.__sceneApi) return old.__sceneApi;

    var manifest = state && state.manifest || {};
    var testMode = !!(state && state.testMode);
    var totalFiles = Array.isArray(manifest.files) ? manifest.files.length : 0;
    var totalBytes = Array.isArray(manifest.files) ? manifest.files.reduce(function (sum, f) {
      return sum + Math.max(0, Number(f && f.bytes) || 0);
    }, 0) : 0;

    var overlay = document.createElement('div');
    overlay.id = ID;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Обновление приложения');
    overlay.innerHTML =
      '<style>' +
      '#' + ID + '{position:fixed;inset:0;z-index:120000;overflow:hidden;background:#111713;color:#f6ead0;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}' +
      '#' + ID + ' *{box-sizing:border-box}' +
      '#' + ID + ' .ffs-scene{position:absolute;inset:0;overflow:hidden;background:#2b3428;}' +
      '#' + ID + ' .ffs-green{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}' +
      '#' + ID + ' .ffs-burned{position:absolute;left:0;top:0;bottom:0;width:0%;overflow:hidden;transition:width .06s linear;}' +
      '#' + ID + ' .ffs-burned img{display:block;width:100vw;max-width:none;height:100%;object-fit:cover;}' +
      '#' + ID + ' .ffs-front{position:absolute;top:0;bottom:0;width:clamp(74px,13vw,190px);transform:translateX(-50%);pointer-events:none;transition:left .06s linear,opacity .18s linear;z-index:6;mix-blend-mode:normal;}' +
      '#' + ID + ' .ffs-front img{display:block;width:100%;height:100%;object-fit:fill;filter:drop-shadow(0 0 12px rgba(255,99,20,.55));}' +
      '#' + ID + ' .ffs-dragon{position:absolute;left:-3%;bottom:17%;width:min(32vw,360px);max-height:52%;object-fit:contain;animation:ffsDragon 3.8s ease-in-out infinite;filter:drop-shadow(0 14px 20px rgba(0,0,0,.42));z-index:8;transition:opacity .25s linear;}' +
      '#' + ID + ' .ffs-breath{position:absolute;left:17%;bottom:39%;width:min(45vw,560px);max-height:30%;object-fit:contain;z-index:7;transform-origin:left center;animation:ffsBreath 1.2s ease-in-out infinite;transition:opacity .25s linear;}' +
      '#' + ID + ' .ffs-vfx{position:absolute;pointer-events:none;z-index:10;}' +
      '#' + ID + ' .ffs-smoke{right:10%;bottom:27%;width:min(25vw,300px);opacity:.65;animation:ffsSmoke 7s ease-in-out infinite;}' +
      '#' + ID + ' .ffs-embers{left:25%;bottom:16%;width:58%;height:68%;opacity:.85;animation:ffsEmbers 4s linear infinite;}' +
      '#' + ID + ' .ffs-ash{right:3%;top:12%;width:48%;height:70%;opacity:.5;animation:ffsAsh 12s linear infinite;}' +
      '#' + ID + ' .ffs-vignette{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,6,.18),rgba(5,8,6,.05) 45%,rgba(5,7,5,.72));pointer-events:none;z-index:20;}' +
      '#' + ID + ' .ffs-ui{position:absolute;left:50%;bottom:4.5%;transform:translateX(-50%);width:min(760px,92vw);text-align:center;z-index:30;text-shadow:0 2px 8px #000;}' +
      '#' + ID + ' .ffs-title{font-size:clamp(20px,4vw,34px);font-weight:800;letter-spacing:.04em;margin-bottom:2px;color:#fff1c7;}' +
      '#' + ID + ' .ffs-sub{font-size:clamp(12px,2.2vw,16px);color:#dfd1b5;min-height:1.4em;}' +
      '#' + ID + ' .ffs-percent{font-size:clamp(34px,9vw,72px);line-height:.95;font-weight:900;color:#fff5d6;margin:5px 0 8px;}' +
      '#' + ID + ' .ffs-track{height:10px;border:1px solid rgba(255,235,187,.55);border-radius:999px;background:rgba(10,12,9,.68);overflow:hidden;box-shadow:0 3px 14px rgba(0,0,0,.5);}' +
      '#' + ID + ' .ffs-bar{height:100%;width:0%;background:linear-gradient(90deg,#ffcf42,#ff7b1a,#d92f10);box-shadow:0 0 18px rgba(255,108,21,.75);transition:width .08s linear;}' +
      '#' + ID + ' .ffs-meta{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:8px;font-size:12px;color:#cfc2a8;}' +
      '#' + ID + ' .ffs-actions{display:flex;justify-content:center;gap:8px;margin-top:12px;}' +
      '#' + ID + ' button{border:1px solid rgba(255,235,187,.28);border-radius:8px;padding:9px 16px;background:rgba(24,25,20,.8);color:#fff;cursor:pointer;font-weight:700;}' +
      '#' + ID + ' button.primary{background:#8e3518;border-color:#d97727;}' +
      '#' + ID + ' button:disabled{opacity:.45;cursor:default;}' +
      '@keyframes ffsDragon{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-7px) rotate(-1deg)}}' +
      '@keyframes ffsBreath{0%,100%{transform:scaleX(.96) scaleY(.96);opacity:.78}50%{transform:scaleX(1.04) scaleY(1.05);opacity:1}}' +
      '@keyframes ffsSmoke{0%,100%{transform:translate(0,0) scale(.92);opacity:.35}50%{transform:translate(-25px,-35px) scale(1.12);opacity:.72}}' +
      '@keyframes ffsEmbers{0%{transform:translate(0,15px)}100%{transform:translate(20px,-35px)}}' +
      '@keyframes ffsAsh{0%{transform:translate(0,-10px)}100%{transform:translate(-30px,50px)}}' +
      '@media(max-width:600px){#' + ID + ' .ffs-green{object-position:center center;}#' + ID + ' .ffs-burned img{object-position:center center;}#' + ID + ' .ffs-dragon{left:-9%;bottom:18%;width:40vw;max-height:46%;}#' + ID + ' .ffs-breath{left:13%;bottom:39%;width:60vw;max-height:27%;}#' + ID + ' .ffs-front{width:clamp(70px,16vw,125px);}#' + ID + ' .ffs-ui{bottom:3%;}#' + ID + ' .ffs-meta{font-size:11px;}}' +
      '</style>' +
      '<div class="ffs-scene">' +
        '<img class="ffs-green" src="' + ASSET + 'forest_green.jpg" alt="">' +
        '<div class="ffs-burned"><img src="' + ASSET + 'forest_burned.jpg" alt=""></div>' +
        '<div class="ffs-front" style="left:0%"><img src="' + ASSET + 'fire_front.png" alt=""></div>' +
        '<img class="ffs-vfx ffs-smoke" src="' + ASSET + 'update_scene_smoke.svg" alt="">' +
        '<img class="ffs-vfx ffs-embers" src="' + ASSET + 'update_scene_embers.svg" alt="">' +
        '<img class="ffs-vfx ffs-ash" src="' + ASSET + 'update_scene_ash.svg" alt="">' +
        '<img class="ffs-breath" src="' + ASSET + 'dragon_fire.png" alt="">' +
        '<img class="ffs-dragon" src="' + ASSET + 'dragon.png" alt="">' +
        '<div class="ffs-vignette"></div>' +
        '<div class="ffs-ui">' +
          '<div class="ffs-title">' + (testMode ? 'Тест обновления' : 'Обновление приложения') + '</div>' +
          '<div class="ffs-percent" id="ffsPercent">0%</div>' +
          '<div class="ffs-track"><div class="ffs-bar" id="ffsBar"></div></div>' +
          '<div class="ffs-sub" id="ffsStatus">' + (testMode ? 'Имитация проверки файлов…' : 'Дракон разжигает огонь…') + '</div>' +
          '<div class="ffs-meta"><span id="ffsFile">Файл 0 из ' + totalFiles + '</span><span>•</span><span id="ffsBytes">0 Б из ' + formatBytes(totalBytes) + '</span></div>' +
          '<div class="ffs-actions"><button id="ffsLater">' + (testMode ? 'Закрыть' : 'Позже') + '</button><button class="primary" id="ffsApply" disabled>' + (testMode ? 'Проверка…' : 'Загрузка…') + '</button></div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    var burned = overlay.querySelector('.ffs-burned');
    var front = overlay.querySelector('.ffs-front');
    var bar = overlay.querySelector('#ffsBar');
    var percentEl = overlay.querySelector('#ffsPercent');
    var status = overlay.querySelector('#ffsStatus');
    var fileEl = overlay.querySelector('#ffsFile');
    var bytesEl = overlay.querySelector('#ffsBytes');
    var apply = overlay.querySelector('#ffsApply');
    var later = overlay.querySelector('#ffsLater');
    var target = 0;
    var display = 0;
    var raf = 0;
    var last = 0;
    var api = {};

    function render(value) {
      display = Math.max(0, Math.min(100, value));
      var p = display / 100;
      burned.style.width = display + '%';
      front.style.left = display + '%';
      front.style.opacity = display >= 99.5 ? '0' : display >= 96 ? String(Math.max(.12, (100 - display) / 4)) : '1';
      var actorOpacity = display >= 92 ? String(Math.max(0, (100 - display) / 8)) : '1';
      var dragon = overlay.querySelector('.ffs-dragon');
      var breath = overlay.querySelector('.ffs-breath');
      if (dragon) dragon.style.opacity = actorOpacity;
      if (breath) breath.style.opacity = actorOpacity;
      bar.style.width = display + '%';
      percentEl.textContent = Math.round(display) + '%';
      if (display >= 99.95) {
        front.style.opacity = '.42';
        status.textContent = 'Лес выгорел. Дракон скрывается в дыму…';
      } else if (display >= 75) {
        status.textContent = 'Пламя добралось до дальней опушки…';
      } else if (display >= 40) {
        status.textContent = 'Огонь распространяется по лесу…';
      } else if (display >= 10) {
        status.textContent = 'Первые деревья уже горят…';
      } else {
        status.textContent = 'Дракон разжигает огонь…';
      }
    }

    function frame(now) {
      if (!last) last = now;
      var dt = Math.min(64, now - last);
      last = now;
      var gap = target - display;
      if (Math.abs(gap) < .03) {
        render(target);
        raf = 0;
        last = 0;
        return;
      }
      var duration = Math.max(90, Math.min(420, 110 + Math.abs(gap) * 3));
      var step = gap * (1 - Math.pow(.001, dt / duration));
      render(display + step);
      raf = requestAnimationFrame(frame);
    }

    function setProgress(value) {
      target = Math.max(0, Math.min(100, Number(value) || 0));
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    }

    api.setProgress = function (p) {
      var bytesTotal = Number(p && p.bytesTotal) || totalBytes;
      var bytesDone = Number(p && p.bytesDone);
      var total = Number(p && p.total) || totalFiles;
      var current = Number(p && p.current) || 0;
      var pct;
      if (bytesTotal > 0 && Number.isFinite(bytesDone)) pct = bytesDone / bytesTotal * 100;
      else pct = total > 0 ? current / total * 100 : 0;
      setProgress(pct);
      fileEl.textContent = 'Файл ' + Math.min(current, total) + ' из ' + total;
      bytesEl.textContent = formatBytes(Math.max(0, bytesDone || 0)) + ' из ' + formatBytes(bytesTotal);
      if (p && p.path && p.phase !== 'apply') status.textContent = (p.phase === 'skip' ? 'Проверяю уже загруженный файл… ' : 'Скачиваю… ') + esc(p.path);
      if (p && p.phase === 'apply') status.textContent = 'Применяю обновление…';
    };

    api.finish = function () { setProgress(100); };
    api.enableApply = function () {
      apply.disabled = false;
      apply.textContent = testMode ? 'Закрыть тест' : 'Установить обновление';
    };
    api.setStatus = function (message) {
      if (status) status.textContent = String(message || '');
    };
    api.fail = function (message) {
      status.textContent = 'Ошибка загрузки: ' + String(message || 'неизвестная ошибка');
      apply.disabled = true;
    };
    api.destroy = function () {
      if (raf) cancelAnimationFrame(raf);
      overlay.remove();
    };
    api.overlay = overlay;

    later.onclick = function () { api.destroy(); };
    apply.onclick = function () {
      if (testMode) {
        api.destroy();
        return;
      }
      if (typeof api.onApply === 'function') api.onApply();
    };

    overlay.__sceneApi = api;
    return api;
  }

  global.DND_UPDATE_SCENE = { create: create };
})(window);
