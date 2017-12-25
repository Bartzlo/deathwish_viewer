class Content extends Block {
  _initBlock () {
    this.template = `
      <main class="content">
        <article>
          <header>
            <h2>{{contentHeader}}</h2>
          </header>
          <section>
            {{contentText}}
          </section>
          <footer>
            {{contentDate}}
          </footer>
        </article>
      </main>
    `
  }
}
