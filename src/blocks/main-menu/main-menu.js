module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <nav class="main-menu ${className}">
  <ul class="main-menu__list">
    <li class="main-menu__item main-menu__item_home"><a href="?blog">home</a></li>
    <li class="main-menu__item main-menu__item_blog"><a href="?main">blog</a></li>
    <li class="main-menu__item main-menu__item_wiki"><a href="?wiki">wiki</a></li>
  </ul>
  </nav>
  `
}
