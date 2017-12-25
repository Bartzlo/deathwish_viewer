class SideBar extends Block {
  _initBlock () {
    this.template = `
      <aside class="side-bar ${this.options.className}">
        <div>
          <ul>
            {{#sideBarItems}}
            <li>.</li>
            {{/sideBarItems}}
            </ul>
        </div>
        <div data-slot="slot1"></div>
      </aside>
    `
  }
}
