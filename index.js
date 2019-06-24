const http = require('http');
const BankId = require('bankid');
const bankId = new BankId();
const express = require('express')
const app = express()

const port = 3000;
const hostname = '127.0.0.1';

function getIp(reqIp) {
  const isLocalhost = reqIp === '127.0.0.1' || reqIp === '::ffff:127.0.0.1' || reqIp === '::1';

  return isLocalhost ? '127.0.0.1' : ip;
}

app.get('/get-auth-token', async (req, res) => {
  res.statusCode = 200;
  const resp = await bankId.authenticate(getIp(req.ip))
  return res.json(resp);
})

app.get('/session-headers/:orderRef', async (req, res) => {
  const timer = setInterval(async () => {
    const done = () => clearInterval(timer);

    try {
      const response = await bankId.collect(req.params.orderRef);

      if (res.status === 'complete') {
        done();
        return res.json(response)
      } else if (res.status === 'failed') {
        throw new Error(res.hintCode);
      }
    } catch (err) {
      console.error(err);
      res.status(401).json(err)

      done();
    };
  }, 2000);
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
