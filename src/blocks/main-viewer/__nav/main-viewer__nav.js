module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <ul class="main-viewer__navList">
    {{#parts}}
      <li class="main-viewer__navItem" data-part="partNumber">[{{partNumber}}]</li>
    {{/parts}}
  </ul>
  `
}
