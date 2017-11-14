module.exports.get = function (className) {
  return `
  <header class="main-header${className ? ' ' + className : ''}">
    <img src="./img/logo.png" alt="Death wish">
  </header>
  `
}

document.addEventListener('click', e => {
  if (!e.target.classList.contains('.main-header') && !e.target.closest('.main-header')) return

  e.preventDefault()
  document.dispatchEvent(new Event('callMainScreen', {bubbles: true}))
})
