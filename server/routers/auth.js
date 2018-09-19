const userCtrl = require('../controllers/userCtrl.js');
const router = require('koa-router')();

//user
router.post('/loginByUserName', userCtrl.loginByUserName);
router.post('/register', userCtrl.register);
router.post('/loginByToken', userCtrl.loginByToken);

module.exports = router;
