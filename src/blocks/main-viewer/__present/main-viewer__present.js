module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <div class="main-viewer__present" data-book-name="{{bookName}}" data-issue-name="{{issueName}}" data-count="{{count}}">
    <div class="main-viewer__backwardBtn" data-inc="-1"><svg width="36px" height="36px" class="JUQOtc yjarQe" viewBox="0 0 24 24"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></svg></div>
    <div class="main-viewer__imgs-area">
      <div class="main-viewer__part">
        <img class="current-img" src="{{part}}" alt="Part" data-number="{{partNumber}}">
      </div>
    </div>
    <div class="main-viewer__forwardBtn" data-inc="1"><svg width="36px" height="36px" class="JUQOtc yjarQe" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path></svg></div>
  </div>
  `
}

document.addEventListener('mousedown', e => {
  if (isClass(e.target, 'main-viewer__backwardBtn') || isClass(e.target, 'main-viewer__forwardBtn')) e.preventDefault()
})

document.addEventListener('click', e => {
  let trg = e.target

  if (isClass(trg, 'main-viewer__backwardBtn') || isClass(trg, 'main-viewer__forwardBtn')) {
    e.preventDefault()

    let currentImg = document.querySelector('.current-img')
    let el = isClass(trg, 'main-viewer__backwardBtn') || isClass(trg, 'main-viewer__forwardBtn')
    let currentNumber = currentImg.dataset.number
    let queryNumber = parseInt(currentNumber) + parseInt(el.dataset.inc)

    if (queryNumber < 1 || queryNumber > isClass(trg, 'main-viewer__present').dataset.count) {
      return
    }

    changeImg(currentImg, queryNumber, queryNumber > currentNumber ? 'fwd' : 'bwd')

    let url = window.location.hash.split('&')
    url[url.length - 1] = queryNumber
    url = url.join('&')
    history.pushState({path: url}, '', url)
  }

  if (isClass(trg, 'main-viewer__backBtn')) {
    e.preventDefault()
    let el = trg.closest('.main-viewer').querySelector('.main-viewer__present')

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
