# getgrass-bot

This repository contains code for the `getgrass-bot`, a bot designed to perform WebSocket connections through various HTTP proxies.

## Overview

The `getgrass-bot` bot establishes WebSocket connections using HTTP proxies to a specified WebSocket server. It utilizes the `ws` library for WebSocket communication and the `https-proxy-agent` library for proxy support.

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm:

```bash
npm install
```

## Usage

1. Open the `config.js` file in a text editor.
2. Obtain your user ID from the Getgrass website:

   - Visit [https://app.getgrass.io/dashboard](https://app.getgrass.io/dashboard).
   - Open the browser's developer tools (usually by pressing F12 or right-clicking and selecting "Inspect").
   - Go to the "Console" tab.
   - Paste the following command and press Enter:
     ```javascript
     localStorage.getItem('userId');
     ```
   - Copy the value returned, which is your user ID.

3. Modify the `userId` variable in `config.js` with your user ID.
4. Update the `httpProxyList` array with the desired HTTP proxy URLs. Ensure each URL is in the format `http://username:password@hostname:port`.
5. Save the changes to `config.js`.
6. Run the `getgrass-bot` by executing the following command:

```bash
node index.js
```

## Configuration

In the `config.js` file:

- Modify the `userId` variable with your user ID.
- Update the `httpProxyList` array with the desired HTTP proxy URLs. Ensure each URL is in the format `http://username:password@hostname:port`.
