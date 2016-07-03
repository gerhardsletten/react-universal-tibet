const CHANGE_COUNTER = 'ordnett/counter/CHANGE_COUNTER'

const initialState = {
  count: 10
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_COUNTER:
      return {
        ...state,
        count: action.count
      }
    default:
      return state
  }
}

export function setCouter (num) {
  return {
    type: CHANGE_COUNTER,
    count: num
  }
}
