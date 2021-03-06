import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import config from '../src/config'
import mongoose from 'mongoose'
import http from 'http'
import SocketIo from 'socket.io'
import {
  User
} from './routes'

mongoose.connect(config.databaseUri)
const MongoStore = require('connect-mongo')(session)

const app = express()

const server = new http.Server(app)
const io = new SocketIo(server)
io.path('/ws')
const sessionDBKey = 'socket-connections'


app.use(session({
  secret: config.sessionSecret,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  saveUninitialized: false,
  cookie: { maxAge: (3600000 * 24 * config.sessionTimeoutDays) }
}))
app.use(bodyParser.json())

var router = express.Router()

/* User routes */
router.route('/user/login').post(User.login)
router.route('/user/logout').post(User.logout)
router.route('/user/load').get(User.loadAuth)

/* Info routes */
router.route('/info').get(User.requireAuth, User.getProducts)

/* Cart routes */
router.route('/cart').get(User.getCart)
router.route('/cart').post(User.requireAuth, User.addToCart)
router.route('/cart/:product_id/:price_alternative_id').delete(User.requireAuth, User.removeFromCart)
router.route('/cart/checkout').get(User.requireAuth, User.checkoutCart)

app.use(router)

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort)
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort)
  })
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {})
  })
  io.listen(runnable)
} else {
  console.error('==> ERROR: No PORT environment variable has been specified')
}
