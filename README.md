# @adyen/adyen-web GooglePay livestream integration demo

Github repository used during the GooglePay integration livestream.

### Steps to run the project:

1. Edit the `.env` file placing the values of the environment variables of your account.

Example:

```
VITE_ADYEN_CLIENT_KEY=test_K76GO...
ADYEN_API_KEY=AQEkhmfuXNWTK...
ADYEN_MERCHANT_ACCOUNT=MyStore...
SERVER_PORT=8080
```

2. Install the project dependencies: `npm install`
3. Run the dev server `npm run dev`. The web application will run on port `http://localhost:3020`

> [!NOTE]
> This demo was created using Vite with 'vanilla-ts' template: `npm create vite@latest . -- --template vanilla-ts`
