module.exports =
`
<header class="main-header">
  <img src="./img/logo.png" alt="Death wish">
</header>
`

document.addEventListener('click', e => {
  if (!e.target.classList.contains('.main-header') && !e.target.closest('.main-header')) return

  e.preventDefault()
  document.dispatchEvent(new Event('callMainScreen', {bubbles: true}))
})
