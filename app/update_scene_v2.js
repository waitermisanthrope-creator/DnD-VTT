/* DND VTT — Cinematic updater scene v2.
 * The previous updater scene is intentionally not loaded by the application.
 * This module is presentation-only: no network, no version mutation.
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
      '#dndUpdateV2 .scene-bg,#dndUpdateV2 .scene-burn,#dndUpdateV2 .scene-fire,#dndUpdateV2 .scene-smoke,#dndUpdateV2 .scene-embers{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}',
      '#dndUpdateV2 .scene-bg{object-fit:cover;transform:scale(1.04);filter:saturate(1.02) brightness(.82);transition:opacity 2.8s ease,transform 7s ease}',
      '#dndUpdateV2 .scene-burn{object-fit:cover;opacity:1;clip-path:inset(0 100% 0 0);transform:scale(1.08);filter:saturate(1.15) brightness(.62);transition:clip-path .18s linear,transform 8s ease}',
      '#dndUpdateV2.burning .scene-bg{transform:scale(1.11)}',
      '#dndUpdateV2.burning .scene-burn{transform:scale(1.02)}',
      '#dndUpdateV2 .vignette{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 28%,rgba(0,0,0,.24) 58%,rgba(0,0,0,.78) 100%)}',
      '#dndUpdateV2 .scene-fire{position:absolute;left:0;top:18%;width:100%;height:82%;object-fit:cover;opacity:.88;mix-blend-mode:screen;transform:translate3d(-50%,0,0);transition:none;filter:saturate(1.3) contrast(1.08);will-change:transform;z-index:4}',
      '#dndUpdateV2 .scene-fire{pointer-events:none}',
      '#dndUpdateV2 .scene-smoke{object-fit:cover;opacity:0;mix-blend-mode:screen;filter:blur(.2px);transition:opacity 2s ease}',
      '#dndUpdateV2.burning .scene-smoke{opacity:.58;animation:dndSmoke 10s ease-in-out infinite alternate}',
      '#dndUpdateV2 .scene-embers{object-fit:cover;opacity:0;mix-blend-mode:screen;transition:opacity 1s ease}',
      '#dndUpdateV2.burning .scene-embers{opacity:.8;animation:dndEmbers 4s linear infinite}',
      '#dndUpdateV2 .dragon-rig{position:absolute;left:50%;bottom:-9%;width:min(86vw,900px);height:auto;aspect-ratio:768/172;transform:translate(-50%,18%) scale(.72);opacity:0;filter:drop-shadow(0 18px 28px rgba(0,0,0,.7));transition:transform 2.4s cubic-bezier(.18,.8,.18,1),opacity 1.4s ease;transform-origin:50% 70%;will-change:transform;z-index:6;animation:dndDragonHover 2.8s ease-in-out infinite}',
      '#dndUpdateV2.ready .dragon-rig{transform:translate(-50%,-2%) scale(.9);opacity:.96}',
      '#dndUpdateV2.burning .dragon-rig{transform:translate(-50%,-5%) scale(1);opacity:.98}',
      '#dndUpdateV2 .dragon-flight,#dndUpdateV2 .dragon-fire{position:absolute;inset:0;width:100%;height:100%;background-repeat:no-repeat;background-position:0 0;background-size:100% 800%;background-position-x:center;background-color:transparent;pointer-events:none}',
      '#dndUpdateV2 .dragon-flight{background-image:url(\'./app/assets/ui/dragon_flight_v2_sprite.png\');background-size:100% 800%;animation:dndDragonFlight .82s steps(8) infinite;filter:drop-shadow(0 18px 28px rgba(0,0,0,.7));will-change:background-position;}',
      '#dndUpdateV2 .dragon-fire{background-image:url(\'./app/assets/ui/dragon_fire_burst_v2_sprite.png\');opacity:0;mix-blend-mode:screen;filter:drop-shadow(0 0 20px rgba(255,100,0,.7));transition:opacity 1.1s ease;animation:dndDragonFire .9s steps(8) infinite;will-change:background-position;}',
      '#dndUpdateV2.burning .dragon-fire{opacity:.94}',
      '#dndUpdateV2 .title{position:absolute;top:8%;left:50%;transform:translateX(-50%);width:min(92vw,760px);text-align:center;text-shadow:0 3px 18px #000;transition:opacity .8s ease,transform .8s ease}',
      '#dndUpdateV2 .title h1{margin:0;font-size:clamp(28px,5vw,54px);letter-spacing:.08em;text-transform:uppercase;font-weight:800}',
      '#dndUpdateV2 .title p{margin:8px 0 0;color:#e7dcc1;font-size:clamp(13px,2.2vw,18px)}',
      '#dndUpdateV2 .panel{position:absolute;left:50%;bottom:5.5%;transform:translateX(-50%);width:min(92vw,650px);padding:14px 16px;border:1px solid rgba(218,178,83,.48);border-radius:16px;background:rgba(7,10,9,.68);backdrop-filter:blur(10px);box-shadow:0 14px 50px rgba(0,0,0,.55)}',
      '#dndUpdateV2 .status{min-height:22px;color:#f1ead9;font-size:14px;text-align:center;margin-bottom:10px}',
      '#dndUpdateV2 .progress{height:9px;border-radius:99px;overflow:hidden;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.12)}',
      '#dndUpdateV2 .bar{height:100%;width:0;background:linear-gradient(90deg,#d39b31,#ff5b1a,#f8d26a);box-shadow:0 0 18px rgba(255,93,20,.55);transition:width .22s ease}',
      '#dndUpdateV2 .meta{display:flex;justify-content:space-between;margin-top:7px;color:#aeb3ad;font-size:11px}',
      '#dndUpdateV2 button{display:none;width:100%;margin-top:12px;border:0;border-radius:11px;padding:12px 16px;font-weight:800;font-size:15px;color:#1b1208;background:linear-gradient(135deg,#f0c86a,#ff7b22);box-shadow:0 8px 24px rgba(255,105,30,.3)}',
      '#dndUpdateV2 button:active{transform:scale(.985)}',
      '#dndUpdateV2.done button{display:block}',
      '#dndUpdateV2 .skip{position:absolute;right:12px;top:12px;border:1px solid rgba(255,255,255,.22);border-radius:9px;background:rgba(0,0,0,.35);padding:7px 10px;color:#ddd;font-size:11px}',
      '#dndUpdateV2 .flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}',
      '#dndUpdateV2.burning .flash{animation:dndFlash 5.5s ease-in-out infinite}',
      '@keyframes dndSmoke{from{transform:translate3d(-1%,0,0) scale(1.03)}to{transform:translate3d(2%,-1%,0) scale(1.09)}}',
      '@keyframes dndEmbers{0%{transform:translateY(3%);opacity:.25}35%{opacity:.82}100%{transform:translateY(-2%);opacity:.5}}',
      '@keyframes dndFlash{0%,74%,100%{opacity:0}78%{opacity:.13}79%{opacity:0}}',
      '@keyframes dndDragonFlight{0%{background-position:0 0}14.285%{background-position:0 14.285%}28.57%{background-position:0 28.57%}42.855%{background-position:0 42.855%}57.14%{background-position:0 57.14%}71.425%{background-position:0 71.425%}85.71%{background-position:0 85.71%}100%{background-position:0 100%}}',
      '@keyframes dndDragonFire{0%{background-position:0 0}14.285%{background-position:0 14.285%}28.57%{background-position:0 28.57%}42.855%{background-position:0 42.855%}57.14%{background-position:0 57.14%}71.425%{background-position:0 71.425%}85.71%{background-position:0 85.71%}100%{background-position:0 100%}}',
      '@keyframes dndDragonIdle{0%,100%{transform:translate3d(0,0,0) rotate(0deg)}50%{transform:translate3d(0,-7px,0) rotate(-.8deg)}}',
      '@keyframes dndFirePulse{0%,100%{opacity:.72;transform:scale(.985)}50%{opacity:1;transform:scale(1.015)}}',
      '@keyframes dndDragonHover{0%,100%{margin-top:0}50%{margin-top:-9px}}',
      '@media(max-width:600px){#dndUpdateV2 .dragon-rig{width:104vw;height:76vh;bottom:1%}#dndUpdateV2 .title{top:7%}#dndUpdateV2 .panel{bottom:3%;padding:12px}.title p{max-width:88vw;margin-left:auto;margin-right:auto}}'
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
      '<img class="scene-fire" src="' + asset('fire_front.png') + '" alt="">' +
      '<img class="scene-smoke" src="' + asset('update_scene_smoke.svg') + '" alt="">' +
      '<img class="scene-embers" src="' + asset('update_scene_embers.svg') + '" alt="">' +
      '<div class="dragon-rig"><div class="dragon-flight" aria-hidden="true"></div><div class="dragon-fire" aria-hidden="true"></div></div>' +
      '<div class="vignette"></div><div class="flash"></div>' +
      '<div class="title"><h1>Пламя обновления</h1><p>Версия v' + String(version).replace(/</g,'&lt;') + ' уже готовит новый мир.</p></div>' +
      '<button class="skip" type="button">Закрыть</button>' +
      '<div class="panel"><div class="status">Пробуждаем дракона…</div><div class="progress"><div class="bar"></div></div><div class="meta"><span class="file">Подготовка</span><span class="pct">0%</span></div><button class="apply" type="button">🔥 Установить обновление</button></div>';
    document.body.appendChild(root);

    var status = root.querySelector('.status');
    var bar = root.querySelector('.bar');
    var burn = root.querySelector('.scene-burn');
    var fireFront = root.querySelector('.scene-fire');
    var file = root.querySelector('.file');
    var pct = root.querySelector('.pct');
    var apply = root.querySelector('.apply');
    var skip = root.querySelector('.skip');
    var api = {
      overlay: root,
      onApply: null,
      setProgress: function (p) {
        p = p || {};
        var total = Number(p.total) || 0, current = Number(p.current) || 0;
        var percent = total ? Math.max(0, Math.min(100, current / total * 100)) : 0;
        if (Number.isFinite(Number(p.bytesDone)) && Number(p.bytesTotal) > 0) {
          percent = Math.max(percent, Math.min(100, Number(p.bytesDone) / Number(p.bytesTotal) * 100));
        }
        bar.style.width = percent.toFixed(1) + '%';
        pct.textContent = Math.round(percent) + '%';
        if (burn) burn.style.clipPath = 'inset(0 ' + Math.max(0, 100 - percent).toFixed(2) + '% 0 0)';
        if (fireFront) fireFront.style.transform = 'translate3d(' + (percent - 50).toFixed(2) + '%,0,0)';
        if (p.path) file.textContent = String(p.path).split('/').slice(-1)[0];
      },
      setStatus: function (message) { status.textContent = String(message || ''); },
      enableApply: function () { root.classList.add('done'); },
      finish: function () {
        root.classList.add('ready');
        setTimeout(function(){ root.classList.add('burning'); }, 850);
        setTimeout(function(){ root.classList.add('done'); }, 2450);
      },
      fail: function (message) {
        root.classList.remove('done');
        status.textContent = 'Не удалось подготовить обновление: ' + String(message || 'неизвестная ошибка');
        status.style.color = '#ffb4a6';
      },
      destroy: function () { root.remove(); },
      testMode: test
    };

    apply.addEventListener('click', function () {
      if (typeof api.onApply === 'function') api.onApply();
    });
    skip.addEventListener('click', function () {
      if (test || !state || !state.updateAvailable) api.destroy();
    });

    // The cinematic sequence starts only after at least one paint. The fire front is tied to progress: it starts off-screen left and sweeps to the right edge, revealing burned terrain behind it.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add('ready');
        setTimeout(function(){ root.classList.add('burning'); }, test ? 900 : 1350);
      });
    });
    return api;
  }

  global.DND_UPDATE_SCENE_V2 = { create: create };
})(window);
