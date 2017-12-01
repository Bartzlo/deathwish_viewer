module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <header class="main-header ${className}">
    <a href="#">
      <img class="main-header__logo" src="./img/logo.png" alt="Death wish">
    </a>
  </header>
  `
}

// Link to index page
document.addEventListener('click', e => {
  if (isClass(e.target, 'main-header')) {
    e.preventDefault()
    document.dispatchEvent(new CustomEvent('callMainScreen'))
  }
})

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}
