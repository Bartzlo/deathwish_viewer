export default class Block {
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

      console.log(slotElem);
      slotElem.remove()
    })
  }
}
