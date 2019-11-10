// This is VS module entry point.
// Read more about modules: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/api-modules/about-modules.md
import { createModule } from '@vue-storefront/core/lib/module'
import { beforeRegistration } from './hooks/beforeRegistration'

// This key will be used for creating extension keys in vuex and other key-based plugins.
// In case of conflicting keys across modules they'll be merged in favor of the least recently registered one
export const KEY = 'stripe'
export const Stripe = createModule({
  key: KEY,
  beforeRegistration
})
