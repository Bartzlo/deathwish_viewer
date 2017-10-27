function init () {
  document.addEventListener('click', e => {
    let trg = e.target

    while (trg) {
      if (trg.classList.contains('books-module__forwardBtn')) {
        e.preventDefault()
        let bookModule = trg.closest('.books-module')
        slideBookModule(bookModule, -216)
        return
      }

      if (trg.classList.contains('books-module__backBtn')) {
        e.preventDefault()
        let bookModule = trg.closest('.books-module')
        slideBookModule(bookModule, 216)
        return
      }

      trg = trg.parentElement
    }
  })

  function slideBookModule (bookModule, shift) {
    let slider = bookModule.querySelector('.books-module__slider')
    let slideList = bookModule.querySelector('.books-module__slideList')

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
}

module.exports.init = init
