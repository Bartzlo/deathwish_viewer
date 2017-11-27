module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <nav class="main-viewer__nav">
    <ul class="main-viewer__navList">
      {{#gen count}}
        <li class="main-viewer__navItem" data-part="{{this}}">{{this}}</li>
      {{/gen}}
    </ul>
  </nav>
  `
}

document.addEventListener('setActiveNavMainViewer', e => {
  let part = document.querySelector('.current-img').dataset.number
  let activeEl = document.querySelector('.main-viewer__navItem_active')
  if (activeEl) activeEl.classList.remove('main-viewer__navItem_active')
  document.querySelector(`.main-viewer__navItem[data-part="${part}"]`).classList.add('main-viewer__navItem_active')
})

document.addEventListener('click', e => {
  let btn = isClass(e.target, 'main-viewer__navItem')

  if (!btn) return

  if (btn.classList.contains('main-viewer__navItem')) {
    let coreEl = isClass(e.target, 'main-viewer').querySelector('.main-viewer__present')
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
