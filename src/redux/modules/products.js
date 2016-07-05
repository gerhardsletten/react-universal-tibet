const initialState = [{
  'id': 782,
  'title': 'Gaia 3, Natur- og samfunnsfag, Elevbok, Smartbok, Elev',
  'sub_title': 'Naturfag og samfunnsfag for barnetrinnet',
  'isbn': '9788205428072',
  'description': null,
  'role': 'Elev',
  'language': 'Bokmål',
  'price_alternatives': [
    {
      'id': 168,
      'unit_price': 135.0,
      'formatted_unit_price': '135,00',
      'billing_identifier': 'for_one_year',
      'billing_recurring': false,
      'billing_label': 'for ett år'
    }
  ]
},
{
  'id': 784,
  'title': 'Gaia 4, Natur- og samfunnsfag, Elevbok, Smartbok, Elev',
  'sub_title': 'Naturfag og samfunnsfag for barnetrinnet',
  'isbn': '9788205428096',
  'description': null,
  'role': 'Elev',
  'language': 'Bokmål',
  'price_alternatives': [
    {
      'id': 169,
      'unit_price': 162.5,
      'formatted_unit_price': '162,50',
      'billing_identifier': 'for_one_year',
      'billing_recurring': false,
      'billing_label': 'for ett år'
    }
  ]
}]

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}
