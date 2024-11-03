require('colors');
const inquirer = require('inquirer');
const Bot = require('./src/Bot');
const Config = require('./src/Config');
const {
  fetchProxies,
  readLines,
  selectProxySource,
} = require('./src/ProxyManager');
const { delay } = require('./src/utils');

function displayHeader() {
  process.stdout.write('\x1Bc');
  console.log('========================================'.cyan);
  console.log('=        Grass Airdrop Bot - V2        ='.cyan);
  console.log('=     Created by HappyCuanAirdrop      ='.cyan);
  console.log('=    https://t.me/HappyCuanAirdrop     ='.cyan);
  console.log('========================================'.cyan);
  console.log();
}

async function main() {
  displayHeader();
  console.log(`Please wait...\n`.yellow);

  await delay(1000);

  const config = new Config();
  const bot = new Bot(config);

  const proxySource = await selectProxySource(inquirer);

  let proxies;
  if (proxySource.type === 'file') {
    proxies = await readLines(proxySource.source);
  } else {
    proxies = await fetchProxies(proxySource.source);
  }

  if (proxies.length === 0) {
    console.error('No proxies found. Exiting...'.red);
    return;
  }

  console.log(`Loaded ${proxies.length} proxies`.green);

  const userIDs = await readLines('uid.txt');
  if (userIDs.length === 0) {
    console.error('No user IDs found in uid.txt. Exiting...'.red);
    return;
  }

  console.log(`Loaded ${userIDs.length} user IDs\n`.green);

  for (const userID of userIDs) {
    proxies.forEach((proxy) => bot.connectToProxy(proxy, userID));
  }
}

main().catch(console.error);
