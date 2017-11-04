module.exports =
`
<div class="parts-viewer" data-book-name="{{bookName}}" data-issue-name="{{issueName}}">
  <header class="parts-viewer__header">
    <h1>{{bookName}}</h1><span>{{issueName}}</span>
  </header>
  <div class="parts-viewer__container">
    <div class="parts-viewer__backBtn" data-issue-name="{{prevIssue}}">
      &#8647;
    </div>
    <ul class="parts-viewer__list">
      {{#parts}}
        <li class="parts-viewer__item">
          <img src="{{.}}" alt="Part previwe">
        </li>
      {{/parts}}
    </ul>
    <div class="parts-viewer__forwardBtn" data-issue-name="{{nextIssue}}">
      &#8649;
    </div>
  </div>
</div>
`

document.addEventListener('click', e => {
  let trg = e.target

  if (isClass(trg, 'parts-viewer__forwardBtn')) {
    e.preventDefault()
    let el = isClass(trg, 'parts-viewer')
    link(el.dataset.bookName, trg.dataset.issueName)
  }

  if (isClass(trg, 'parts-viewer__backBtn')) {
    e.preventDefault()
    let el = isClass(trg, 'parts-viewer')
    link(el.dataset.bookName, trg.dataset.issueName)
  }
})

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}

function link (bookName, issueName) {
  let event = new CustomEvent('callPartsVeiwerScreen', {
    detail: {
      'bookName': bookName,
      'issueName': issueName
    },
    bubbles: true
  })

  document.dispatchEvent(event)
}
