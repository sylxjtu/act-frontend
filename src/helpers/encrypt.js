const md5 = require('md5')
const settings = require('../../settings')
export default (password) => md5(password + settings.salt)
