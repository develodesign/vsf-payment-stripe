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

```js
import PaymentStripe from 'src/modules/stripe/components/PaymentStripe'

export default {
  components: {
    ...
    PaymentStripe
  },
```

Add to template `<payment-stripe />`

```html
<div class="cartsummary-wrapper">
    ...
    <payment-stripe />
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
