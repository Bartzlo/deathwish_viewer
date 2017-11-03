let logo = require('../logo/logo.js')
let mainMenu = require('../main-menu/main-menu.js')
let mainFooter = require('../main-footer/main-footer.js')
let bookSliderContainer = require('../book-sliders-container/book-sliders-container.js')

module.exports =
`
<div>
  <div class="wrapper">
    <div id="cell-logo">${logo}</div>
    <div id="cell-mainMenu">${mainMenu}</div>
    ${bookSliderContainer}
  </div>
  <div id="cell-mainFooter">${mainFooter}</div>
</div>
`
