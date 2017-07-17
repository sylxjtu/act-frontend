const request = require('superagent')
const urlJoin = require('url-join')
const settings = require('../../settings')

export default {
  getLoginStatus () {
    return new Promise((resolve, reject) => {
      request.get(urlJoin(settings.apiUrl, 'login')).end(function (err, res) {
        if (err) reject({code: -1, msg: err.toString()})
        else resolve(res.body.data)
      })
    })
  }
}
