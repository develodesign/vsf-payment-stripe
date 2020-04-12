// This function will be fired both on server and client side context before registering other parts of the module
export function beforeRegistration({ Vue, config, store, isServer }) {
  const VSF_PAYMENT_CODE = config.stripe.paymentMethodCode || 'stripe'

  store.dispatch('payment/addMethod', {
    'title': 'Stripe',
    'code': VSF_PAYMENT_CODE,
    'cost': 0,
    'costInclTax': 0,
    'default': false,
    'offline': false
  })

  if (!isServer) {
    store.watch((state) => state.checkout.paymentDetails, (prevMethodCode, newMethodCode) => {
      let method = (newMethodCode === VSF_PAYMENT_CODE) ? '$on' : '$off'
      // Register/unregister the handler for what happens when they click the place order button.
      Vue.prototype.$bus[method]('checkout-before-placeOrder', () => {
          Vue.prototype.$bus.$emit('checkout-do-placeOrder', {})
      })
    })
  }
}