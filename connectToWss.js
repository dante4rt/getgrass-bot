const WebSocket = require('ws');
const { HttpsProxyAgent } = require('https-proxy-agent');
const uuid = require('uuid');
const { v3: uuidv3 } = require('uuid');
const { logger } = require('./logger');

async function connectToWss(httpProxy, userId) {
  const namespace = uuid.NIL;
  const deviceId = uuidv3(httpProxy, namespace);

  while (true) {
    try {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
      const customHeaders = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      };
      const agent = new HttpsProxyAgent(httpProxy);
      const uri = 'wss://proxy.wynd.network:4650/';

      const ws = new WebSocket(uri, {
        agent: agent,
        headers: customHeaders,
        rejectUnauthorized: false,
      });

      ws.on('open', async () => {
        logger.info('WebSocket connection opened');

        const sendPing = async () => {
          while (true) {
            const sendMessage = JSON.stringify({
              id: uuid.v4(),
              version: '1.0.0',
              action: 'PING',
              data: {},
            });
            logger.debug(sendMessage);
            ws.send(sendMessage);
            await new Promise((resolve) => setTimeout(resolve, 20000));
          }
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));
        sendPing();

        ws.on('message', async (response) => {
          const message = JSON.parse(response);
          logger.info(message);

          if (message.action === 'AUTH') {
            const authResponse = {
              id: message.id,
              origin_action: 'AUTH',
              result: {
                browser_id: deviceId,
                user_id: userId,
                user_agent: customHeaders['User-Agent'],
                timestamp: Math.floor(Date.now() / 1000),
                device_type: 'extension',
                version: '2.5.0',
              },
            };
            logger.debug(authResponse);
            ws.send(JSON.stringify(authResponse));
          } else if (message.action === 'PONG') {
            const pongResponse = {
              id: message.id,
              origin_action: 'PONG',
            };
            logger.debug(pongResponse);
            ws.send(JSON.stringify(pongResponse));
          }
        });
      });

      ws.on('error', (error) => {
        logger.error(error);
        logger.error(httpProxy);
      });

      ws.on('close', () => {
        logger.info('WebSocket connection closed');
      });
    } catch (error) {
      logger.error(error);
      logger.error(httpProxy);
    }
  }
}

module.exports = { connectToWss };
