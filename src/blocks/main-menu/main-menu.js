module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <nav class="main-menu ${className}">
  <ul class="main-menu__list">
    <li class="main-menu__item"><a href="?blog">home</a></li>
    <li class="main-menu__item"><a href="?main">blog</a></li>
    <li class="main-menu__item"><a href="?wiki">wiki</a></li>
  </ul>
  </nav>
  `
}
