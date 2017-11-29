// Data structure
// {
//   "bookName": "",
//   "issueName": "",
//   "prevIssue": "", // name
//   "nextIssue": "", // name
//   "parts": [
//     {
//       "partNumber": "",
//       "url": ""
//     }
//   ]
// }

module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <section class="parts-previewer ${className}" data-book-name="{{bookName}}" data-issue-name="{{issueName}}">
    <header class="parts-previewer__header">
      <h1>{{bookName}}</h1><span>{{issueName}}</span>
    </header>
    <div class="parts-previewer__container">
      <div class="parts-previewer__btn" data-issue-name="{{prevIssue}}">
        &#11164;
      </div>
      <ul class="parts-previewer__list">
        {{#parts}}
          <li class="parts-previewer__item" data-number={{partNumber}}>
            <img src="{{url}}" alt="Image not found">
          </li>
        {{/parts}}
      </ul>
      <div class="parts-previewer__btn" data-issue-name="{{nextIssue}}">
        &#11166;
      </div>
    </div>
  </section>
  `
}

document.addEventListener('mousedown', e => {
  if (isClass(e.target, 'parts-previewer__item') || isClass(e.target, 'parts-previewer__btn')) e.preventDefault()
})

document.addEventListener('click', e => {
  let trg = e.target

  if (isClass(trg, 'parts-previewer__item')) {
    e.preventDefault()
    let el = isClass(trg, 'parts-previewer')
    let event = new CustomEvent('callMainVeiwer', {
      detail: {
        'bookName': el.dataset.bookName,
        'issueName': el.dataset.issueName,
        'number': isClass(trg, 'parts-previewer__item').dataset.number
      },
      bubbles: true
    })
    document.dispatchEvent(event)
  }

  if (isClass(trg, 'parts-previewer__btn')) {
    e.preventDefault()
    let el = isClass(trg, 'parts-previewer')
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
