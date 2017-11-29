// Block without positioning for inserting block with dynamic content

module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
    <main id="${id}" class="slot"></main>
  `
}
