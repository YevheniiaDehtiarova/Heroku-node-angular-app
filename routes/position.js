const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/position')

// router.get('/:categoryId',passport.authenticate('jwt', { session: false}), controller.getByCategoryId);
// router.post('/', passport.authenticate('jwt', { session: false}),controller.create);
// router.patch('/:id',passport.authenticate('jwt', { session: false}), controller.update);
// router.delete('/:id',passport.authenticate('jwt', { session: false}), controller.remove);


router.get('/:categoryId', controller.getByCategoryId);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
