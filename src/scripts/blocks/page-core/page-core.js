import {Header} from './../header/header'
import {Menu} from './../menu/menu'
import {Footer} from './../footer/footer'
import {SideBar} from './../side-bar/side-bar'

class PageCore extends Block {
  _initBlock () {
    this.innerBlocks.header = new Header().createElement()
    this.innerBlocks.menu = new Menu().createElement()
    this.innerBlocks.footer = new Footer().createElement()
    this.innerBlocks.sideBart = new SideBar().createElement()

    this.template = `
      <div>
        <div data-slot="header">
        <div data-slot="menu">
      </div>
    `
  }
}
