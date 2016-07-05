import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {asyncConnect} from 'redux-connect'
import {add as addToCart} from 'redux/modules/cart'
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import config from 'config'
import style from './style.css'

@connect(
  (state) => ({
    products: state.products,
    user: state.auth.user,
    cart: state.cart.data
  }),
  {
    addToCart
  }
)
export default class Shop extends Component {
  addToCart (product) {
    this.props.addToCart(product.id, product.price_alternatives[0].id, 1)
  }

  render () {
    const {products, user, cart} = this.props
    return (
      <div>
        <Helmet title='Shop'/>
        <h1>Shop</h1>
        <ul>
          {products.map((product, i) => {
            let available = user // && cart // && !!cart.find((p) => p.id === product.id)
            if (cart && cart.order_lines) {
              available = !!!cart.order_lines.find((p) => {
                return p.product.id === product.id
              })
            }
            return (
              <li key={i}>
                {product.title} ({product.id}) {available && (
                  <button onClick={this.addToCart.bind(this, product)}>Buy ({product.price_alternatives[0].formatted_unit_price} / {product.price_alternatives[0].billing_label} )</button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
