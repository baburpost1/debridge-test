import { Locator, Page } from "@playwright/test";

export class homePageMetaMask {
    page: Page

    readonly networkDisplay: Locator;
    readonly addNetworkButton: Locator;
    readonly popularNetworkPolygon: Locator;
    readonly confirmationSubmitButton: Locator;
    readonly firstBalance: Locator;


    constructor(page: Page) {
        this.page = page;
        this.networkDisplay = page.getByTestId('network-display');
        this.addNetworkButton = page.getByTestId('test-add-button');
        this.popularNetworkPolygon = page.getByTestId('popular-network-0x89')
        this.confirmationSubmitButton = page.getByTestId('confirmation-submit-button');
        this.firstBalance = page.getByTestId('multichain-token-list-item-value').nth(0);

    }

    async addAdditionalNetwork() {
        await this.networkDisplay.click();
        await this.popularNetworkPolygon.scrollIntoViewIfNeeded();
        await this.popularNetworkPolygon.getByTestId('test-add-button').click();
        await this.confirmationSubmitButton.click();

    }

    async getFirstBalance() {
        const value = await this.firstBalance.innerText()
        return parseFloat(parseFloat(value.split(' ')[0].replace(',', '.')).toFixed(3))
    }

}