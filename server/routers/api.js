const postCtrl = require('../controllers/postCtrl.js');
const tagCtrl = require('../controllers/tagCtrl.js');
const commentCtrl = require('../controllers/commentctrl.js');
const router = require('koa-router')();

//post
router.get('/getAllPosts/:key/:pageNum/:pageSize', postCtrl.getAllPosts);
router.post('/addPost', postCtrl.addPost)
router.get('/getPostDetail/:postId', postCtrl.getPostDetail);
router.delete('/removePost/:postId', postCtrl.removePost);

//tag 
router.get('/getAllTags',tagCtrl.getAllTags)
router.post('/addTag',tagCtrl.addTag)


//comment
router.post('/addComment',commentCtrl.addComment);
router.get('/getCommentsByPostId/:postId',commentCtrl.getCommentsByPostId);


module.exports = router;
