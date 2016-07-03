import jwt from 'jsonwebtoken'
import superagent from 'superagent'
import shortid from 'shortid'
import pick from 'object.pick'
import config from '../../src/config'

function login (req, res) {
  superagent
  .post('https://tibet.gyldendal.no/cors/user/login.json')
  .send({
    password: req.body.password,
    username: req.body.username,
    site: config.tibetSite,
    tibet_access_identifier: shortid.generate()
  })
  .set('X-Requested-With', 'XMLHttpRequest')
  .set('Accept', 'application/json')
  .end((err, {body}) => {
    if (err || body.error) {
      console.log('err', err)
      return res.status(403).json({error: body.error || JSON.stringify(err)})
    }
    const {user, tibet_access_identifier} = body
    const data = {tibet_access_identifier, tibetSite: config.tibetSite, ...pick(user, ['id', 'first_name', 'last_name', 'email','username'])}
    const token = jwt.sign(data, config.tokenSecret, {
      expiresIn: `${config.sessionTimeoutDays} days`
    })
    req.session.user = token
    res.json(data)
  })
}

function getProducts (req, res) {
  decodeToken(req.session.user)
  .then((user) => {
    superagent
    .get('https://tibet.gyldendal.no/cors/access/user_products.json')
    .send({
      site: user.tibetSite
    })
    .set('X-Requested-With', 'XMLHttpRequest')
    .set('Cookie', `tibet_session_gu_guux=${user.tibet_access_identifier};`)
    .set('Accept', 'application/json')
    .end((err, {body}) => {
      if (err || body.error) {
        console.log('err', err)
        return res.status(403).json({error: body.error || JSON.stringify(err)})
      }
      res.json(body.products)
    })
  })
  .catch((err) => res.json(err))
}

function logout (req, res) {
  req.session.destroy(() => {
    req.session = null
    res.json(null)
  })
}

function decodeToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.tokenSecret, (err, decoded) => {
      if (err) {
        return reject(null)
      }
      resolve(decoded)
    })
  })
}

function loadAuth (req, res) {
  decodeToken(req.session.user)
  .then((user) => res.json(user))
  .catch((err) => res.json(err))
}

function requireAuth (req, res, next) {
  const token = req.session.user || req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    decodeToken(token)
      .then((user) => {
        req.user = user
        next()
      })
      .catch((err) => {
        console.log(err)
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
}

const User = {
  login,
  logout,
  loadAuth,
  requireAuth,
  getProducts
}
export default User
