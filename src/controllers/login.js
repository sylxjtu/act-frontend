import encrypt from '../helpers/encrypt'
const request = require('superagent')
const urlJoin = require('url-join')
const settings = require('../../settings')

export default {
  getLoginStatus () {
    return new Promise((resolve, reject) => {
      request.get(urlJoin(settings.apiUrl, 'login')).withCredentials().end(function (err, res) {
        if (err) reject({code: -1, msg: err.toString()})
        else if (res.body.code) reject(res.body)
        else resolve(res.body.data)
      })
    })
  },
  logout () {
    return new Promise((resolve, reject) => {
      request.post(urlJoin(settings.apiUrl, 'logout')).withCredentials().end(function (err, res) {
        if (err) reject({code: -1, msg: err.toString()})
        else if (res.body.code) reject(res.body)
        else resolve()
      })
    })
  },
  login (password, captcha) {
    return new Promise((resolve, reject) => {
      request
        .post(urlJoin(settings.apiUrl, 'login'))
        .withCredentials()
        .send({data: {password: encrypt(password)}, captcha})
        .end(function (err, res) {
          if (err) reject({code: -1, msg: err.toString()})
          else if (res.body.code) reject(res.body)
          else resolve()
        })
    })
  }
}
