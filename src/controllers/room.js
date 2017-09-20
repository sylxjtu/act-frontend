const request = require('superagent')
const urlJoin = require('url-join')
const settings = require('../../settings')

export default {
  getRooms () {
    return new Promise((resolve, reject) => {
      request.get(urlJoin(settings.apiUrl, 'room')).end(function (err, res) {
        if (err) reject({code: -1, msg: err.toString()})
        else if (res.body.code) reject(res.body)
        else resolve(res.body.data)
      })
    })
  },
  createRoom (data) {
    return new Promise((resolve, reject) => {
      request
        .put(urlJoin(settings.apiUrl, 'room'))
        .withCredentials()
        .send({data})
        .end(function (err, res) {
          if (err) reject({code: -1, msg: err.toString()})
          else if (res.body.code) reject(res.body)
          else resolve()
        })
    })
  }
}
