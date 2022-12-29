const express = require('express');
const router = express.Router();
const user = require('../controllers/authController');

router
  .route('/signup')
  .post(user.protect, user.restrictedTo('admin', 'sub-admin'), user.signup);
router.route('/login').post(user.login);

router.route('/forgetpassword').post(user.forgetPassword);
router.route('/resetpasswordcheck').post(user.resetPasswordCheck);
router.route('/resetpassword').patch(user.resetPassword);

router.route('/updatepassword').patch(user.protect, user.updatePassword);

router.route('/').get(user.getAllUsers);
router.route('/allusers').get(user.sumUsers);

router
  .route('/:id')
  .get(user.protect, user.getUser)
  .patch(user.updatePassword)
  .delete(user.protect, user.restrictedTo('admin'), user.deleteUser)
  .options(user.updatePassword);

module.exports = router;
