module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <div class="main-viewer__present {{#if_eq count 1}}main-viewer__present_isFirst{{/if_eq}}{{#if_eq count max}}main-viewer__present_isLast{{/if_eq}}" data-book-name="{{bookName}}" data-issue-name="{{issueName}}" data-count="{{count}}" data-next-issue="{{nextIssue}}", data-prev-issue="{{prevIssue}}">
    <div class="main-viewer__controlBtn main-viewer__controlBtn_prev" data-inc="-1"><div></div><svg width="36px" height="36px" class="JUQOtc yjarQe" viewBox="0 0 24 24"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></svg></div>
    <div class="main-viewer__controlBtn main-viewer__controlBtn_next" data-inc="1"><div></div><svg width="36px" height="36px" class="JUQOtc yjarQe" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></svg></div>
    <div class="main-viewer__chaptControlBtn main-viewer__chaptControlBtn_prev">Previous chapter</div>
    <div class="main-viewer__chaptControlBtn main-viewer__chaptControlBtn_next">Next chapter</div>
    <div class="main-viewer__endBtn">Finish of the {{bookName}}, go to home pahe</div>
    <div class="main-viewer__slider">
      <div class="main-viewer__wrapper">
        {{#parts}}
          <div><img src="{{url}}" data-number="{{partNumber}}"></div>
        {{/parts}}
      </div>
    </div>
  </div>
  `
}

let swipe

document.addEventListener('mainViewerIsLoad', e => {
  let part = document.querySelector('.main-viewer__present').dataset.count
  swipe = new Swipe(document.querySelector('.main-viewer__slider'), {
    startSlide: part - 1,
    speed: 400,
    auto: false,
    draggable: true,
    continuous: false,
    disableScroll: false,
    stopPropagation: false,
    callback: afterSwipe
  })
})

function afterSwipe (index, elem, dir) {
  window.scrollTo(0, 0)

  let url = window.location.hash.split('&')
  url[url.length - 1] = index + 1
  url = url.join('&')
  history.pushState({path: url}, '', url)

  let viewerPresent = document.querySelector('.main-viewer__present')
  viewerPresent.dataset.count = index + 1
  document.dispatchEvent(new CustomEvent('setActiveNavMainViewer'))

  if (index + 1 <= 1) {
    viewerPresent.classList.add('main-viewer__present_isFirst')
    return
  }

  if (index + 1 >= elem.parentElement.childElementCount) {
    viewerPresent.classList.add('main-viewer__present_isLast')
    return
  }

  viewerPresent.classList.remove('main-viewer__present_isFirst')
  viewerPresent.classList.remove('main-viewer__present_isLast')
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

  if (btn.classList.contains('main-viewer__controlBtn_prev')) {
    e.preventDefault()
    swipe.prev()
  }

  if (btn.classList.contains('main-viewer__controlBtn_next')) {
    e.preventDefault()
    swipe.next()
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

function isClass (elem, selector) {
  return elem.classList.contains(selector) ? elem : elem.closest('.' + selector)
}
