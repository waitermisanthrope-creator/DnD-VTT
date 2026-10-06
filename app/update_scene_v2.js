/* DND VTT — Updater scene v4.
 * Gradual animation step: fire column + smoke + sparks.
 * Dragon remains disabled. Transition line remains tied to real progress.
 */
(function (global) {
  'use strict';
  var ROOT = './app/assets/ui/';
  var STYLE_ID = 'dnd-update-v2-style';

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = [
      '#dndUpdateV2{position:fixed;inset:0;z-index:2147483000;overflow:hidden;background:#07100d;color:#fff;font-family:system-ui,-apple-system,Segoe UI,sans-serif;touch-action:none}',
      '#dndUpdateV2 *{box-sizing:border-box}',
      '#dndUpdateV2 .scene-bg,#dndUpdateV2 .scene-burn{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}',
      '#dndUpdateV2 .scene-bg{object-fit:cover;transform:scale(1.04);filter:saturate(1.02) brightness(.82)}',
      '#dndUpdateV2 .scene-burn{object-fit:cover;opacity:1;clip-path:inset(0 100% 0 0);filter:saturate(1.08) brightness(.68);will-change:clip-path}',
      '#dndUpdateV2 .transition-line{position:absolute;top:0;bottom:0;left:0;width:3px;transform:translateX(-50%);background:linear-gradient(180deg,rgba(255,221,142,.15),rgba(255,236,180,.95) 18%,rgba(255,177,54,.95) 82%,rgba(255,120,24,.15));box-shadow:0 0 10px rgba(255,183,63,.7),0 0 24px rgba(255,125,20,.35);z-index:5;pointer-events:none;will-change:left}',
      '#dndUpdateV2 .transition-line::after{content:"";position:absolute;left:50%;top:50%;width:18px;height:100%;transform:translate(-50%,-50%);background:linear-gradient(90deg,transparent,rgba(255,191,72,.12),transparent);filter:blur(5px)}',
      '#dndUpdateV2 .fire-column{position:absolute;top:0;bottom:0;left:0;width:12px;transform:translateX(-50%);z-index:4;pointer-events:none;opacity:.72;filter:blur(.2px);background:linear-gradient(180deg,transparent 0%,rgba(255,190,52,.05) 12%,rgba(255,113,17,.72) 50%,rgba(255,221,101,.18) 82%,transparent 100%);mix-blend-mode:screen;will-change:left,opacity}',
      '#dndUpdateV2 .fire-column::before{content:"";position:absolute;inset:8% -9px 8%;background:radial-gradient(ellipse at center,rgba(255,238,150,.95) 0%,rgba(255,135,22,.7) 28%,rgba(255,52,8,.28) 58%,transparent 78%);filter:blur(7px);}',
      '#dndUpdateV2 .smoke{position:absolute;top:0;bottom:0;left:0;width:70px;transform:translateX(-50%);z-index:3;pointer-events:none;opacity:.26;filter:blur(8px);background:radial-gradient(ellipse at center,rgba(205,209,190,.48) 0%,rgba(118,126,115,.23) 38%,transparent 72%);mix-blend-mode:screen;will-change:left,opacity}',
      '#dndUpdateV2 .sparks{position:absolute;top:0;bottom:0;left:0;width:90px;transform:translateX(-50%);z-index:6;pointer-events:none;opacity:.55;will-change:left}',
      '#dndUpdateV2 .sparks::before,#dndUpdateV2 .sparks::after{content:"";position:absolute;inset:8% 0; background-image:radial-gradient(circle,rgba(255,213,96,.95) 0 1px,transparent 2px),radial-gradient(circle,rgba(255,105,28,.8) 0 1px,transparent 2px);background-size:31px 67px,43px 91px;background-position:7px 12px,21px 41px;filter:blur(.2px);}',
      '#dndUpdateV2 .vignette{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 28%,rgba(0,0,0,.24) 58%,rgba(0,0,0,.78) 100%);pointer-events:none}',
      '#dndUpdateV2 .title{position:absolute;top:8%;left:50%;transform:translateX(-50%);width:min(92vw,760px);text-align:center;text-shadow:0 3px 18px #000}',
      '#dndUpdateV2 .title h1{margin:0;font-size:clamp(28px,5vw,54px);letter-spacing:.08em;text-transform:uppercase;font-weight:800}',
      '#dndUpdateV2 .title p{margin:8px 0 0;color:#e7dcc1;font-size:clamp(13px,2.2vw,18px)}',
      '#dndUpdateV2 .panel{position:absolute;left:50%;bottom:5.5%;transform:translateX(-50%);width:min(92vw,650px);padding:14px 16px;border:1px solid rgba(218,178,83,.48);border-radius:16px;background:rgba(7,10,9,.68);backdrop-filter:blur(10px);box-shadow:0 14px 50px rgba(0,0,0,.55)}',
      '#dndUpdateV2 .status{min-height:22px;color:#f1ead9;font-size:14px;text-align:center;margin-bottom:10px}',
      '#dndUpdateV2 .progress{height:9px;border-radius:99px;overflow:hidden;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.12)}',
      '#dndUpdateV2 .bar{height:100%;width:0;background:linear-gradient(90deg,#d39b31,#ff5b1a,#f8d26a);box-shadow:0 0 18px rgba(255,93,20,.55);transition:width .16s linear}',
      '#dndUpdateV2 .meta{display:flex;justify-content:space-between;margin-top:7px;color:#aeb3ad;font-size:11px}',
      '#dndUpdateV2 button{display:none;width:100%;margin-top:12px;border:0;border-radius:11px;padding:12px 16px;font-weight:800;font-size:15px;color:#1b1208;background:linear-gradient(135deg,#f0c86a,#ff7b22);box-shadow:0 8px 24px rgba(255,105,30,.3)}',
      '#dndUpdateV2 button:active{transform:scale(.985)}',
      '#dndUpdateV2.done button{display:block}',
      '#dndUpdateV2 .skip{position:absolute;right:12px;top:12px;border:1px solid rgba(255,255,255,.22);border-radius:9px;background:rgba(0,0,0,.35);padding:7px 10px;color:#ddd;font-size:11px}',
      '@media(max-width:600px){#dndUpdateV2 .title{top:7%}#dndUpdateV2 .panel{bottom:3%;padding:12px}}'
    ].join('');
    document.head.appendChild(s);
  }

  function asset(name) { return ROOT + name; }

  function create(state) {
    installStyle();
    var old = document.getElementById('dndUpdateV2');
    if (old) old.remove();
    var version = state && state.manifest && state.manifest.version ? state.manifest.version : 'TEST';
    var test = !!(state && state.testMode);
    var root = document.createElement('div');
    root.id = 'dndUpdateV2';
    root.innerHTML =
      '<img class="scene-bg" src="' + asset('forest_green.jpg') + '" alt="">' +
      '<img class="scene-burn" src="' + asset('forest_burned.jpg') + '" alt="">' +
      '<div class="transition-line" aria-hidden="true"></div>' +
      '<div class="fire-column" aria-hidden="true"></div>' +
      '<div class="smoke" aria-hidden="true"></div>' +
      '<div class="sparks" aria-hidden="true"></div>' +
      '<div class="vignette"></div>' +
      '<div class="title"><h1>Переход обновления</h1><p>Версия v' + String(version).replace(/</g,'&lt;') + ' — новый мир открывается постепенно.</p></div>' +
      '<button class="skip" type="button">Закрыть</button>' +
      '<div class="panel"><div class="status">Подготавливаем новый мир…</div><div class="progress"><div class="bar"></div></div><div class="meta"><span class="file">Подготовка</span><span class="pct">0%</span></div><button class="apply" type="button">Установить обновление</button></div>';
    document.body.appendChild(root);

    var status = root.querySelector('.status');
    var bar = root.querySelector('.bar');
    var burn = root.querySelector('.scene-burn');
    var line = root.querySelector('.transition-line');
    var fire = root.querySelector('.fire-column');
    var smoke = root.querySelector('.smoke');
    var sparks = root.querySelector('.sparks');
    var file = root.querySelector('.file');
    var pct = root.querySelector('.pct');
    var apply = root.querySelector('.apply');
    var skip = root.querySelector('.skip');
    var currentProgress = 0, targetProgress = 0, progressFrame = null;

    function renderProgress(value) {
      value = Math.max(0, Math.min(100, value));
      bar.style.width = value.toFixed(2) + '%';
      pct.textContent = Math.round(value) + '%';
      if (burn) burn.style.clipPath = 'inset(0 ' + Math.max(0, 100 - value).toFixed(2) + '% 0 0)';
      if (line) line.style.left = value.toFixed(2) + '%';
      // Fire/smoke/sparks deliberately follow the same progress boundary: no independent timing.
      if (fire) { fire.style.left = value.toFixed(2) + '%'; fire.style.opacity = value > 2 && value < 99 ? '.72' : '0'; }
      if (smoke) { smoke.style.left = value.toFixed(2) + '%'; smoke.style.opacity = value > 4 && value < 99 ? '.26' : '0'; }
      if (sparks) { sparks.style.left = value.toFixed(2) + '%'; sparks.style.opacity = value > 3 && value < 99 ? '.55' : '0'; }
    }
    function animateProgress() {
      progressFrame = null;
      var delta = targetProgress - currentProgress;
      if (Math.abs(delta) < 0.08) {
        currentProgress = targetProgress;
        renderProgress(currentProgress);
        return;
      }
      currentProgress += delta * 0.12;
      renderProgress(currentProgress);
      progressFrame = requestAnimationFrame(animateProgress);
    }
    function setTargetProgress(value) {
      targetProgress = Math.max(0, Math.min(100, value));
      if (!progressFrame) progressFrame = requestAnimationFrame(animateProgress);
    }

    var api = {
      overlay: root,
      onApply: null,
      setProgress: function (p) {
        p = p || {};
        var total = Number(p.total) || 0, current = Number(p.current) || 0;
        var percent = total ? Math.max(0, Math.min(100, current / total * 100)) : 0;
        if (Number.isFinite(Number(p.bytesDone)) && Number(p.bytesTotal) > 0)
          percent = Math.max(percent, Math.min(100, Number(p.bytesDone) / Number(p.bytesTotal) * 100));
        setTargetProgress(percent);
        if (p.path) file.textContent = String(p.path).split('/').slice(-1)[0];
      },
      setStatus: function (message) { status.textContent = String(message || ''); },
      enableApply: function () { root.classList.add('done'); },
      finish: function () { setTargetProgress(100); root.classList.add('done'); },
      fail: function (message) {
        root.classList.remove('done');
        status.textContent = 'Не удалось подготовить обновление: ' + String(message || 'неизвестная ошибка');
        status.style.color = '#ffb4a6';
      },
      destroy: function () { root.remove(); },
      testMode: test
    };

    apply.addEventListener('click', function () { if (typeof api.onApply === 'function') api.onApply(); });
    skip.addEventListener('click', function () { if (test || !state || !state.updateAvailable) api.destroy(); });
    requestAnimationFrame(function () { requestAnimationFrame(function () { renderProgress(0); }); });
    return api;
  }

  global.DND_UPDATE_SCENE_V2 = { create: create };
})(window);
