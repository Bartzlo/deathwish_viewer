let wrapper = require('../../blocks-frames/wpapper/wrapper')
let content = require('../../blocks-frames/content/content')

module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
    ${wrapper.get(null, null, `
      ${content.get(null, 'pats-slider')}
    `)}
  `
}
