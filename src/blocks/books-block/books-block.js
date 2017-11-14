module.exports.get = function (className) {
  return `
  <section class="books-block${className ? ' ' + className : ''}">
  </section>
  `
}
