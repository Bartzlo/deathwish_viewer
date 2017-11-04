module.exports =
`
<header class="logo">
  <img src="./img/logo.png" alt="Death wish">
</header>
`

document.addEventListener('click', e => {
  if (!e.target.classList.contains('.logo') && !e.target.closest('.logo')) return

  e.preventDefault()
  document.dispatchEvent(new Event('callMainScreen', {bubbles: true}))
})
