module.exports =
`
<div class="parts-viewer" data-book-name="{{bookName}}" data-issue-name="{{issueName}}">
  <header class="parts-viewer__header">
    <h1>{{bookName}}</h1><span>{{issueName}}</span>
  </header>
  <div class="parts-viewer__container">
    <div class="parts-viewer__btn" data-issue-name="{{prevIssue}}">
      &#8647;
    </div>
    <ul class="parts-viewer__list">
      {{#parts}}
        <li class="parts-viewer__item" data-number={{partNumber}}>
          <img src="{{url}}" alt="Image not found">
        </li>
      {{/parts}}
    </ul>
    <div class="parts-viewer__btn" data-issue-name="{{nextIssue}}">
      &#8649;
    </div>
  </div>
</div>
`

document.addEventListener('click', e => {
  let trg = e.target

  if (isClass(trg, 'parts-viewer__item')) {
    e.preventDefault()
    let el = isClass(trg, 'parts-viewer')
    let event = new CustomEvent('callMainVeiwer', {
      detail: {
        'bookName': el.dataset.bookName,
        'issueName': el.dataset.issueName,
        'number': isClass(trg, 'parts-viewer__item').dataset.number
      },
      bubbles: true
    })
    document.dispatchEvent(event)
  }

  if (isClass(trg, 'parts-viewer__btn')) {
    e.preventDefault()
    let el = isClass(trg, 'parts-viewer')
    let event = new CustomEvent('callPartsVeiwerScreen', {
      detail: {
        'bookName': el.dataset.bookName,
        'issueName': trg.dataset.issueName
      },
      bubbles: true
    })
    document.dispatchEvent(event)
  }
})

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}
