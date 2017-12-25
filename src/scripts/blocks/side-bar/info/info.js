class Info extends Block {
  _initBlock () {
    this.template = `
      <section class="side-common">
        <h3>
          {{sideCommonHeader}}
        </h3>
        <p>
          {{sideCommonText}}
        </p>
      </section>
    `
  }
}
