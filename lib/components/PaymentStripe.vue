<template>

  <div class="mb15 mt20 vsf-stripe-container">
    <h4 class="mt0">
      <label for="vsf-stripe-card-element">
        Credit or debit card
      </label>
    </h4>
    <div class="bg-cl-secondary px20 py20">
      <form action="" id="payment-form">
        <div class="form-row">

          <div id="vsf-stripe-card-element">
            &nbsp;
            <!-- A Stripe Element will be inserted here. -->
          </div>

          <!-- Used to display Element errors. -->
          <div id="vsf-stripe-card-errors" role="alert">
            &nbsp;
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>
  /* Base styling for the component. */

  .vsf-stripe-container label {
    font-weight: 500;
    font-size: 14px;
    display: block;
    margin-bottom: 8px;
    color: #818992;
  }
  #vsf-stripe-card-errors {
    margin: 8px auto 0;
    color: #fa755a;
  }
  .vsf-stripe-container .StripeElement {
    background-color: white;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }
  .vsf-stripe-container .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }
  .vsf-stripe-container .StripeElement--invalid {
    border-color: #fa755a;
  }
  .vsf-stripe-container .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
</style>

<script>
import i18n from 'core/lib/i18n'

export default {
  name: 'PaymentStripe',
  data () {
    return {
      dd_stripe: {
        instance: null,
        elements: null,
        card: null
      }
    }
  },
  mounted () {
    // Load the stripe.js elements script.
    // As it's callback, Configure stripe to run.
    this.loadStripeDependencies(this.configureStripe)

    // Ready to place order, handle anything we need to, generating, validating stripe requests & tokens ect.
    this.$bus.$on('checkout-before-placeOrder', this.onBeforePlaceOrder)

    // Ready to place order, handle anything we need to, generating, validating stripe requests & tokens ect.
    this.$bus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
      if (paymentMethodCode !== 'stripe') {
        // unregister the extension placeorder handler
        this.$bus.$off('checkout-before-placeOrder', this.onBeforePlaceOrder)
      }
    })
  },
  methods: {
    onBeforePlaceOrder () {
      this.processStripeForm()
    },
    loadStripeDependencies (callback) {
      let stripeJsUrl = 'https://js.stripe.com/v3/'

      let docHead = document.getElementsByTagName('head')[0]
      let docScript = document.createElement('script')

      docScript.type = 'text/javascript'
      docScript.src = stripeJsUrl

      // When script is ready fire our callback.
      docScript.onreadystatechange = callback
      docScript.onload = callback

      docHead.appendChild(docScript)
    },
    configureStripe () {
      // Create a new Stripe client.

      if (typeof this.$config.stripe.api_key === 'undefined') {
        return false
      }

      this.dd_stripe.instance = window.Stripe(this.$config.stripe.api_key)

      // Create an instance of Elements.
      this.dd_stripe.elements = this.dd_stripe.instance.elements()

      // Create the stripe elements card
      this.createElements()

      // Add the event listeners for stripe.
      this.bindEventListeners()
    },
    createElements () {
      let style = {}

      if (typeof this.$config.stripe.style !== 'undefined') {
        style = this.$config.stripe.style
      }

      // Create an instance of the card Element.
      this.dd_stripe.card = this.dd_stripe.elements.create('card', { style: style })

      // Add an instance of the card Element into the `card-element` <div>.
      this.dd_stripe.card.mount('#vsf-stripe-card-element')
    },
    bindEventListeners () {
      // Handle real-time validation errors from the card Element.
      this.dd_stripe.card.addEventListener('change', this.onStripeCardChange)
    },
    onStripeCardChange (event) {
      let displayError = document.getElementById('vsf-stripe-card-errors')

      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    },
    beforeDestroy () {
      this.unbindEventListeners()
    },
    unbindEventListeners () {
      this.dd_stripe.card.removeEventListener('change', this.onStripeCardChange)
    },
    processStripeForm () {
      let ctx = this

      // Display loader
      this.$bus.$emit('notification-progress-start', i18n.t('Placing Order') + '...')

      // Generate token from stripe
      this.dd_stripe.instance.createToken(this.dd_stripe.card).then(function (result) {
        if (result.error) {
          // Inform the user if there was an error.
          let errorElement = document.getElementById('vsf-stripe-card-errors')

          errorElement.textContent = result.error.message
        } else {
          ctx.placeOrderWithPayload(result.token)
        }
        ctx.$bus.$emit('notification-progress-stop')
      })
    },
    placeOrderWithPayload (payload) {
      this.$bus.$emit('checkout-do-placeOrder', payload)
    }
  },
  components: {}
}
</script>
