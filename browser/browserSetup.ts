import { chromium, BrowserContext } from 'playwright';
import {USER_DATA_DIR, METAMASK_PATH} from './config'
// Путь к распакованному расширению MetaMask


export async function launchBrowserWithMetaMask(): Promise<BrowserContext> {
  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    channel: 'chrome',  // Используем реальный Google Chrome, а не Chromium
    headless: false,    // Запуск в UI-режиме
    args: [
      `--disable-extensions-except=${METAMASK_PATH}`,  // Загружаем только MetaMask
      `--load-extension=${METAMASK_PATH}`,  // Указываем путь к расширению MetaMask
    ],
  });

  console.log('Google Chrome с MetaMask запущен!');
  return context;
}
