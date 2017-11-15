// partnNode.append
// source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append () {
        var argArr = Array.prototype.slice.call(arguments)
        var docFrag = document.createDocumentFragment()

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)))
        })

        this.appendChild(docFrag)
      }
    })
  })
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

// partnNode.before
// source: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/before()/before().md

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('before')) {
      return
    }
    Object.defineProperty(item, 'before', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before () {
        var argArr = Array.prototype.slice.call(arguments)
        var docFrag = document.createDocumentFragment()

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)))
        })

        this.parentNode.insertBefore(docFrag, this)
      }
    })
  })
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

// partnNode.after
// source: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/after()/after().md

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('after')) {
      return
    }
    Object.defineProperty(item, 'after', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function after () {
        var argArr = Array.prototype.slice.call(arguments)
        var docFrag = document.createDocumentFragment()

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)))
        })

        this.parentNode.insertBefore(docFrag, this.nextSibling)
      }
    })
  })
})([Element.prototype, CharacterData.prototype, DocumentType.prototype])
