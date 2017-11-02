let template =
`
<div class="logo">
  {{#images}}
  <img src="{{.}}" alt="logo">
  {{/images}}
</div>
`
module.exports = template