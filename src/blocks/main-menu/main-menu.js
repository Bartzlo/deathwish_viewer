module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <nav class="main-menu ${className}">
  <ul class="main-menu__list">
    <li class="main-menu__item"><a href="?blog">Blog</a></li>
    <li class="main-menu__item"><a href="?main">Read</a></li>
    <li class="main-menu__item"><a href="?wiki">Wiki</a></li>
  </ul>
  </nav>
  `
}
