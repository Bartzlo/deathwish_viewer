let present = require('./__present/main-viewer__present').get()
let partInfo = require('./__part-info/main-viewer__part-info').get()

module.exports.get = function () {
  return `
  <section class="main-viewer">
    ${partInfo}
    ${present}
  </section>
  `
}
