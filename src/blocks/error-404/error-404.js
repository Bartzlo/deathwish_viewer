module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <div class="error-404 ${className}">
    <span>Page not found</span>
      <div class="error-404__text_big">
      <span class="error-404__text_red">4</span>0<span class="error-404__text_red">4</span>
      </div>
    <a href="./">Go to home page</a>
  </div>
  `
}
