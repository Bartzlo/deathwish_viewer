module.exports.get = function (className) {
  return `
    <main id="content" class="${className || ''}"></main>
  `
}
