'use strict';
console.log('start main script');
//********************************//

const Mustache = require('mustache');

var view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  }
};

var output = Mustache.render("{{title}} spends {{calc}}", view);

document.body.append(output);
