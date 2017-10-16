'use strict';
console.log('start main script');
//********************************//

const Mustache = require('mustache');

let imgs = [
  {src: 'img/im_01', alt: "alt_01", title: 'title_01'},
  {src: 'img/im_02', alt: "alt_02", title: 'title_02'},
  {src: 'img/im_03', alt: "alt_03", title: 'title_03'},
  {src: 'img/im_04', alt: "alt_04", title: 'title_04'},
  {src: 'img/im_05', alt: "alt_05", title: 'title_05'}
];

let core = document.getElementById('core').innerHTML;
Mustache.parse(core);
let render = Mustache.render(core, {
  "coreItems":
    [
      {
      "srcBookPreviwe": "img/book-previwe.jpg",
      "altBookPreviwe": "Book 1 previwe",
      "bookTitle": "Book 1",
      "bookModuleItem":
        [
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 1 previwe",
          "partTitle": "Part 1"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 2 previwe",
          "partTitle": "Part 2"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 3 previwe",
          "partTitle": "Part 3"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 4 previwe",
          "partTitle": "Part 4"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 5 previwe",
          "partTitle": "Part 5"
          }
        ]
      },
      {
      "srcBookPreviwe": "img/book-previwe.jpg",
      "altBookPreviwe": "Book 2 previwe",
      "bookTitle": "Book 2",
      "bookModuleItem":
        [
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 1 previwe",
          "partTitle": "Part 1"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 2 previwe",
          "partTitle": "Part 2"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 3 previwe",
          "partTitle": "Part 3"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 4 previwe",
          "partTitle": "Part 4"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 5 previwe",
          "partTitle": "Part 5"
          }
        ]
      },
      {
      "srcBookPreviwe": "img/book-previwe.jpg",
      "altBookPreviwe": "Book 3 previwe",
      "bookTitle": "Book 3",
      "bookModuleItem":
        [
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 1 previwe",
          "partTitle": "Part 1"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 2 previwe",
          "partTitle": "Part 2"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 3 previwe",
          "partTitle": "Part 3"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 4 previwe",
          "partTitle": "Part 4"
          },
          {
          "srcPartPreviwe": "img/issue-previwe.jpg",
          "altPartPreviwe": "Part 5 previwe",
          "partTitle": "Part 5"
          }
        ]
      }
    ]
});

document.querySelector('.core').innerHTML = render;
