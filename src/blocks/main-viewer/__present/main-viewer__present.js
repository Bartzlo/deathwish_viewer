module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <div class="main-viewer__present {{#if_eq partNumber 1}}main-viewer__present_isFirst{{/if_eq}}{{#if_eq partNumber count}}main-viewer__present_isLast{{/if_eq}}" data-book-name="{{bookName}}" data-issue-name="{{issueName}}" data-count="{{count}}" data-next-issue="{{nextIssue}}", data-prev-issue="{{prevIssue}}">
    <div class="main-viewer__controlBtn main-viewer__controlBtn_prev" data-inc="-1"><div></div><svg width="36px" height="36px" class="JUQOtc yjarQe" viewBox="0 0 24 24"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></svg></div>
    <div class="main-viewer__controlBtn main-viewer__controlBtn_next" data-inc="1"><div></div><svg width="36px" height="36px" class="JUQOtc yjarQe" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></svg></div>
    <div class="main-viewer__chaptControlBtn main-viewer__chaptControlBtn_prev">&#129092; Previous chapter</div>
    <div class="main-viewer__chaptControlBtn main-viewer__chaptControlBtn_next">Next chapter &#129094;</div>
    <div class="main-viewer__endBtn">Finish of the {{bookName}} &#8962;</div>
    <div class="main-viewer__imgs-area">
      <div class="main-viewer__part">
        <img class="current-img" src="{{part}}" alt="Part" data-number="{{partNumber}}">
      </div>
    </div>
  </div>
  `
}

document.addEventListener('mousedown', e => {
  if (isClass(e.target, 'main-viewer__controlBtn')) e.preventDefault()
})

document.addEventListener('click', e => {
  let trg = e.target

  let btn = isClass(trg, 'main-viewer__controlBtn') ||
    isClass(trg, 'main-viewer__chaptControlBtn') ||
    isClass(trg, 'main-viewer__endBtn')

  if (!btn) return

  let coreEl = isClass(trg, 'main-viewer__present')

  if (btn.classList.contains('main-viewer__controlBtn')) {
    e.preventDefault()
    window.scrollTo(0, 0)

    let currentImg = document.querySelector('.current-img')
    let currentNumber = parseInt(currentImg.dataset.number)
    let queryNumber = currentNumber + parseInt(btn.dataset.inc)

    changeImg(currentImg, queryNumber, queryNumber > currentNumber ? 'fwd' : 'bwd')
    document.dispatchEvent(new CustomEvent('setActiveNavMainViewer'))

    let url = window.location.hash.split('&')
    url[url.length - 1] = queryNumber
    url = url.join('&')
    history.pushState({path: url}, '', url)

    if (queryNumber <= 1) {
      coreEl.classList.add('main-viewer__present_isFirst')
      return
    }

    if (queryNumber >= coreEl.dataset.count) {
      coreEl.classList.add('main-viewer__present_isLast')
      return
    }

    coreEl.classList.remove('main-viewer__present_isFirst')
    coreEl.classList.remove('main-viewer__present_isLast')
  }

  if (btn.classList.contains('main-viewer__chaptControlBtn')) {
    e.preventDefault()
    window.scrollTo(0, 0)

    let el = isClass(trg, 'main-viewer__present')
    let event

    if (btn.classList.contains('main-viewer__chaptControlBtn_prev')) {
      event = new CustomEvent('callMainVeiwer', {
        detail: {
          'bookName': el.dataset.bookName,
          'issueName': el.dataset.prevIssue,
          'number': ''
        },
        bubbles: true
      })
    } else if (btn.classList.contains('main-viewer__chaptControlBtn_next')) {
      event = new CustomEvent('callMainVeiwer', {
        detail: {
          'bookName': el.dataset.bookName,
          'issueName': el.dataset.nextIssue,
          'number': '1'
        },
        bubbles: true
      })
    }

    document.dispatchEvent(event)
  }

  if (btn.classList.contains('main-viewer__endBtn')) {
    e.preventDefault()
    document.dispatchEvent(new CustomEvent('callMainScreen', {bubbles: true}))
  }
})

function changeImg (img, counter, direction) {
  document.querySelector('.main-viewer__part-number').innerHTML = counter
  let imgContainer = document.querySelector('.main-viewer__part')
  let newImg = document.querySelector(`[data-number="${counter}"]`)
  newImg.classList.add('current-img')
  newImg.removeAttribute('hidden')

  img.classList.remove('current-img')
  img.addEventListener('transitionend', hideElem)

  if (direction === 'bwd') {
    img.classList.add('forward-img')
    newImg.classList.add('backward-img')
    imgContainer.insertBefore(newImg, img)
  } else if (direction === 'fwd') {
    img.classList.add('backward-img')
    newImg.classList.add('forward-img')
    imgContainer.appendChild(newImg)
  }

  setTimeout(() => {
    newImg.classList.remove('forward-img')
    newImg.classList.remove('backward-img')
  }, 20)
}

function hideElem (e) {
  if (e.target.classList.contains('current-img')) return
  e.target.setAttribute('hidden', '')
}

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}
