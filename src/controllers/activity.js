const request = require('superagent')
const urlJoin = require('url-join')
const settings = require('../../settings')

export default {
  getActivities (showAllActivities) {
    return new Promise((resolve, reject) => {
      request.get(urlJoin(settings.apiUrl, 'activity')).query({showAllActivities}).end(function (err, res) {
        if (err) reject({code: -1, msg: err.toString()})
        else if (res.body.code) reject(res.body)
        else resolve(res.body.data)
      })
    })
  }
}
