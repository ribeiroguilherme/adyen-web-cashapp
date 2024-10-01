require('dotenv').config();
const express = require('express');
const { Client, CheckoutAPI } = require('@adyen/api-library');

const client = new Client({ apiKey: process.env.ADYEN_API_KEY, environment: 'TEST' });
const checkoutApi = new CheckoutAPI(client);

const app = express();

app.use(express.json());

app.post('/payments/session', async (req, res) => {
  console.log('Express server: /payments/sessions called');

  try {
    const sessionRequest = {
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
      shopperLocale: req.body.shopperLocale,
      countryCode: req.body.countryCode,
      amount: req.body.amount,
      channel: 'Web',
      returnUrl: 'https://your-company.com/checkout?shopperOrder=12xy..',
      reference: `ref-${new Date().getTime()}`,
    };

    const response = await checkoutApi.PaymentsApi.sessions(sessionRequest);
    return res.json(response);
  } catch (error) {
    console.log('Error when calling endpoint', error);
    return res.status(500).send(`Unable to call Adyen's /session API`);
  }
});

const port = parseInt(process.env.SERVER_PORT) || 8080;

app.listen(port, () => {
  console.log(`Express server: Listening on port ${port}`);
});
