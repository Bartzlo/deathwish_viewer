module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <div class="preloader-slider ${className}">
    <img class="preloader-slider__img" src="./img/small-preloader.svg">
  </div>
  `
}
