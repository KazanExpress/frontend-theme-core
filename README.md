> ⚠️⚠️⚠️ репозиторий переехал в [gitlab](https://gitlab.platform.corp/magnitonline/mm/frontend/frontend-theme-core) ⚠️⚠️⚠️

# Theme Core

> Библиотека для работы с элементами, цветами и медия запросами. Служит как инструмент для создания тем.

## Установка

#### В качестве submodule
```bash
git submodule add https://github.com/KazanExpress/frontend-theme-core.git
```

#### В качестве пакета
```bash
npm i github:KazanExpress/frontend-theme-core#v2.0.0
```

## Использование

Для автоматической генерации функций нужно создать 2 `json` файла. Первый - с базовыми цветами, второй - с размерами для медиа запросов.

Ключи в файле цветов будут отвечать за название функции, а значение - базовый цвет в формате `hsla`. Например:

#### **`colors.json`**
```json
{
  "Green": "hsla(138, 80%, 36%, 1)",
  "Rose": "hsla(336, 88%, 64%, 1)"
}
```

Ключи в файле размеров будут отвечать за название функции, а значение - массив размеров "от и до" в пикселях. Например:

#### **`media.json`**
```json
{
  "Mobile": [0, 640],
  "Tablet": [640, 960]
}
```

Далее необходимо инициализировать переменные `baseMedia` и `baseColors`. После этого подключить `core`:

#### **`index.styl`**
```stylus
baseMedia = json('media.json', { hash: true })
baseColors = json('colors.json', { hash: true })

// Если сабмодуль:
@require './core' // где core - путь до сабмодуля

// Если пакет:
@require 'ke-theme-core'
```

После этого можно использовать функционал `core`.

## Работа с цветами

Для использование подготовленной "палитры" нужно вызвать функцию определенного цвета. Например:

#### **`any-file.styl`**
```stylus
@require './index.styl'

body
  background-color Rose() // #f45293;
```

Все сгенерированные функции поддерживают параметры. Они передаются в функцию через пробел. Формат одного параметра: `МОДИФИКАТОР_ЦВЕТА` + `ЗНАЧЕНИЕ`.
Доступные модификаторы для цветов:

```
A - добавить прозрачность
LT - сделать ярче
DK - сделать темнее
ST - сделать более насыщенным
DS - сделать менее насыщенным
```

> Все модификаторы цветов, кроме прозрачности (`A`) принимают число и добавляют или отнимают его у базового цвета.
> Модификатор `A` устанавливает прозрачность с заданным значением.

Примеры использования:

#### **`any-file.styl`**
```stylus
@require './index.styl'

body
  color Rose(ST15) // #ff4791;
  background-color Rose(DK13 A35) // rgba(240,20,108,0.35);
  border-bottom 1px solid Rose(DS50 A15 LT30) // rgba(246,234,239,0.15);
```

## Работа с медиа запросами

Для использование сокращенных записей для медиа запросов, нужно вызвать блочный миксин `Media` с параметрами. В качестве параметров передаются через запятую необходимые названия размеров, которые являются ключами файла размеров. В теле миксина описываются стили.

Например:

#### **`any-file.styl`**
```stylus
@require './index.styl'

.my-button
  font-size 16px
  padding 8px
  color Green()
  
  +Media(Mobile)
    font-size 14px
  
  +Media(Mobile, Tablet)
    padding 4px
```

Сгенерирует такие стили:

#### **`any-file.css`**
```css
.my-button {
  font-size: 16px;
  padding: 8px;
  color: #12a53e;
}
@media (max-width: 639px) {
  .my-button {
    font-size: 14px;
  }
}
@media (max-width: 639px) {
  .my-button {
    padding: 4px;
  }
}
@media (min-width: 640px) and (max-width: 959px) {
  .my-button {
    padding: 4px;
  }
}
```
