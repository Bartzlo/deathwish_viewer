let wrapper = require('../../blocks-frames/wpapper/wrapper')
let content = require('../../blocks-frames/content/content')
let mainHeader = require('../../blocks/main-header/main-header')
let mainMenu = require('../../blocks/main-menu/main-menu')
let mainFooter = require('../../blocks/main-footer/main-footer')

module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
    ${wrapper.get(null, null, `
      ${mainHeader.get()}
      ${mainMenu.get()}
      ${content.get(null, 'main-content', null)}
    `)}
    ${mainFooter.get()}
  `
}
