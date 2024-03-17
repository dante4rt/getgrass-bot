const { connectToWss } = require('./connectToWss');

async function main() {
  const { httpProxyList } = require('./config');
  const tasks = httpProxyList.map((proxy) => connectToWss(proxy));
  await Promise.all(tasks);
}

module.exports = { main };
