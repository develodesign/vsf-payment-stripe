# Stripe Payment module for Vue Storefront

Stripe Payment extension for [vue-storefront](https://github.com/DivanteLtd/vue-storefront), by [Develo Design](https://develodesign.co.uk).

![Imgur](https://i.imgur.com/nLbTi6N.png)

## Installation

By hand (preferred):
```shell
git clone https://github.com/develodesign/vsf-payment-stripe.git ./vue-storefront/src/modules/payment-stripe
```

By yarn:
```shell
cd storefront/src/themes/default
yarn add https://github.com/develodesign/vsf-payment-stripe
```

Add the following also to your `config/local.json` and configure the `stripe.apiKey` to point to your Stripe details.

```json
"stripe": {
    "apiKey": "my_example_api_key"
}
```

## Registering the Stripe module

Add script import to `./src/modules/client.ts`

```js
import { PaymentStripeModule } from './payment-stripe'
// import { PaymentStripeModule } from '@develodesign/vsf-payment-stripe'

export function registerClientModules () {
  ...
  PaymentStripeModule
}
```

## Integrating the Stripe component with your theme

Go to `storefront/src/themes/defalt/components/core/blocks/Checkout/Payment.vue`

```js
import { mapGetters } from 'vuex'
import PaymentStripe from 'src/modules/payment-stripe/components/PaymentStripe'
// import PaymentStripe from '@develodesign/vsf-payment-stripe/components/PaymentStripe'


export default {
  components: {
    ...,
    PaymentStripe
  },
  computed: {
    ...mapGetters({
      paymentDetails: 'checkout/getPaymentDetails'
    })
  },
```

Then need add the component instance `<payment-stripe/>` to template section with check on payment method `v-if="paymentDetails.paymentMethod === 'stripe_payments'"`:

```html
...
<div class="row fs16 mb35">
    <div class="col-xs-12 h4">
        ...
        <div class="col-xs-12">
            <h4>{{ $t('Payment method') }}</h4>
        </div>
        <div class="col-md-6 mb15">
            <label class="radioStyled"> {{ getPaymentMethod().title }}
            <input type="radio" value="" checked disabled name="chosen-payment-method">
            <span class="checkmark" />
            </label>
        </div>
        </div>
    </div>
    ...
    <!-- The stripe method integration -->
    <div class="row mb35 stripe-container" v-if="paymentDetails.paymentMethod === 'stripe_payments'">
        <div class="col-xs-12">
            <payment-stripe/>
        </div>
    </div>
</div>
```

## Customization

You can also customize the appearance of Stripe elements using the `style` key using any of the official stripe style properties found [here](https://stripe.com/docs/stripe-js/reference#stripe-elements).
```json
"stripe": {
    "apiKey": "my_example_api_key",
    "style": {
        "base": {
            "fontSize": "16px",
            "color": "#32325d"
        },
        "invalid": {
            "color": "#fa755a"
        }
    }
}
```

You can specifiy the card initialisation options with the `options` key. You can pass any the properites found [here](https://stripe.com/docs/js/elements_object/create_element?type=card)
```json
"stripe": {
    "apiKey": "my_example_api_key",
    "style": {
        "base": {
            "fontSize": "16px",
            "color": "#32325d"
        },
        "invalid": {
            "color": "#fa755a"
        }
    },
    "options": {
        "hidePostalCode": true
    }
}
```

## Backend Platform Support
Each back-end platform handles Stripe payment method processing in its own way. Due to this, it is difficult to support all platforms until each one has been specifically tested and accounted for. The following back-end platforms are supported.

We fully support the official [Stripe](https://stripe.com/docs/plugins/magento/install#download) module for Magento2, use the `stripe_payments` as method code.

To specify your backend platform for this module to handle it, if it is supported, add the `backend_platform` attribute in `config/local.json`. For example:
```json
"stripe": {
    "apiKey": "my_example_api_key",
    "backendPlatform": "magento2",
    "paymentMethodCode": "stripe_payments"
}
```
