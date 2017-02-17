const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const errorhandler = require('errorhandler');
const cookieParser = require('cookie-parser');

const app = require('express')();
const router = require('./routers');
const controller = require('./controller');

// compress everything
app.use(compression());

// corss domain setting
app.use(cors());

// logs on console
app.use(morgan('dev'));

// parse json
app.use(bodyParser.json());

// parse url encoding
app.use(bodyParser.urlencoded({extended: true}));

// use cookie
app.use(cookieParser());

// errorhandler
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}

// add routes here
app.use('/search', router.search(controller.search));
app.use('/subscription', router.subscription(controller.subscription));
app.use('/login',router.login(controller.login));
app.use('/favor', router.favor(controller.favor));
app.use('/download', router.download(controller.download));

// 404
app.use(function(req, res, next) {
  res.status(404).end();
});

// 500
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).end();
});

// start server
app.listen(9900, () => {
  console.log(`Express server started on 9900`);
});
