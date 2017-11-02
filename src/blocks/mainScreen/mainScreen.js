let logo = require('../logo/logo.js')
let mainMenu = require('../mainMenu/mainMenu.js')

let template =
`
<div class="wrapper">
  <div id="cell-logo"></div>
  <div id="cell-mainMenu">${mainMenu}</div>
</div>
`
module.exports = template