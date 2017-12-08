// Data structute:
// {
//   "count": "",
//   "srcBookPreviwe": "",
//   "altBookPreviwe": "",
//   "bookName": "",
//   "issues": [
//     {
//       "issueName": "",
//       "srcIssuePreviwe": "",
//       "altIssuePreviwe": ""
//     }
//   ]
// }

module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <div class="book-slider ${className}">
    <header class="book-slider__head">
      <img src="{{srcBookPreviwe}}" alt="{{altBookPreviwe}}">
      
    </header>
    <div class="book-slider__backBtn">
      .
    </div>
    <div class="book-slider__slider" data-book-name="{{bookName}}" data-count="{{count}}">
      <ul class="book-slider__slideList" data-shift="0">
        {{#issues}}
        <li class="book-slider__slideItem" data-issue-name="{{issueName}}">
          <img src="{{srcIssuePreviwe}}" alt="{{altIssuePreviwe}}">
          <h3>{{issueName}}</h3>
        </li>
        {{/issues}}
      </ul>
    </div>
    <div class="book-slider__forwardBtn">
      .
    </div>
  </div>
  `
}

let startSwipe
let currSwipe
let swipedModule

document.addEventListener('touchstart', e => {
  swipedModule = isClass(e.target, 'book-slider__slider')
  if (swipedModule) {
    startSwipe = e.changedTouches[0].pageX
    currSwipe = parseFloat(swipedModule.firstElementChild.dataset.shift.replace('px', ''))
    document.addEventListener('touchend', stopSwipe)
    document.addEventListener('touchmove', swipe)
  }
})

function swipe (e) {
  var newLeft = e.changedTouches[0].pageX - startSwipe + currSwipe
  slideBookModule(swipedModule.parentElement, newLeft)
}

function stopSwipe () {
  document.removeEventListener('mousemove', swipe)
  document.removeEventListener('mouseup', stopSwipe)
}

document.addEventListener('mousedown', e => {
  if (isClass(e.target, 'book-slider__forwardBtn') || isClass(e.target, 'book-slider__backBtn')) e.preventDefault()
})

document.addEventListener('click', e => {
  let trg = e.target

  if (isClass(trg, 'book-slider__forwardBtn')) {
    e.preventDefault()
    let bookModule = trg.closest('.book-slider')
    slideBookModule(bookModule, -216 + parseInt(bookModule.querySelector('.book-slider__slideList').dataset.shift))
    return
  }

  if (isClass(trg, 'book-slider__backBtn')) {
    e.preventDefault()
    let bookModule = trg.closest('.book-slider')
    slideBookModule(bookModule, 216 + parseInt(bookModule.querySelector('.book-slider__slideList').dataset.shift))
    return
  }

  let el = isClass(trg, 'book-slider__slideItem')
  if (el) {
    let event = new CustomEvent('callPartsVeiwerScreen', {
      detail: {
        issueName: el.dataset.issueName,
        bookName: el.closest('.book-slider__slider').dataset.bookName
      },
      bubbles: true
    })

    document.dispatchEvent(event)
  }
})

function slideBookModule (bookModule, shift) {
  let slider = bookModule.querySelector('.book-slider__slider')
  let slideList = bookModule.querySelector('.book-slider__slideList')
  let firstItem = slideList.querySelector('.book-slider__slideItem') // to calc list width (IE 11 support)

  let sliderWidth = slider.getBoundingClientRect().width
  let slideListWidth = (firstItem.offsetWidth + 8) * slider.dataset.count // 8 - is margin of book-slider__slideItem

  if (shift > 0) {
    slideList.style.transform = `translatex(0px)`
    slideList.dataset.shift = 0
    return
  }

  if (shift < (sliderWidth - slideListWidth)) {
    slideList.style.transform = `translatex(${-(slideListWidth - sliderWidth)}px)`
    slideList.dataset.shift = -(slideListWidth - sliderWidth)
    return
  }

  slideList.style.transform = `translatex(${shift}px)`
  slideList.dataset.shift = shift
}

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}
