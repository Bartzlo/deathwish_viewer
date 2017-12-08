module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <nav class="main-viewer__nav">
    <ul class="main-viewer__navList">
      {{#gen max}}
        <li class="main-viewer__navItem" data-part="{{this}}">{{this}}</li>
      {{/gen}}
    </ul>
  </nav>
  `
}

document.addEventListener('setActiveNavMainViewer', e => {
  let part = document.querySelector('.main-viewer__present').dataset.count
  let activeEl = document.querySelector('.main-viewer__navItem_active')
  if (activeEl) activeEl.classList.remove('main-viewer__navItem_active')
  document.querySelector(`.main-viewer__navItem[data-part="${part}"]`).classList.add('main-viewer__navItem_active')

  let coreEl = document.querySelector('.main-viewer__present')
  document.title = 'Vampire ' + coreEl.dataset.bookName + ' ' + coreEl.dataset.issueName + ' part ' + part

  document.querySelector('.main-viewer__part-number').innerHTML = part
})

document.addEventListener('click', e => {
  let btn = isClass(e.target, 'main-viewer__navItem')

  if (!btn) return

  if (btn.classList.contains('main-viewer__navItem')) {
    let coreEl = document.querySelector('.main-viewer__present')
    let event

    event = new CustomEvent('callMainVeiwer', {
      detail: {
        'bookName': coreEl.dataset.bookName,
        'issueName': coreEl.dataset.issueName,
        'number': btn.dataset.part
      },
      bubbles: true
    })

    document.dispatchEvent(event)
  }
})

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}
