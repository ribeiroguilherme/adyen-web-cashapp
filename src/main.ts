import createSession from './services/create-session';
import { DEFAULT_COUNTRY, DEFAULT_LOCALE } from './utils/constants';
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/es/adyen.css'

let integrationType = 'dropin';

let amount = {
  value: 500,
  currency: 'USD',
};

let component = null;

document.querySelector('#integrationtype1').addEventListener('click', event => {
  integrationType = event.target.value;
  createAdyenCheckout();
});
document.querySelector('#integrationtype2').addEventListener('click', event => {
  integrationType = event.target.value;
  createAdyenCheckout();
});

document.querySelector('#amount1').addEventListener('click', event => {
  amount = {
    value: Number(event.target.value),
    currency: 'USD',
  };
  createAdyenCheckout();
});
document.querySelector('#amount2').addEventListener('click', event => {
  amount = {
    value: Number(event.target.value),
    currency: 'USD',
  };
  createAdyenCheckout();
});

async function createAdyenCheckout() {
  if (component) {
    component.unmount();
  }

  const session = await createSession({ amount, countryCode: DEFAULT_COUNTRY, shopperLocale: DEFAULT_LOCALE });

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
      alert('Payment completed!');
    },
    onError(error) {
      console.log('onError:', error.message);
    },
  });

  component = integrationType === 'dropin' ? checkout.create('dropin') : checkout.create('cashapp');
  component.mount('#adyen-checkout');
}

createAdyenCheckout();
