# deathwish_viewer

Одностраничное приложение для просмотра комиксов (или любых других изображений).

## Испльзуемые технологии:
- JS (ES6 компилируется в ES5 с помощью babeljs)
- CommonJS (компилируются с помощью browserify)
- БЭМ (только правила именования классов и файловая структрура)
- SASS
- Handlebars

## Код имеет следующую структуру:
- **blocks/** - содержир БЭМ блоки. html блоков заключен в block-name.js файлы, и является шаблоном handlebars
- **blocks-frames/** - содержат блоки служащие только для создания структуры, а так же блоки-контейнеры для динамического содержимого
- **blocks-sets/** - содержат компиляции из остальных блоков, и предсталяют собой общий для нескольких страниц каркас
- **dataController.js** - эмулирует серверную часть сайта
- **moduleWorker.js** - содержит функции для вставки блоков. Функция insert принимает HTMLObject блока в который необходимо поместить новый блок, handlebars-шаблон нового блока, данные в формате JSON или запрос к серверу, так же при необходимости прелоадер
- **screenBuilder.js** - содержит функции для построения страниц сайта путем вызова функции insert из *moduleWorker*  
*например:*  
  вставляем основной набор (хедер, футер, меню) в body  
  затем вствляем текстовое описание в оснвной набор с нужными данными  
  затем вставляем слайдер в оснвной набор с нужными данными  
  и т.д.
- **controller.js** - подписывается на все события связанные с вызовом страниц сайта, и при наступлении события вызывает одну из функций из *screenBuilder.js*

## Развертывание проекта
Должен быть установлен node.js и npm. В консоли выполнить следующие команды:
- git clone https://github.com/Bartzlo/deathwish_viewer.git ./
- npm i gulp -g
- npm i
- gulp

Перейти по адресу http://localhost:3000  
Собранный проект будет находиться в папке build  
При необходимости можно включить создание sourcepams в gulpfile.js
