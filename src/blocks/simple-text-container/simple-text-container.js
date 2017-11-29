// Data structure
// {
//   "text": ""
// }

module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <section class="simple-text-container">
    {{text}}
  </section>
  `
}
