import { Locator, Page } from "@playwright/test";

export class mainFormClass {
    page: Page
    private url: string = 'https://app.debridge.finance/'

    readonly connectWalletButton: Locator;
    readonly metaMaskButton: Locator;
    readonly networkSelect: Locator;
    readonly balance: Locator;
    readonly walletMask: Locator

    constructor(page: Page) {
        this.page = page;
        this.connectWalletButton = page.getByRole('button', { name: 'Connect wallet', exact: true });
        this.metaMaskButton = page.getByRole('button', { name: 'METAMASK Metamask' });
        this.networkSelect = page.locator('div').filter({ hasText: /^ETH$/ }).nth(1);
        this.balance = page.locator("//div[@class='__native-balance hstack ng-star-inserted']//span");
        this.walletMask = page.locator('.wallet-account__address.btn.btn-outline-secondary');


    }
    async goto() {
        await this.page.goto(this.url)
    }
    async selectNetwork({ network, token }) {
        await this.networkSelect.click();
        await this.page.getByText(network).click();
        await this.page.getByText(token).first().click();
    }

    async getBalance() {
        return parseFloat(parseFloat(await this.balance.innerText()).toFixed(3));
    }

    async getWalletMask() {
        return this.walletMask.innerText();
    }


}