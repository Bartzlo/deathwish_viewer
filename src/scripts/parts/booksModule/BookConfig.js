class BookConfig {
  constructor (configUrl, configName) {
    this.url = configUrl
    this.configName = configName
    this.config = null
  }

  getConfig () {
    if (this.config) {
      return Promise.resolve(this.config)
    } else {
      return this._requestConfig()
    }
  }

  _requestConfig () {
    return new Promise((resolve, reject) => {
      fetch(this.url + this.configName)
        .then(res => res.json())
        .then(res => {
          let conf = this._formateConfig(res)
          this.config = conf
          resolve(conf)
        })
        .catch(err => reject(err))
    })
  }

  _formateConfig (config) {
    config.forEach(book => {
      book.srcBookPreviwe = this.url + book.bookName + '/book-previwe.jpg'
      book.altBookPreviwe = book.bookName + ' previwe'

      book.issues.forEach(issue => {
        issue.srcIssuePreviwe = this.url + book.bookName + '/' + issue.issueName + '/issue-previwe.jpg'
        issue.issueUrl = this.url + book.bookName + '/' + issue.issueName
        issue.issueCount = issue.cuont
        issue.altIssuePreviwe = issue.issueName + ' previwe'
      })
    })

    return (config)
  }
}

module.exports = BookConfig
