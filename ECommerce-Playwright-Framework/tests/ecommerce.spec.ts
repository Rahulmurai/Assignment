import { expect } from '@playwright/test';
import { test } from '../fixtures/testFixtures';
import { checkoutData, products, users } from '../test-data/users';

async function loginAsStandardUser(loginPage: { open(): Promise<void>; login(username: string, password: string): Promise<void> }) {
  await loginPage.open();
  await loginPage.login(users.valid.username, users.valid.password);
}

test.describe('E-Commerce UI Regression', () => {
  test('@smoke valid user can login and view products', async ({ loginPage, inventoryPage }) => {
    await loginAsStandardUser(loginPage);
    await inventoryPage.assertLoaded();
  });

  test('@regression user can add products and remove a product', async ({ loginPage, inventoryPage, cartPage }) => {
    await loginAsStandardUser(loginPage);
    await inventoryPage.addProduct(products.backpack);
    await inventoryPage.addProduct(products.bikeLight);
    await inventoryPage.openCart();
    await cartPage.assertProductPresent(products.backpack);
    await cartPage.assertProductPresent(products.bikeLight);
    await cartPage.removeProduct(products.bikeLight);
    await expect(cartPage.item(products.bikeLight)).toHaveCount(0);
  });

  test('@regression user can complete checkout successfully', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginAsStandardUser(loginPage);
    await inventoryPage.addProduct(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.enterCustomerDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    await checkoutPage.assertOrderComplete();
  });

  test('@regression product sorting works', async ({ loginPage, inventoryPage }) => {
    await loginAsStandardUser(loginPage);
    await inventoryPage.sortBy('lohi');
    await expect(inventoryPage.sortDropdown).toHaveValue('lohi');
    await inventoryPage.sortBy('hilo');
    await expect(inventoryPage.sortDropdown).toHaveValue('hilo');
  });
});

test('@regression locked-out user cannot login', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(users.locked.username, users.locked.password);
  await loginPage.assertLoginError('locked out');
});
