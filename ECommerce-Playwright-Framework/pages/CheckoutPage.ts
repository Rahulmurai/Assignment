import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  readonly firstName = this.page.getByTestId('firstName');
  readonly lastName = this.page.getByTestId('lastName');
  readonly postalCode = this.page.getByTestId('postalCode');
  readonly continueButton = this.page.getByTestId('continue');
  readonly finishButton = this.page.getByTestId('finish');
  readonly confirmation = this.page.getByTestId('complete-header');

  async enterCustomerDetails(first: string, last: string, postal: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async assertOrderComplete() {
    await expect(this.confirmation).toHaveText('Thank you for your order!');
  }
}
