module.exports = class dataController {
  constructor (url) {
    this.dataBase = null
    this.url = url
    this.rootDir = './img/books/'
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
    config.forEach(book => {
      book.srcBookPreviwe = this.rootDir + book.bookName + '/book-previwe.jpg'
      book.altBookPreviwe = book.bookName + ' previwe'

      book.issues.forEach(issue => {
        issue.srcIssuePreviwe = this.rootDir + book.bookName + '/' + issue.issueName + '/issue-previwe.jpg'
        issue.altIssuePreviwe = issue.issueName + ' previwe'
      })
    })

    return (config)
  }

  getParts (bookName, issueName) {
    let result = {'bookName': bookName, 'issueName': issueName}

    this.dataBase.forEach((book) => {
      if (book.bookName === bookName) {
        book.issues.forEach((issue, i) => {
          if (issue.issueName === issueName) {
            let urls = []

            result.nextIssue = book.issues[i + 1] ? book.issues[i + 1].issueName : ''
            result.prevIssue = book.issues[i - 1] ? book.issues[i - 1].issueName : ''

            for (let i = 1; i <= issue.count; i++) {
              urls.push(this.rootDir + bookName + '/' + issueName + '/' + i + '.jpg')
            }

            result.parts = urls
          }
        })
      }
    })

    return result
  }
}
