const LOAD = 'ordnett/cart/LOAD'
const LOAD_SUCCESS = 'ordnett/cart/LOAD_SUCCESS'
const LOAD_FAIL = 'ordnett/cart/LOAD_FAIL'
const ADD = 'ordnett/cart/ADD'
const ADD_SUCCESS = 'ordnett/cart/ADD_SUCCESS'
const ADD_FAIL = 'ordnett/cart/ADD_FAIL'
const REMOVE = 'ordnett/cart/REMOVE'
const REMOVE_SUCCESS = 'ordnett/cart/REMOVE_SUCCESS'
const REMOVE_FAIL = 'ordnett/cart/REMOVE_FAIL'

const initialState = {
  loaded: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
    case ADD:
    case REMOVE:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    case ADD_FAIL:
    case REMOVE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case ADD_SUCCESS:
    case REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result
      }
    default:
      return state
  }
}

export function isLoaded (globalState) {
  return globalState.cart && globalState.cart.loaded
}

export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/cart')
  }
}

export function add (product_id, price_alternative_id, quantity = 1) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post('/cart', {
      data: {
        product_id,
        price_alternative_id,
        quantity
      }
    })
  }
}

export function remove (product_id, price_alternative_id) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.del(`/cart/${product_id}/${price_alternative_id}`)
  }
}