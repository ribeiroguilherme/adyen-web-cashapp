import createSession from './services/create-session';
import { DEFAULT_COUNTRY, DEFAULT_LOCALE } from './utils/constants';

import { AdyenCheckout, Dropin } from '@adyen/adyen-web/auto';
import '@adyen/adyen-web/styles/adyen.css';

async function createAdyenCheckout() {
  const session = await createSession({ countryCode: DEFAULT_COUNTRY, shopperLocale: DEFAULT_LOCALE });

  const checkout = await AdyenCheckout({
    session: {
      id: session.id,
      sessionData: session.sessionData,
    },
    environment: 'test',
    clientKey: import.meta.env.VITE_ADYEN_CLIENT_KEY,
    countryCode: DEFAULT_COUNTRY,
    locale: DEFAULT_LOCALE,
    onPaymentCompleted() {
      console.log('Payment completed');
    },
    onPaymentFailed() {
      console.log('Payment failed');
    },
    onError(error) {
      console.log('onError', error);
    },
  });

  const dropin = new Dropin(checkout);
  dropin.mount('#adyen-checkout');
}

createAdyenCheckout();
