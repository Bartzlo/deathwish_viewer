module.exports.get = function () {
  return `
  <div class="main-veiwer__hiddens">
    {{#parts}}
      <img hidden src="{{url}}" data-number="{{partNumber}}">
    {{/parts}}
  </div>
  `
}
