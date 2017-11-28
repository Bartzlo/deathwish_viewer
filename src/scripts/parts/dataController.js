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

  getMinParts (bookName, issueName) {
    let result = {'bookName': bookName, 'issueName': issueName}
    let success = false

    this.dataBase.forEach((book) => {
      if (book.bookName === bookName) {
        book.issues.forEach((issue, i) => {
          if (issue.issueName === issueName) {
            let urls = []

            result.nextIssue = book.issues[i + 1] ? book.issues[i + 1].issueName : ''
            result.prevIssue = book.issues[i - 1] ? book.issues[i - 1].issueName : ''

            for (let i = 1; i <= issue.count; i++) {
              urls.push({'url': this.rootDir + bookName + '/' + issueName + '/min-' + i + '.jpg',
                'partNumber': i})
            }

            success = true
            result.parts = urls
          }
        })
      }
    })

    return success ? result : 404
  }

  getPart (bookName, issueName, number) {
    let result = {'bookName': bookName, 'issueName': issueName}
    let success = false

    this.dataBase.forEach((book) => {
      if (book.bookName === bookName) {
        book.issues.forEach((issue, i, arr) => {
          if (issue.issueName === issueName) {
            if (arr[i + 1]) result.nextIssue = arr[i + 1].issueName
            if (arr[i - 1]) result.prevIssue = arr[i - 1].issueName
            result.count = issue.count
            number = number || issue.count
            for (let i = 1; i <= issue.count; i++) {
              if (i === parseInt(number)) {
                result.part = this.rootDir + bookName + '/' + issueName + '/' + i + '.jpg'
                result.partNumber = i
                success = true
              }
            }
          }
        })
      }
    })
    return success ? result : 404
  }

  getPartsSet (bookName, issueName) {
    let result = {'bookName': bookName, 'issueName': issueName}
    let success = false

    this.dataBase.forEach((book) => {
      if (book.bookName === bookName) {
        book.issues.forEach((issue, i) => {
          if (issue.issueName === issueName) {
            let urls = []

            for (let i = 1; i <= issue.count; i++) {
              urls.push({'url': this.rootDir + bookName + '/' + issueName + '/' + i + '.jpg',
                'partNumber': i})
            }

            result.parts = urls
            success = true
          }
        })
      }
    })

    return success ? result : 404
  }

  getBooksCounter () {
    return this.dataBase.length
  }

  getBook (counter) {
    return this.dataBase[counter]
  }
}
