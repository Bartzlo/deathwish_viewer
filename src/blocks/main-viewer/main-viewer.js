let present = require('./__present/main-viewer__present').get()
let nav = require('./__nav/main-viewer__nav').get()
let partInfo = require('./__part-info/main-viewer__part-info').get()

module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <section class="main-viewer">
    ${partInfo}
    <nav id="main-viewer__nav" class="main-viewer__nav"></nav>
    ${present}
  </section>
  `
}
