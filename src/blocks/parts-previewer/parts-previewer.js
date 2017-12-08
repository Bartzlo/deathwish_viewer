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
      <div class="parts-previewer__btn parts-previewer__btn_prev" data-issue-name="{{prevIssue}}">
        .
      </div>
      <ul class="parts-previewer__list">
        {{#parts}}
          <li class="parts-previewer__item" data-number={{partNumber}}>
            <img src="{{url}}" alt="Image not found">
          </li>
        {{/parts}}
      </ul>
      <div class="parts-previewer__btn parts-previewer__btn_next" data-issue-name="{{nextIssue}}">
        .
      </div>
    </div>
  </section>
  `
}

let startSwipe

document.addEventListener('touchstart', e => {
  if (isClass(e.target, 'parts-previewer__container')) {
    startSwipe = e.changedTouches[0].pageX
    document.addEventListener('touchend', stopSwipe)
  }
})

function stopSwipe (e) {
  document.removeEventListener('mouseup', stopSwipe)

  if (startSwipe - e.changedTouches[0].pageX < -100) {
    let newEvent = new Event('click', {bubbles: true})
    document.querySelector('.parts-previewer__btn_prev').dispatchEvent(newEvent)
  }

  if (startSwipe - e.changedTouches[0].pageX > 100) {
    let newEvent = new Event('click', {bubbles: true})
    document.querySelector('.parts-previewer__btn_next').dispatchEvent(newEvent)
  }
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
