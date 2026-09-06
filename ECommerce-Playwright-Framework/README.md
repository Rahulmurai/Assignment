# E-Commerce Playwright Automation Framework

An advanced UI and API automation framework built with **Playwright + TypeScript**, designed using industry-standard automation practices.

## Tech Stack

- Playwright Test
- TypeScript
- Node.js 20+
- Page Object Model (POM)
- Custom fixtures
- Data-driven test data
- API testing with Playwright Request
- Chromium, Firefox and WebKit
- HTML reporting
- Screenshots, video and trace on failure
- GitHub Actions CI

## Automated Scenarios

### UI
- Valid and locked-user login validation
- Product inventory validation
- Add/remove products from cart
- Product sorting
- End-to-end checkout workflow

### API
- HTTP status validation
- Product API contract/schema validation
- Response field/type assertions

## Framework Structure

```text
ECommerce-Playwright-Framework/
├── .github/workflows/playwright.yml
├── fixtures/
│   └── testFixtures.ts
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── test-data/
│   └── users.ts
├── tests/
│   ├── ecommerce.spec.ts
│   └── api.spec.ts
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

## Setup

```bash
cd ECommerce-Playwright-Framework
npm install
npx playwright install
```

## Run Tests

```bash
npm test
npm run test:headed
npm run test:smoke
npm run test:regression
npm run test:debug
npm run report
```

## Configuration

The default UI application is SauceDemo. You can override it with:

```bash
BASE_URL=https://www.saucedemo.com npm test
```

## CI/CD

GitHub Actions runs the full Playwright suite on pushes and pull requests to `main`, with browser installation and Playwright HTML/test-result artifacts.

## Design Principles

- Page Object Model for maintainable locators and actions
- Fixtures for reusable setup and dependency injection
- Test data separated from test logic
- Stable `data-testid` locators where available
- Independent, parallel-safe tests
- Retry, trace, screenshot and video configuration for CI diagnostics
- UI and API validation in the same automation project

## Demo Applications

- UI: SauceDemo
- API: DummyJSON Products API
