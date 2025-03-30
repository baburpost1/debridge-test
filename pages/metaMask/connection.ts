import { Locator, Page } from "@playwright/test";
import * as dotenv from 'dotenv';

dotenv.config();

export class onboardingPage {
    page: Page
    private url: string = 'chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#onboarding/welcome'

    readonly termsCheckbox: Locator;
    readonly importWallet: Locator;
    readonly noThanksButton: Locator;
    readonly importConfirm: Locator;
    readonly createPassword: Locator;
    readonly createPasswordConfirm: Locator;
    readonly createPasswordTerm: Locator;
    readonly createPasswordConfirmButton: Locator;
    readonly importDoneButton: Locator;
    readonly unlockPassword: Locator;
    readonly finalNextButton: Locator;
    readonly finalPinDoneButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.termsCheckbox = page.getByTestId('onboarding-terms-checkbox');
        this.importWallet = page.getByTestId('onboarding-import-wallet');
        this.noThanksButton = page.getByTestId('metametrics-no-thanks');
        this.importConfirm = page.getByTestId('import-srp-confirm');
        this.createPassword = page.getByTestId('create-password-new');
        this.createPasswordConfirm = page.getByTestId('create-password-confirm');
        this.createPasswordTerm = page.getByTestId('create-password-terms');
        this.createPasswordConfirmButton = page.getByTestId('create-password-import');
        this.importDoneButton = page.getByTestId('onboarding-complete-done');
        this.unlockPassword = page.getByTestId('unlock-password');
        this.finalNextButton = page.getByTestId('pin-extension-next');
        this.finalPinDoneButton = page.getByTestId('pin-extension-done');
    }
    async goto() {
        await this.page.goto(this.url)
    };

    getSrpWord(index: number): Locator {
        return this.page.locator(`[data-testid="import-srp__srp-word-${index}"]`);
    }

    async fillSeedPhrase(seed: string[]) {
        for (let i = 0; i <= 11; i++) {
            await this.getSrpWord(i).click();
            await this.page.keyboard.insertText(seed[i]);

        }
    }

    async connectMetaMaskWallet() {
        // Подключение кошелька
        await this.termsCheckbox.click();
        await this.importWallet.click();
        await this.noThanksButton.click();
        await this.fillSeedPhrase(process.env.seedPhrase?.split(',') ?? [])
        await this.importConfirm.click();
        // Ввод пароля
        await this.createPassword.fill(process.env.passwordMetaMask ?? '');
        await this.createPasswordConfirm.fill(process.env.passwordMetaMask ?? '');
        await this.createPasswordTerm.click();
        await this.createPasswordConfirmButton.click();
        await this.importDoneButton.click();
        await this.finalNextButton.click();
        await this.finalPinDoneButton.click();
    }




}