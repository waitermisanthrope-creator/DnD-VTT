<!-- NETWORK_APK_NOTES.md — описание native LAN слоя будущего APK. Как работает: фиксирует роли, транспорт, протокол и контракт DndLanBridge. Переменные/объекты: DndLanBridge, roomId, peerId, roster, eventSeq. -->
# Сетевая архитектура для APK

## Режимы

- **Single Player** — полностью локальный, без сети.
- **LAN Room** — мастер создаёт WebRTC peer connection без STUN/TURN; при нахождении устройств в одной Wi‑Fi сети соединение может быть прямым. В web-версии offer/answer передаются вручную.
- **Native LAN bridge (следующий APK-шаг)** — `network_engine.js` намеренно изолирован от транспорта. Нативный Android bridge можно подключить через `window.DndLanBridge`, не меняя rules/combat/campaign слой.

## Авторитет состояния

Мастер является авторитетом для общего состояния боя и кампании. Листы персонажей остаются локальными: подключение игрока не должно перезаписывать его персонажа листом мастера.

В v7 мастер поддерживает **несколько независимых peer-соединений**. Каждый игрок получает свой `peerId`, может быть отключён отдельно, а его сетевой профиль входит в roster.

Минимальный протокол v7:

- `HELLO` — регистрация имени игрока и метаданных персонажа;
- `HELLO_ACK` — подтверждение peer;
- `STATE_SNAPSHOT` — актуальное состояние общей сессии (combat + campaign + roster + `eventSeq`);
- `REQUEST_SYNC` — запрос актуального состояния;
- `PLAYER_ACTION` — RPC от игрока к мастеру;
- `ACTION_RESULT` — результат авторитетного действия;
- `GAME_EVENT` — последовательное authoritative-событие с `seq`, `eventId`, `actorId`;
- `DICE_ROLL` — пример authoritative event для d20.

Сейчас безопасно реализованы базовые сетевые действия: синхронизация и авторитетный d20. Боевые RPC для attack/damage/heal/spell/condition будут подключаться поверх этого же event-протокола, не меняя transport layer.

## Контракт native bridge

`network_engine.js` обнаруживает `window.DndLanBridge`. Для будущего APK bridge должен предоставить как минимум методы:

- `createRoom({roomId, ...})` — открыть LAN-комнату;
- `joinRoom(codeOrRoomId)` — подключиться к найденной комнате;
- callback/события входа, выхода и получения сообщений;
- транспорт передачи protocol messages. В V70.14 web-адаптер принимает `setMessageHandler`, `onMessage`, `addMessageListener`, `on('message', ...)` или глобальный callback `DndLanBridgeOnMessage`; отправка поддерживает `sendMessage`, `send` или `postMessage`.
- native packet должен содержать `peerId` (для host) и `message`/`msg`/`protocol` с тем же JSON-протоколом, что WebRTC.

Названия конкретных callback API можно выбрать при реализации Capacitor/Android plugin; web fallback от этого не зависит.

## V70.14 — native transport adapter

`network_engine.js` теперь не только обнаруживает `DndLanBridge`, но и подключает его к общему сетевому протоколу. Host создаёт native peer при первом `HELLO`, player создаёт native channel и отправляет обычный `HELLO`; `PLAYER_ACTION`, `STATE_SNAPSHOT`, `ACTION_RESULT` и `GAME_EVENT` проходят через тот же обработчик, что WebRTC. Это делает native слой транспортным адаптером, а не отдельной игровой реализацией.

## Что потребуется для настоящего zero-config LAN в Android

1. Native Android/Capacitor plugin для UDP multicast/broadcast discovery или Android NSD.
2. Нативный WebSocket/DataChannel bridge либо передача найденного адреса в WebRTC transport.
3. Разрешения Android для локальной сети в соответствии с target SDK.
4. Автоматическое обнаружение комнат и список `D&D Room — MasterName` вместо ручного offer/answer.

Web-версия намеренно не притворяется, что умеет безопасно обнаруживать соседние устройства: без native API обычный браузер не предоставляет универсальный LAN-discovery механизм.

## Multiplayer v8 gameplay

Целевая комната: **1 мастер + до 15 игроков**. Сетевой RPC-слой передаёт только игровые действия и небольшие authoritative-события, а не весь лист персонажа.

Поддержанные действия игрока: атака, заклинание, урон, лечение, состояние, конец хода и death save. Мастер является источником истины: действие применяется на authoritative-копии боя мастера, после чего `COMBAT_CHANGED` рассылается всем участникам.

Участник инициативы может быть привязан к `ownerPeerId` и `characterId`. Это позволяет серверной логике отличать ход конкретного игрока от хода монстра/мастера и восстанавливать привязку при повторном подключении того же персонажа.

Для Android zero-config discovery по-прежнему нужен native `DndLanBridge`; web fallback не делает вид, что браузер умеет универсально находить LAN-комнаты без ручного обмена.


## V70.25.58 — build-layer status

The web application is prepared for a native wrapper, but this archive intentionally does not yet contain an Android/Gradle/Capacitor project or a concrete `DndLanBridge` implementation. `DndLanBridge` remains the transport contract boundary. APK compilation is therefore blocked until the native build layer is introduced and verified; do not treat the web archive alone as an installable APK source.
