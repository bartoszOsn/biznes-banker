import { expect, Page } from '@playwright/test';
import { getMatchHideMoneyButton } from './getMatchHideMoneyButton';

export async function expectMatchMoneyToBe(amount: string, page: Page) {
  await expect(getMatchHideMoneyButton(page)).toContainText(amount);
}