class Config {
  constructor() {
    this.ipCheckURL = 'https://ipinfo.io/json';
    this.wssList = ['proxy2.wynd.network:4444', 'proxy2.wynd.network:4650'];
    this.retryInterval = 20000;
    this.wssHost =
      this.wssList[Math.floor(Math.random() * this.wssList.length)];
  }
}

module.exports = Config;
