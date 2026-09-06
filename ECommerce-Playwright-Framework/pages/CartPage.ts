import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  readonly checkoutButton = this.page.getByTestId('checkout');
  readonly cartItems = this.page.getByTestId('inventory-item');

  item(name: string) {
    return this.cartItems.filter({ hasText: name });
  }

  async assertProductPresent(name: string) {
    await expect(this.item(name)).toBeVisible();
  }

  async removeProduct(name: string) {
    await this.item(name).getByRole('button', { name: /remove/i }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
