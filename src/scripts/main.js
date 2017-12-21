class Block {
  _initBlock () { }
  _initElement () { }

  createElement (data, options) {
    this.innerBlocks = {}
    this.data = data || {}
    this.options = options || {}

    this._initBlock()
    if (this.options.includes) this.innerBlocks = Object.assign(this.innerBlocks, this.options.includes)

    this.html = Handlebars.compile(this.template)(this.data)
    this.element = document.createElement('div')
    this.element.innerHTML = this.html
    this.element = this.element.firstElementChild

    this._fillSlots()
    this._initElement()

    return this.element
  }

  _fillSlots () {
    let slots = this.element.querySelectorAll('[data-slot]')
    if (slots.lenght === 0) return

    [].forEach.call(slots, (slotElem, index) => {
      let include = this.innerBlocks[slotElem.dataset.slot]

      if (!include) {
        slotElem.remove()
        return
      }

      if (Array.isArray(include)) {
        include.forEach(elem => {
          slotElem.before(elem)
        })
      } else {
        slotElem.before(include)
      }

      slotElem.remove()
    })
  }
}

class Header extends Block {
  _initBlock () {
    let menu = new Menu()
    this.innerBlocks.menu = menu.createElement({info: 'info for menu'}, {className: 'menu-samall'})

    this.template = `
      <div class="header ${this.options.className}" id="${this.options.id}">
        <div data-slot="menu"></div>
        <h1 class="logo">
          Header H1
        </h1>
        <div data-slot="slot1"></div>
      </div>
    `
  }

  _initElement () {
    console.log('Init header')
  }
}

class Menu extends Block {
  _initBlock () {
    this.template = `
      <div class="menu ${this.options.className}" id="${this.options.id}">
        <ul class="menu-list">
          <li class="menu-item">Item 1</li>
          <li class="menu-item">Item 2</li>
          <li class="menu-item">Item 3</li>
        </ul>
      </div>
    `
  }

  _initElement () {
    console.log('Init menu')
    this._handleClick = this._handleClick.bind(this)
    this.element.addEventListener('click', this._handleClick)
  }

  _handleClick (event) {
    let target = event.target

    if (target.classList.contains('menu-item')) {
      console.log(target.innerHTML + ': ' + this.data.info)
    }
  }
}

class SimpleBlock extends Block {
  _initBlock () {
    this.template = `
      <div class="simple-block ${this.options.className}" id="${this.options.id}">
        {{text}}
      </div>
    `
  }

  _initElement () {
    console.log('Init simple block')
  }
}

let header = new Header()
let block = new SimpleBlock()

let elementHeader = header.createElement(null, {
  className: 'big',
  id: '',
  includes: {
    slot1: [block.createElement({text: 'first simple block'}), block.createElement({text: 'second simple block'}), block.createElement({text: 'QWEQWE'})]
  }
})

document.getElementById('root').appendChild(elementHeader)

