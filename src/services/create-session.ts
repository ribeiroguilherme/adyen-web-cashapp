async function createSession({ amount, countryCode, shopperLocale }: { amount: { value: number, currency: string } ,countryCode: string; shopperLocale: string }) {
  try {
    const body = {
      amount,
      countryCode,
      shopperLocale,
    };

    const response = await fetch('/payments/session', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error during sessions setup call', error);
  }
}

export default createSession;
