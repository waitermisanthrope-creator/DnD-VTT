// debug.js — Модуль отладочных логов для APK / WebView
(function() {
    // Безопасная инициализация после полной загрузки DOM
    function initDebug() {
        if (!document.body) {
            document.addEventListener('DOMContentLoaded', initDebug, { once: true });
            return;
        }
        if (document.getElementById('debugLogContainer')) return;

        let errorCount = 0;
        window.appDebugLogs = window.appDebugLogs || [];
        window.enableDndDebugLogger = initDebug;

        // Проверяем, включен ли дебаг в настройках (по умолчанию false)
        const isDebugEnabled = localStorage.getItem('dnd_debug_enabled') === 'true';

        // Создаем контейнер для дебаг-панели
        const debugContainer = document.createElement('div');
        debugContainer.id = 'debugLogContainer';
        debugContainer.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            z-index: 99999;
            display: ${isDebugEnabled ? 'flex' : 'none'};
            flex-direction: column;
            align-items: flex-end;
            font-family: monospace;
            font-size: 11px;
        `;

        // Кнопка открытия/закрытия панели
        const debugBtn = document.createElement('button');
        debugBtn.innerHTML = '🐞 Дебаг';
        debugBtn.style.cssText = `
            background: #e53935;
            color: #fff;
            border: none;
            padding: 8px 12px;
            border-radius: 20px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            z-index: 100000;
            display: flex;
            align-items: center;
            gap: 6px;
        `;

        // Окно с логами
        const logBox = document.createElement('div');
        logBox.id = 'debugLogBox';
        logBox.style.cssText = `
            display: none;
            width: 90vw;
            max-width: 400px;
            height: 250px;
            background: rgba(18, 18, 18, 0.95);
            border: 1px solid #ff9800;
            border-radius: 8px;
            padding: 8px;
            overflow-y: auto;
            color: #4caf50;
            margin-bottom: 5px;
            box-sizing: border-box;
            text-align: left;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        `;

        debugContainer.appendChild(logBox);
        debugContainer.appendChild(debugBtn);
        document.body.appendChild(debugContainer);

        // Функция обновления вида кнопки
        function updateButtonView() {
            if (errorCount > 0) {
                debugBtn.innerHTML = `🐞 Дебаг <span style="background: #ff5252; color: #fff; border-radius: 50%; padding: 1px 6px; font-size: 10px; font-weight: bold;">! ${errorCount}</span>`;
            } else {
                debugBtn.innerHTML = '🐞 Дебаг';
            }
        }

        // Переключение видимости панели логов
        debugBtn.onclick = function() {
            if (logBox.style.display === 'none') {
                logBox.style.display = 'block';
                debugBtn.style.background = '#333';
                // Сбрасываем счетчик при открытии
                errorCount = 0;
                updateButtonView();
            } else {
                logBox.style.display = 'none';
                debugBtn.style.background = '#e53935';
            }
        };

        // Перехват console.log и console.error
        const originalLog = console.log;
        const originalError = console.error;

        function appendLog(type, args) {
            const msg = Array.from(args).map(arg => {
                if (typeof arg === 'object') {
                    try { return JSON.stringify(arg); } catch(e) { return String(arg); }
                }
                return String(arg);
            }).join(' ');

            const logLine = '[' + type.toUpperCase() + '] ' + msg;
            window.appDebugLogs.push(new Date().toISOString() + ' ' + logLine);
            if (window.appDebugLogs.length > 500) window.appDebugLogs.shift();

            const p = document.createElement('div');
            p.style.borderBottom = '1px solid #333';
            p.style.padding = '3px 0';
            p.style.wordBreak = 'break-all';

            if (type === 'error') {
                p.style.color = '#ff5252';
                p.innerText = '[ERR] ' + msg;
                
                // Если панель закрыта, считаем ошибки
                if (logBox.style.display === 'none') {
                    errorCount++;
                    updateButtonView();
                }
            } else {
                p.style.color = '#a5d6a7';
                p.innerText = '[LOG] ' + msg;
            }

            logBox.appendChild(p);
            logBox.scrollTop = logBox.scrollHeight;
        }

        console.log = function() {
            originalLog.apply(console, arguments);
            appendLog('log', arguments);
        };

        console.error = function() {
            originalError.apply(console, arguments);
            appendLog('error', arguments);
        };

        // Ловим глобальные ошибки скриптов
        window.onerror = function(message, source, lineno, colno, error) {
            console.error(`Global: ${message} (${source}:${lineno}:${colno})`);
        };

        console.log("🐞 Дебаг-модуль успешно инициализирован в APK");
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDebug);
    } else {
        initDebug();
    }
})();
