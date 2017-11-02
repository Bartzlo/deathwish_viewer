let template =
`
<div class="main-menu">
  <ul class="main-menu__list">
    {{#menuItems}}
    <li class="main-menu__item">{{.}}</li>
    {{/menuItems}}
  </ul>
</div>
`
module.exports = template