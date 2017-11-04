let logo = require('../logo/logo.js')
let mainMenu = require('../main-menu/main-menu.js')
let mainFooter = require('../main-footer/main-footer.js')
let bookSliderContainer = require('../book-sliders-container/book-sliders-container.js')

module.exports =
`
<div class="content main-screen">
  <div class="wrapper">
    ${logo}
    ${mainMenu}
    ${bookSliderContainer}
  </div>
  ${mainFooter}
</div>
`
