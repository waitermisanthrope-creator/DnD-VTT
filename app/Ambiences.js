/**
 * Модуль эмбиентов и фонового аудио (ambiences.js)
 */

const AMBIENT_TRACKS = [
  { name: "GLENMORIL Soundtrack - Music Box", src: "./ambience/GLENMORIL Soundtrack - Music Box.mp3" },
  { name: "Lineage 2 — Shepard's Flute", src: "./ambience/lineage_2_16. Shepard's Flute.mp3" },
  { name: "Oliver Deriviere - Who Am I", src: "./ambience/Oliver Deriviere - Who Am I_(grizzlymusic.ru).mp3" },
  { name: "Oliver DeRiviere - Prelude to an End", src: "./ambience/Oliver DeRiviere - Prelude to an End_(grizzlymusic.ru).mp3" },
  { name: "Jalan Jalan - Lotus", src: "./ambience/Jalan Jalan - Lotus.mp3" }
];

let globalAudio = null;
let currentTrackIndex = 0;
let isPlayingAmbience = false;
let isShuffleOn = false;
let isRepeatOneOn = false;
let currentVolume = 0.7;
let fadeInterval = null;
let hasAutoStarted = false;

function initAmbienceEngine() {
  if (globalAudio) return;
  globalAudio = new Audio();
  globalAudio.volume = currentVolume;

  globalAudio.addEventListener('ended', () => {
    if (isRepeatOneOn) {
      globalAudio.play();
    } else {
      nextAmbienceTrack(true);
    }
  });
}

// Плавное нарастание громкости (Fade-In) от startVol до targetVol за durationMs миллисекунд
function fadeInAudio(targetVol = 1.0, startVol = 0.3, durationMs = 30000) {
  if (!globalAudio) return;
  
  if (fadeInterval) clearInterval(fadeInterval);
  
  globalAudio.volume = startVol;
  currentVolume = targetVol;
  
  const steps = 60;
  const stepTime = durationMs / steps;
  const volStep = (targetVol - startVol) / steps;
  let currentStep = 0;

  fadeInterval = setInterval(() => {
    currentStep++;
    let newVol = globalAudio.volume + volStep;
    if (currentStep >= steps || newVol >= targetVol) {
      globalAudio.volume = targetVol;
      clearInterval(fadeInterval);
      fadeInterval = null;
    } else {
      globalAudio.volume = newVol;
    }
    const volumeRange = document.getElementById('ambVolumeRange');
    if (volumeRange) volumeRange.value = globalAudio.volume;
  }, stepTime);
}

// Запуск Гленморила с нарастанием
function startGlenmorilAutoplay() {
  if (hasAutoStarted) return;
  initAmbienceEngine();
  
  currentTrackIndex = 0; // Гленморил
  const track = AMBIENT_TRACKS[currentTrackIndex];

  globalAudio.src = track.src;
  globalAudio.play().then(() => {
    isPlayingAmbience = true;
    hasAutoStarted = true;
    fadeInAudio(1.0, 0.3, 30000);
    updateAmbienceModalUI();
    
    // Удаляем перехватчики кликов, так как музыка уже заиграла
    document.removeEventListener('click', triggerAutoplayOnInteraction);
    document.removeEventListener('touchstart', triggerAutoplayOnInteraction);
  }).catch(err => {
    console.log("Ожидание взаимодействия пользователя для запуска музыки...");
  });
}

function triggerAutoplayOnInteraction() {
  startGlenmorilAutoplay();
}

function openAmbienceModal() {
  initAmbienceEngine();
  let modal = document.getElementById('ambienceModal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'ambienceModal';
    modal.style.cssText = `
      display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.85); z-index: 21000; justify-content: center; align-items: center;
      padding: 15px; box-sizing: border-box; backdrop-filter: blur(4px);
    `;

    modal.innerHTML = `
      <div style="background: #1e1e1e; padding: 22px; border-radius: 10px; width: 100%; max-width: 450px; border: 1px solid #444; box-shadow: 0 10px 25px rgba(0,0,0,0.5); color: #fff; position: relative; max-height: 90vh; overflow-y: auto;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #444; padding-bottom: 10px; margin-bottom: 15px;">
          <h3 style="margin: 0; color: #ff9800; font-size: 1.2em;">🎵 Плеер эмбиента и музыки</h3>
          <button onclick="closeAmbienceModal()" style="background: #e53935; color: #fff; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-weight: bold;">✕</button>
        </div>

        <!-- Блок текущего трека -->
        <div style="background: #252525; padding: 14px; border-radius: 8px; border: 1px solid #333; text-align: center; margin-bottom: 15px;">
          <div id="ambModalTrackName" style="font-weight: bold; font-size: 1.05em; color: #ff9800; margin-bottom: 6px; word-break: break-all;">Ничего не играет</div>
          <div id="ambModalStatus" style="font-size: 0.8em; color: #aaa; margin-bottom: 12px;">Пауза</div>

          <!-- Управление воспроизведением -->
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 12px;">
            <button onclick="toggleShuffle()" id="ambShuffleBtn" title="Случайный порядок" style="background: #333; border: 1px solid #555; color: #aaa; width: 36px; height: 36px; border-radius: 6px; cursor: pointer; font-size: 1em;">🔀</button>
            <button onclick="prevAmbienceTrack()" style="background: #333; border: 1px solid #555; color: #fff; width: 40px; height: 40px; border-radius: 6px; cursor: pointer; font-size: 1.1em;">⏮</button>
            <button onclick="toggleAmbiencePlay()" id="ambModalPlayBtn" style="background: #4CAF50; border: none; color: #fff; width: 48px; height: 48px; border-radius: 50%; cursor: pointer; font-size: 1.3em; display: flex; align-items: center; justify-content: center;">▶</button>
            <button onclick="nextAmbienceTrack()" style="background: #333; border: 1px solid #555; color: #fff; width: 40px; height: 40px; border-radius: 6px; cursor: pointer; font-size: 1.1em;">⏭</button>
            <button onclick="toggleRepeatOne()" id="ambRepeatBtn" title="Повтор одного трека" style="background: #333; border: 1px solid #555; color: #aaa; width: 36px; height: 36px; border-radius: 6px; cursor: pointer; font-size: 1em;">🔂</button>
          </div>

          <!-- Громкость -->
          <div style="display: flex; align-items: center; gap: 10px; padding: 0 10px;">
            <span style="font-size: 0.85em; color: #aaa;">🔊 Громкость:</span>
            <input type="range" id="ambVolumeRange" min="0" max="1" step="0.05" value="0.7" oninput="changeAmbienceVolume(this.value)" style="flex: 1; cursor: pointer;">
          </div>
        </div>

        <!-- Список треков -->
        <div style="font-size: 0.9em; font-weight: bold; margin-bottom: 8px; color: #aaa;">Доступные треки:</div>
        <div id="ambTracksListContainer" style="display: flex; flex-direction: column; gap: 6px; max-height: 200px; overflow-y: auto;"></div>

        <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
          <button onclick="closeAmbienceModal()" class="btn-action" style="background: #444; color: #fff; padding: 10px 16px; border-radius: 6px; cursor: pointer;">Закрыть</button>
        </div>

      </div>
    `;

    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeAmbienceModal();
    });

    document.body.appendChild(modal);
  }

  updateAmbienceModalUI();
  modal.style.display = 'flex';
}

function closeAmbienceModal() {
  const modal = document.getElementById('ambienceModal');
  if (modal) modal.style.display = 'none';
}

function updateAmbienceModalUI() {
  const trackNameEl = document.getElementById('ambModalTrackName');
  const statusEl = document.getElementById('ambModalStatus');
  const playBtn = document.getElementById('ambModalPlayBtn');
  const shuffleBtn = document.getElementById('ambShuffleBtn');
  const repeatBtn = document.getElementById('ambRepeatBtn');
  const volumeRange = document.getElementById('ambVolumeRange');
  const listContainer = document.getElementById('ambTracksListContainer');

  if (!trackNameEl) return;

  const currentTrack = AMBIENT_TRACKS[currentTrackIndex];
  trackNameEl.innerText = currentTrack ? currentTrack.name : "Нет трека";
  statusEl.innerText = isPlayingAudio() ? "Воспроизведение..." : "Пауза";
  if (playBtn) playBtn.innerText = isPlayingAudio() ? "⏸" : "▶";

  if (shuffleBtn) {
    shuffleBtn.style.color = isShuffleOn ? '#ff9800' : '#aaa';
    shuffleBtn.style.borderColor = isShuffleOn ? '#ff9800' : '#555';
  }
  if (repeatBtn) {
    repeatBtn.style.color = isRepeatOneOn ? '#ff9800' : '#aaa';
    repeatBtn.style.borderColor = isRepeatOneOn ? '#ff9800' : '#555';
  }
  if (volumeRange && globalAudio) {
    volumeRange.value = globalAudio.volume;
  }

  if (listContainer) {
    let html = '';
    AMBIENT_TRACKS.forEach((track, idx) => {
      const isSelected = idx === currentTrackIndex;
      html += `
        <div onclick="playAmbienceTrack(${idx})" style="background: ${isSelected ? '#332211' : '#252525'}; border: 1px solid ${isSelected ? '#ff9800' : '#333'}; padding: 8px 10px; border-radius: 6px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
          <span style="color: ${isSelected ? '#ff9800' : '#fff'}; font-weight: ${isSelected ? 'bold' : 'normal'};">${track.name}</span>
          <span style="font-size: 0.75em; color: #888;">${isSelected && isPlayingAudio() ? '▶ Играет' : ''}</span>
        </div>
      `;
    });
    listContainer.innerHTML = html;
  }
}

function isPlayingAudio() {
  return globalAudio && !globalAudio.paused;
}

function toggleAmbiencePlay() {
  initAmbienceEngine();
  if (isPlayingAudio()) {
    if (fadeInterval) { clearInterval(fadeInterval); fadeInterval = null; }
    globalAudio.pause();
  } else {
    playAmbienceTrack(currentTrackIndex);
  }
  updateAmbienceModalUI();
}

function playAmbienceTrack(index) {
  initAmbienceEngine();
  if (fadeInterval) { clearInterval(fadeInterval); fadeInterval = null; }
  
  currentTrackIndex = index;
  const track = AMBIENT_TRACKS[currentTrackIndex];

  globalAudio.src = track.src;
  globalAudio.play().then(() => {
    globalAudio.volume = currentVolume;
    updateAmbienceModalUI();
  }).catch(err => {
    // ИСПРАВЛЕНО (аудит): alert() создаёт блокирующее нативное окно поверх
    // WebView в APK — на мобильном это выглядит как "зависание" интерфейса.
    // Заменено на неблокирующее сообщение прямо в модалке эмбиентов.
    console.error("Ошибка воспроизведения аудио:", track.src, err);
    isPlayingAmbience = false;
    const statusEl = document.getElementById('ambStatusText');
    if (statusEl) {
      statusEl.innerText = "Не удалось воспроизвести: " + track.name;
      statusEl.style.color = '#e57373';
    }
    updateAmbienceModalUI();
  });
}

function nextAmbienceTrack(autoPlay = false) {
  if (isShuffleOn) {
    let randIdx;
    do {
      randIdx = Math.floor(Math.random() * AMBIENT_TRACKS.length);
    } while (randIdx === currentTrackIndex && AMBIENT_TRACKS.length > 1);
    currentTrackIndex = randIdx;
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % AMBIENT_TRACKS.length;
  }

  if (autoPlay || isPlayingAudio()) {
    playAmbienceTrack(currentTrackIndex);
  } else {
    updateAmbienceModalUI();
  }
}

function prevAmbienceTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + AMBIENT_TRACKS.length) % AMBIENT_TRACKS.length;
  if (isPlayingAudio()) {
    playAmbienceTrack(currentTrackIndex);
  } else {
    updateAmbienceModalUI();
  }
}

function toggleShuffle() {
  isShuffleOn = !isShuffleOn;
  updateAmbienceModalUI();
}

function toggleRepeatOne() {
  isRepeatOneOn = !isRepeatOneOn;
  updateAmbienceModalUI();
}

function changeAmbienceVolume(val) {
  if (fadeInterval) { clearInterval(fadeInterval); fadeInterval = null; }
  currentVolume = parseFloat(val);
  if (globalAudio) {
    globalAudio.volume = currentVolume;
  }
}

// При старте пробуем запустить сразу, а также вешаем триггеры на первый клик/тап по экрану
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(startGlenmorilAutoplay, 300);
  document.addEventListener('click', triggerAutoplayOnInteraction, { once: true });
  document.addEventListener('touchstart', triggerAutoplayOnInteraction, { once: true });
});
