import { test, expect } from '../fixtures/testFixtures';
import { checkoutData, products } from '../test-data/users';

const login = async (loginPage: any) => {
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
};

test.describe('E-Commerce UI Regression', () => {
  test('@smoke valid user can login and view products', async ({ loginPage, inventoryPage }) => {
    await login(loginPage);
    await inventoryPage.assertLoaded();
  });

  test('@regression user can add products and remove a product', async ({ loginPage, inventoryPage, cartPage }) => {
    await login(loginPage);
    await inventoryPage.addProduct(products.backpack);
    await inventoryPage.addProduct(products.bikeLight);
    await inventoryPage.openCart();
    await cartPage.assertProductPresent(products.backpack);
    await cartPage.assertProductPresent(products.bikeLight);
    await cartPage.removeProduct(products.bikeLight);
    await expect(cartPage.item(products.bikeLight)).toHaveCount(0);
  });

  test('@regression user can complete checkout successfully', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await login(loginPage);
    await inventoryPage.addProduct(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.enterCustomerDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
    await checkoutPage.continueToOverview();
    await checkoutPage.finishOrder();
    await checkoutPage.assertOrderComplete();
  });

  test('@regression product sorting works', async ({ loginPage, inventoryPage }) => {
    await login(loginPage);
    await inventoryPage.sortBy('lohi');
    await expect(inventoryPage.sortDropdown).toHaveValue('lohi');
    await inventoryPage.sortBy('hilo');
    await expect(inventoryPage.sortDropdown).toHaveValue('hilo');
  });
});

test('locked-out user cannot login', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await loginPage.assertLoginError('locked out');
});
