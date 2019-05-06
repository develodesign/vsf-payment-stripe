
import rootStore from '@vue-storefront/core/store'

export default {
  data () {
    return {
      payment: rootStore.state.checkout.paymentDetails
    }
  }
}
