module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <nav class="main-menu ${className}">
    <ul class="main-menu__list">
      <li class="main-menu__item main-menu__item_home"><a href="#">home</a></li>
      <li class="main-menu__item main-menu__item_blog"><a href="#">blog</a></li>
      <li class="main-menu__item main-menu__item_wiki"><a href="#">wiki</a></li>
    </ul>
  </nav>
  `
}

document.addEventListener('click', e => {
  if (isClass(e.target, 'main-menu__item_blog')) {
    e.preventDefault()
    document.dispatchEvent(new Event('callError404'))
    return
  }
  if (isClass(e.target, 'main-menu__item_wiki')) {
    e.preventDefault()
    document.dispatchEvent(new Event('callError404'))
    return
  }
})

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}
