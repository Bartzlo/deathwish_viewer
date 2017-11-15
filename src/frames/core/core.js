let wrapper = require('../../blocks/wpapper/wrapper')
let mainHeader = require('../../blocks/main-header/main-header')
let mainMenu = require('../../blocks/main-menu/main-menu')
let content = require('../../blocks/content/content')
let mainFooter = require('../../blocks/main-footer/main-footer')

module.exports.get = function () {
  return `
    ${wrapper.get(null, `
      ${mainHeader.get()}
      ${mainMenu.get()}
      ${content.get()}
    `)}
    ${mainFooter.get()}
  `
}
