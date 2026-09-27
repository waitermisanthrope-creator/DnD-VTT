(function () {
  // Подключаем шрифт Playfair Display
  if (!document.getElementById('playfair-font')) {
    const link = document.createElement('link');
    link.id = 'playfair-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&display=swap';
    document.head.appendChild(link);
  }

  // Создаем стили
  const style = document.createElement('style');
  style.textContent = `
    .splash-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #000;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transition: opacity 0.5s ease;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      overflow: hidden;
    }

    .splash-overlay::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('./wallpapers/19.png');
      background-size: cover;
      background-position: center;
      opacity: 0;
      animation: fadeInBg 3s forwards linear;
    }

    /* Логотип/ссылка: выезжает, стоит +7 сек по центру и уходит вверх */
    .splash-text {
      position: absolute;
      left: 0;
      right: 0;
      color: #ffffff;
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      letter-spacing: 0.08em;
      text-align: center;
      text-decoration: none; /* Убираем подчеркивание ссылки */
      cursor: pointer;
      pointer-events: auto; /* Разрешаем клик/тач по самой ссылке */

      -webkit-text-stroke: 0.4px rgba(0, 0, 0, 0.8);
      text-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.9),
        0 0 8px rgba(0, 0, 0, 0.6);

      z-index: 3;
      padding: 0 20px;
      
      /* Длительность 13.5s (включает паузу 7s в центре) */
      animation: scrollCreditsWithPause 13.5s 0.8s forwards linear;
      transform: translateY(100vh);
    }

    .splash-text:hover {
      color: #e0e0e0;
    }

    /* Картинка: растянута на всю ширину -0.5см с каждой стороны, медленное движение */
    .splash-image {
      position: absolute;
      width: calc(100vw - 1cm);
      max-height: 80vh;
      object-fit: contain;
      z-index: 2;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8));

      /* Медленная анимация на 12 секунд */
      animation: scrollImageSlow 12s 1.8s forwards linear;
      transform: translateY(100vh);
    }

    @keyframes fadeInBg {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    /* Анимация текста с длительной задержкой по центру */
    @keyframes scrollCreditsWithPause {
      0% {
        transform: translateY(100vh);
        opacity: 0;
      }
      10% {
        transform: translateY(0);
        opacity: 1;
      }
      80% {
        transform: translateY(0);
        opacity: 1;
      }
      95% {
        opacity: 1;
      }
      100% {
        transform: translateY(-110vh);
        opacity: 0;
      }
    }

    /* Плавный и медленный пролет картинки */
    @keyframes scrollImageSlow {
      0% {
        transform: translateY(100vh);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-120vh);
        opacity: 0;
      }
    }

    .splash-overlay.fade-out {
      opacity: 0;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  // Разметка
  const overlay = document.createElement('div');
  overlay.className = 'splash-overlay';

  // Делаем тег <a> вместо <div> для корректного перехода по ссылке
  const textLink = document.createElement('a');
  textLink.className = 'splash-text';
  textLink.href = 'https://m.vk.com/dima_dimon_knk';
  textLink.target = '_blank'; // Открывает в новой вкладке/приложении
  textLink.rel = 'noopener noreferrer';
  textLink.textContent = 'vk.com/dima_dimon_knk представляет';

  // Остановка всплытия события клика/касания, чтобы при единичном нажатии на ссылку
  // не срабатывал пропуск/закрытие сплэша, если случайно сработает двойной клик
  textLink.addEventListener('touchend', (e) => e.stopPropagation());
  textLink.addEventListener('dblclick', (e) => e.stopPropagation());

  const img = document.createElement('img');
  img.className = 'splash-image';
  img.src = './wallpapers/20.png';
  img.alt = '';
  // ИСПРАВЛЕНО (аудит): если файл обоев отсутствует в сборке APK, браузер
  // показывает "битую" иконку картинки поверх заставки. Прячем элемент,
  // чтобы сплэш-экран оставался чистым даже без ассета.
  img.addEventListener('error', () => { img.style.display = 'none'; });

  overlay.appendChild(textLink);
  overlay.appendChild(img);

  let isDestroyed = false;
  let autoCloseTimer = null;

  function closeSplash() {
    if (isDestroyed) return;
    isDestroyed = true;

    if (autoCloseTimer) clearTimeout(autoCloseTimer);

    overlay.classList.add('fade-out');
    overlay.addEventListener('transitionend', () => {
      overlay.remove();
      style.remove();
    }, { once: true });
  }

  // Время таймера выставлено с запасом на всю длинную анимацию (15 секунд)
  autoCloseTimer = setTimeout(closeSplash, 15000);

  // Двойной тап / двойной клик по оверлею для пропуска заставки
  let lastTap = 0;
  overlay.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      e.preventDefault();
      closeSplash();
    }
    lastTap = currentTime;
  });

  overlay.addEventListener('dblclick', closeSplash);

  // Вставляем оверлей в DOM
  if (document.body) {
    document.body.appendChild(overlay);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(overlay);
    });
  }
})();
