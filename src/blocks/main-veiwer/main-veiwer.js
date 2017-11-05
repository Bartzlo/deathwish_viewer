module.exports =
`
<div class="content main-viewer" data-book-name="{{bookName}}" data-issue-name="{{issueName}}">
  <div class="wrapper">
    <header class="main-viewer__header">
      <span class="main-viewer__backBtn"><- Back</span> <span class="main-viewer__homeBtn">Home</span> <h1>{{bookName}}</h1><span>{{issueName}}       part {{partNumber}}</span>
    </header>
    <div class="main-viewer__container">
      <div class="main-viewer__part">
        <img src="{{part}}" alt="Part">
      </div>
    </div>
  </div>
</div>
`

document.addEventListener('click', e => {
  let trg = e.target

  if (isClass(trg, 'main-viewer__backBtn')) {
    e.preventDefault()
    let el = isClass(trg, 'main-viewer')
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
