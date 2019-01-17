
import rootStore from '@vue-storefront/store'

export default {
  data () {
    return {
      payment: rootStore.state.checkout.paymentDetails
    }
  }
}
