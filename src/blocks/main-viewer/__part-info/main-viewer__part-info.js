module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <header class="main-viewer__part-info">
    <div class="main-viewer__backBtn">&#129092;</div>
    <div class="main-viewer__homeBtn">&#8962;</div>
    <h1>{{bookName}}</h1>
    <span>
      {{issueName}} part
      <span class="main-viewer__part-number">{{partNumber}}</span>
    </span>
  </header>
  `
}

document.addEventListener('click', e => {
  let trg = e.target

  if (isClass(trg, 'main-viewer__backBtn')) {
    e.preventDefault()
    let el = trg.closest('.main-viewer').querySelector('.main-viewer__present')

    let event = new CustomEvent('callPartsVeiwerScreen', {
      detail: {
        'bookName': el.dataset.bookName,
        'issueName': el.dataset.issueName
      },
      bubbles: true
    })
    document.dispatchEvent(event)
  }

  if (isClass(trg, 'main-viewer__homeBtn')) {
    e.preventDefault()
    document.dispatchEvent(new Event('callMainScreen', {bubbles: true}))
  }
})

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}
