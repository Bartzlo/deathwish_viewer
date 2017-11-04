module.exports =
`
<div class="book-slider">
  <div class="book-slider__head">
    <img src="{{srcBookPreviwe}}" alt="{{altBookPreviwe}}">
    <h2>{{bookName}}</h2>
  </div>
  <a href="">
    <div class="book-slider__backBtn">
      &#8647;
    </div>
  </a>
  <div class="book-slider__slider">
  <ul class="book-slider__slideList" data-shift="0">
    {{#issues}}
    <li class="book-slider__slideItem" data-issue_url="{{issueUrl}}" data-issue_count="{{issueCount}}">
      <a href="#"><img src="{{srcIssuePreviwe}}" alt="{{altIssuePreviwe}}"></a>
      <h3>{{issueName}}</h3>
    </li>
    {{/issues}}
  </ul>
  </div>
  <a href="">
    <div class="book-slider__forwardBtn">
      &#8649;
    </div>
  </a>
</div>
`

document.addEventListener('click', e => {
  console.log('click')
  let trg = e.target
  // let el

  if (isClass(trg, 'book-slider__forwardBtn')) {
    e.preventDefault()
    let bookModule = trg.closest('.book-slider')
    slideBookModule(bookModule, -216)
    return
  }

  if (isClass(trg, 'book-slider__backBtn')) {
    e.preventDefault()
    let bookModule = trg.closest('.book-slider')
    slideBookModule(bookModule, 216)
    return
  }

  // if (el === isClass(trg, 'book-slider__slideItem')) {
  //   let event = new CustomEvent('callPageSelectScreen', {
  //     detail: {
  //       url: el.dataset.issue_url,
  //       count: el.dataset.issue_count
  //     }
  //   })

  //   document.dispatchEvent(event)
  // }
})

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}

function slideBookModule (bookModule, shift) {
  let slider = bookModule.querySelector('.book-slider__slider')
  let slideList = bookModule.querySelector('.book-slider__slideList')

  let sliderWidth = slider.getBoundingClientRect().width
  let slideListWidth = slideList.getBoundingClientRect().width

  let currShift = parseInt(slideList.dataset.shift)
  let left = currShift + shift

  if (left > 0) {
    slideList.style.transform = `translatex(0px)`
    slideList.dataset.shift = 0
    return
  }

  if (left < (sliderWidth - slideListWidth)) {
    slideList.style.transform = `translatex(${-(slideListWidth - sliderWidth)}px)`
    slideList.dataset.shift = -(slideListWidth - sliderWidth)
    return
  }

  slideList.style.transform = `translatex(${left}px)`
  slideList.dataset.shift = left
}
