module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <img class="preloader-viewer ${className}" src="./img/big-preloader.svg">
  `
}
