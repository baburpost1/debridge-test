import { Locator, Page } from "@playwright/test";

export class confirmConnection {
    page: Page

    readonly confirmConnectionButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.confirmConnectionButton = page.getByTestId('confirm-btn');

    }

}