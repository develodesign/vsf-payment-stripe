# Stripe Payment extension for Vue Storefront

Stripe Payment extension for [vue-storefront](https://github.com/DivanteLtd/vue-storefront), by [Develo Design](https://develodesign.co.uk).

## Installation using NPM:

Add the extension to your Vue Storefront `package.json` using:
```shell
$ npm install vsf-payment-stripe --save
```

Add `vsf-payment-stripe` to the  `extensions/index.js`
```js
export default [
  require('@vue-storefront/extension-droppoint-shipping/index.js'),
  require('@vue-storefront/extension-google-analytics/index.js'),
  require('@vue-storefront/extension-mailchimp-subscribe/index.js'),
  require('@vue-storefront/extension-payment-backend-methods/index.js'),
  require('@vue-storefront/extension-payment-cash-on-delivery/index.js'),
  require('@vue-storefront/extension-template/index.js'),

  require('vsf-payment-stripe/index.js')
]
```

Add the following also to your `config/local.json` and configure the `stripe.api_key` to point to your Stripe details.
```js
"stripe": {
    "api_key": "my_example_api_key"
}
```

You can also customize the appearance of Stripe elements using the `style` key using any of the official stripe style properties found [here](https://stripe.com/docs/stripe-js/reference#stripe-elements).
```js
"stripe": {
    "api_key": "my_example_api_key",
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
