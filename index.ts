import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

export const PaymentStripeModule: StorefrontModule = function ({store, router, appConfig}) {

  const VSF_PAYMENT_CODE = appConfig.stripe.paymentMethodCode || 'stripe'

  // Place the order. Payload is empty as we don't have any specific info to add for this payment method '{}'
  let correctPaymentMethod = false
  const placeOrder = () => {
    if (correctPaymentMethod) {
      EventBus.$emit('checkout-do-placeOrder', {})
    }
  }

  // Update the methods
  let paymentMethodConfig = {
    'title': 'Pay by Card (Stripe)',
    'code': VSF_PAYMENT_CODE,
    'cost': 0,
    'costInclTax': 0,
    'default': false,
    'offline': false,
    'is_server_method': false
  }
  store.dispatch('checkout/addPaymentMethod', paymentMethodConfig)

  if (!isServer) {
    EventBus.$on('checkout-before-placeOrder', placeOrder)

    EventBus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      let methods = store.state['payment-backend-methods'].methods
      if (methods) {
        let method = methods.find(item => (item.code === paymentMethodCode))
        if (paymentMethodCode === VSF_PAYMENT_CODE && ((typeof method !== 'undefined' && !method.is_server_method) || typeof method === 'undefined') /* otherwise it could be a `payment-backend-methods` module */) {
          correctPaymentMethod = true
        } else {
          correctPaymentMethod = false
        }
      }
    })
  }

}
