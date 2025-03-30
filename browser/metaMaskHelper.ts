import { BrowserContext, Page } from 'playwright';

export async function getMetaMaskPage(context: BrowserContext): Promise<Page> {
  await context.waitForEvent('page'); // Ждём появления новой страницы
  const metaMaskPage = context.pages().find(p => p.url().startsWith('chrome-extension://'))

  if (!metaMaskPage) {
    throw new Error('Распширение MetaMask не найдено');
  }

  console.log(`MetaMask открыт: ${metaMaskPage.url()}`);
  return metaMaskPage;
}
