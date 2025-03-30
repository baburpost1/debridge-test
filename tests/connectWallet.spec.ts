import { test, expect } from '@playwright/test';
import { launchBrowserWithMetaMask } from '../browser/browserSetup';
import { getMetaMaskPage } from '../browser/metaMaskHelper';
import { mainFormClass } from '../pages/debridge/mainForm';
import { onboardingPage } from '../pages/metaMask/connection';
import { confirmConnection } from '../pages/metaMask/confirm_connection_page';
import { homePageMetaMask } from '../pages/metaMask/main_page';

let balanseMetaMask: number;
let balanceDebridge: number;
const expectedWalletMask: string = '0x147e...6066'

test('Тест MetaMask в Google Chrome с сохранением данных', async () => {
  const context = await launchBrowserWithMetaMask();  // Запускаем браузер с MetaMask
  const metaMaskPage = await getMetaMaskPage(context);  // Получаем страницу MetaMask

  // Подключение метамаск (можно было бы вынести это в блок beforeAll но у нас 1 тест, так что не стал)
  const metaMaskOnboarding = new onboardingPage(metaMaskPage);
  metaMaskOnboarding.connectMetaMaskWallet()

  // Добавление дополнительной сети
  const metaMaskHomePage = new homePageMetaMask(metaMaskPage);
  await metaMaskHomePage.addAdditionalNetwork();
  await metaMaskHomePage.page.waitForTimeout(3000)
  balanseMetaMask = await metaMaskHomePage.getFirstBalance();


  // Открываем debridge
  const deBridge = await context.newPage();
  const mainForm = new mainFormClass(deBridge);
  await mainForm.goto();

  // Выбор сети и кошелька метамаск
  await mainForm.selectNetwork({ network: 'Polygon', token: 'MATIC' });
  await mainForm.connectWalletButton.scrollIntoViewIfNeeded();
  await mainForm.connectWalletButton.click();

  // Подтверждение подключения
  const newPagePromise = context.waitForEvent('page');
  await mainForm.metaMaskButton.click();

  // Дожидаемся открытия новой страницы и подтверждаем подключение
  const confirmConnectionPage = await newPagePromise;
  await confirmConnectionPage.waitForLoadState();
  const confirmMetaMask = new confirmConnection(confirmConnectionPage);
  await confirmMetaMask.confirmConnectionButton.click();

  // Получение отображаемого баланса в debridge
  await mainForm.page.waitForTimeout(3000);
  balanceDebridge = await mainForm.getBalance();

  // Проверка балансов (хорошо бы получать баланс по api чтобы уйти от округления)
  try {
    expect(balanseMetaMask).toEqual(balanceDebridge);
  } catch (error) {
    throw new Error(`Значение в метамаск ${balanseMetaMask} не равно значению отображаемому в deBridge ${balanceDebridge}. ${error.message}`);
  }

  // Проверка что отображается верная маска кошелька

  const actualWalletMask = await mainForm.getWalletMask();
  try {
    expect(actualWalletMask).toEqual(expectedWalletMask);
  } catch (error) {
    throw new Error(`Отображаемая маска кошелька ${actualWalletMask} не равно ожидаемому значению ${expectedWalletMask}. ${error.message}`);
  }



  await deBridge.screenshot({ path: 'metamask.png' });
  await context.close();  // Закрываем контекст 
});
