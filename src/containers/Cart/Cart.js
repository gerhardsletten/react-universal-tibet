import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {asyncConnect} from 'redux-connect'
import {remove as removeFromCart, checkout} from 'redux/modules/cart'
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import config from 'config'
import style from './style.css'

@connect(
  (state) => ({
    cart: state.cart.data
  }),
  {
    removeFromCart, checkout
  }
)
export default class Cart extends Component {
  removeFromCart (order_line) {
    this.props.removeFromCart(order_line.product.id, order_line.price_alternative.id)
  }
  checkout () {
    this.props.checkout()
  }
  render () {
    const {cart} = this.props
    return (
      <div>
        <Helmet title='Cart'/>
        <h1>Cart</h1>
        {cart.order_lines && (
          <div>
            <ul>
              {cart.order_lines.map((order_line, i) => {
                return (
                  <li key={i}>
                    {order_line.product.title}
                    ({order_line.unit_price})
                    <button onClick={this.removeFromCart.bind(this, order_line)}>Remove</button>
                  </li>
                )
              })}
            </ul>
            <p>
              <strong>Total:</strong> {cart.total_price}
            </p>
            <p>
              <button onClick={this.checkout.bind(this)}>Checkout</button>
            </p>
          </div>
        )}
      </div>
    )
  }
}
