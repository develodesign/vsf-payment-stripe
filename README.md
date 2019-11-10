# Stripe Payment module for Vue Storefront

Stripe Payment extension for [vue-storefront](https://github.com/DivanteLtd/vue-storefront), by [Develo Design](https://develodesign.co.uk).

## Installation

By hand (preferer):
```shell
git clone git@github.com:develodesign/vsf-payment-stripe.git ./vue-storefront/src/modules/stripe
```

Add the following also to your `config/local.json` and configure the `stripe.apiKey` to point to your Stripe details.

```json
"stripe": {
    "apiKey": "my_example_api_key"
}
```

## Registration the Stripe module

Add script import to `./src/modules/index.ts`

```js
...
import { GoogleAnalytics } from './google-analytics';
import { Stripe } from './stripe';

export const registerModules: VueStorefrontModule[] = [
  ...
  GoogleAnalytics,
  Stripe
]
```

## Integration the Stripe component to you theme

Go to `storefront/src/themes/defalt/components/core/blocks/Checkout/OrderReview.vue`

```js
import PaymentStripe from 'src/modules/stripe/components/PaymentStripe'
import MixinStripe from 'src/modules/stripe/components/MixinStripe'

export default {
  components: {
    ...
    PaymentStripe
  },
  mixins: [..., MixinStripe],
```

Then need add component instance before `<div id="checkout-order-review-additional-container">` to template section

```html
...
<payment-stripe v-if="payment.paymentMethod === 'stripe'" />
<div id="checkout-order-review-additional-container">
...
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

## Backend Platform Support
Each back-end platform handles Stripe payment method processing in its own way. Due to this, it is difficult to support all platforms until each one has been specifically tested and accounted for. The following back-end platforms are supported.

* **Magento 2** (partial support). The official Stripe module for Magento 2 does not currently support checkout via API, so there are some adjustments that need to be made on their side before this module will be fully supported on Magento 2.

To specify your backend platform for this module to handle it, if it is supported, add the `backend_platform` attribute in `config/local.json`. For example:
```json
"stripe": {
    "apiKey": "my_example_api_key",
    "backend_platform": "magento2",
    "paymentMethodCode": "stripe"
```
