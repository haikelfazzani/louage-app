const router = require("express").Router();
const os = require('os');
const url = require('url');
const querystring = require('querystring');

router.get('/', (req, res) => {
  setImmediate(() => {
    try {
      res.send({
        user: os.userInfo().username,
        hostname: os.hostname(),
        osType: os.type(),
        osPlatform: os.platform()
      });
    } catch (error) {
      res.status(400).send('error');
    }
  });
});

router.get('/uparse', (req, res) => {
  res.json(url.parse(req.url));
});

// our query : http://localhost:3001/api/qstring?foo=bar&abc=xyz&abc=123
router.get('/qstring', (req, res) => {
  res.json({
    escape: querystring.escape("/hello"),
    parse: querystring.parse("foo=bar&abc=xyz&abc=123"),
    reqQuery : req.query
  });
});


router.get('/nodenv', (req, res) => {
  res.json(process.env.DB_HOST);
});

module.exports = router;
