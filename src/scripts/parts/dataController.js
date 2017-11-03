module.exports = class dataController {
  constructor (url) {
    this.dataBase = null
    this.url = url
  }

  loadBase () {
    if (this.dataBase) {
      return Promise.resolve(this.dataBase)
    } else {
      return fetch(this.url)
        .then(res => res.json())
        .then(res => {
          this.dataBase = this._formateConfig(res)
          return this.dataBase
        })
    }
  }

  _formateConfig (config) {
    let rootDir = './img/books/'

    config.forEach(book => {
      book.srcBookPreviwe = rootDir + book.bookName + '/book-previwe.jpg'
      book.altBookPreviwe = book.bookName + ' previwe'

      book.issues.forEach(issue => {
        issue.srcIssuePreviwe = rootDir + book.bookName + '/' + issue.issueName + '/issue-previwe.jpg'
        issue.altIssuePreviwe = issue.issueName + ' previwe'
      })
    })

    return (config)
  }
}
