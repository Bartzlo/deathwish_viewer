class ContentSlot extends Block {
  _initBlock () {
    this.template = `
      <div> calss="slot" id="${this.options.id}">
      </div>
    `
  }
}
