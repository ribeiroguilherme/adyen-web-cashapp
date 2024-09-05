import { AdyenCheckout, Dropin } from '@adyen/adyen-web/auto';
import '@adyen/adyen-web/styles/adyen.css';
import createSession from './services/create-session';
import { DEFAULT_COUNTRY, DEFAULT_LOCALE } from './utils/constants';
import './style.css';

async function createAdyenCheckout() {
  const session = await createSession({
    countryCode: DEFAULT_COUNTRY,
    shopperLocale: DEFAULT_LOCALE,
  });

  const checkout = await AdyenCheckout({
    session: {
      id: session.id,
      sessionData: session.sessionData,
    },
    countryCode: DEFAULT_COUNTRY,
    environment: 'test',
    clientKey: import.meta.env.VITE_ADYEN_CLIENT_KEY,
    locale: DEFAULT_LOCALE,
    amount: session.amount,
    onError(error) {
      console.error(error);
    },
    onPaymentCompleted(data, component) {
      console.log(data, component);
    },
    onPaymentFailed(data, component) {
      console.log(data, component);
    },
  });

  const dropin = new Dropin(checkout);

  dropin.mount('#adyen-checkout');
}

createAdyenCheckout();
