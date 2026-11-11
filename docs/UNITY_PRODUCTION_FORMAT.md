# Ремёсла: декларативные дополнения Unity51+

Обычный WorkshopStore, тип `craft`, `craftMode: production-v1`, `minClientVersionCode: 10051`, JSON mode `production-v1`. Манифест сохраняет существующие schemaVersion/id/version/name/author/license/platform/format/unityVersion/dependencies/bytes/sha256/url. Пакет не содержит исполняемого кода. Сетевые URL остаются прежними доверенными адресами; явный локальный импорт поддерживает только JSON item/craft и тот же installed store/immutable revision/dependency plan. Это новый транспорт, не отдельный менеджер.

## Локальный файл

Объект `{manifest:{id,version,type,name,author,license,dependencies},data:{...}}`. Импорт сам добавляет envelope/schema/provenance, вычисляет точные bytes/SHA и `local://id/version.json`; имя/автор/лицензия должны быть заданы автором. Предметы — отдельный `item` пакет (не более100 записей по прежнему контракту), их ID начинаются с ID пакета. Новый craft пакет содержит `professions`/`recipes`; ID собственных записей также начинаются с ID пакета. Зависимости указывают пакеты материалов/предметов/профессий. Результат не дублирует определение предмета, а ссылается на существующий itemId. Примеры: `unity/ContentSources~/production-examples/01-items.json`, затем `02-forge.json`. Они не устанавливаются автоматически и не опубликованы в публичном каталоге.

## Профессия

`id`, `name`, `description`, `icon`, `tools` (владения), `toolItems` (физические ID инструментов). `progression` опционален: возрастающие `thresholds` от0 и необязательные `levels` с названиями/checkBonus. Встроенные21профессия и необязательные5рангов экспортированы из существующих v38/v47; развитие ВЫКЛЮЧЕНО по умолчанию. Состояние хранится отдельно от сохранённых исходных craftingProfessions; при явном принятии профессии старые данные копируются без удаления оригинала.

## Рецепт

`id`, `name`, `description`, `professionId`, `knownByDefault`, `ingredients:[{itemId,count,match?}]`, `results:[{itemId,count,properties?}]`, необязательные `failureResults`, `timeHours`, целочисленный `costCp`, `tools`, `toolItems`, `conditions`, `rulesets`, `requires:{minLevel,minStats,spells,craftFlags}`, `check:{skill|stat,statMode:modifier|raw,dc,proficiency,bonus}`, `failureChance`, `consumeOnFailure`, `requiresApproval`, `experience`, `failureExperience`, `requiredRank`. Без check/failureChance броски не требуются. Дополнительные свойства результата не могут менять ID/категорию/происхождение. Декларативные effects/failureEffects: `craft-flag` и `learn-recipe`; неизвестный эффект/код отвергается. Стандарт2014/2024/Homebrew задаётся данными recipe.rulesets; ядро не навязывает професcиональные уровни или одну редакцию правил.

## Транзакции и проекты

Состояние hero.crafts schema1: mode, ruleset, professions, favorites, projects, archive, history, локальная policy. Ручной режим не расходует/не выдаёт ничего автоматически; ручной итог применяет только явно выбранные изменения. Полуавтомат создаёт pending без списания; одобрение повторно проверяет текущие материалы/инструменты/стоимость/hash. Автомат выполняет проверку и атомарный итог на detached hero. Длительные проекты хранят игровое время; материалы списываются только при финальном commit, поэтому не нужны повторные списания/возвраты при отмене. Перезапуск/повторный ID/архив проекта не создаёт новый предмет. Версия/определения изменились — завершение блокируется без расхода. Архивированные ID сохраняются против повторного исполнения. Инвентарь использует полную идентичность вариантов, отрицательные остатки запрещены.

## Границы полномочий

Офлайн-передача устройства локальному мастеру — доверенная локальная игра. Она не является сетевой идентификацией GM. Cloud admin не используется как GM. В текущем Unity отсутствует серверный транспорт кампаний/одобрений; удалённое подтверждение и ограничения настоящей сетевой кампании пока НЕ РЕАЛИЗОВАНЫ. Не выдавать локальную policy за серверную защиту.
