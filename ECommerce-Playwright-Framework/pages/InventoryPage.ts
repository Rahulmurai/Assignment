import { expect, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  readonly title = this.page.getByTestId('title');
  readonly cartLink = this.page.getByTestId('shopping-cart-link');
  readonly sortDropdown = this.page.getByTestId('product-sort-container');
  readonly inventoryItems = this.page.getByTestId('inventory-item');

  product(name: string) {
    return this.page.getByTestId('inventory-item').filter({ hasText: name });
  }

  async assertLoaded() {
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async addProduct(name: string) {
    await this.product(name).getByRole('button', { name: /add to cart/i }).click();
  }

  async removeProduct(name: string) {
    await this.product(name).getByRole('button', { name: /remove/i }).click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(value);
  }

  async openCart() {
    await this.cartLink.click();
  }
}
