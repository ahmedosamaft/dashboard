const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user');
const APIFeatures = require('../utils/apiFeatures');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const AsyncCatch = require(`./asyncCatch`);
const sendEmail = require(`../utils/email`);
const crypto = require('crypto');

const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
const sendToken = (user, status, res, addition) => {
  const token = genToken(user._id);
  return res.status(status).send({
    status: 'success',
    token,
    addition,
  });
};

exports.signup = AsyncCatch(async (req, res, next) => {
  const addedUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  sendToken(addedUser, 200, res);
});

exports.login = AsyncCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new appError("User or Password isn't Exist!", 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new appError('Incorrect email or password', 401));
  sendToken(user, 200, res, user.email);
});

exports.forgetPassword = AsyncCatch(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new appError('Email not exist!', 404));
  const { resetPIN, resetToken: token } = user.createPasswordResetPIN();
  await user.save({ validateBeforeSave: false });
  const message = `Forgot your Password? Your PIN: ${resetPIN}.
if you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset PIN code (valid for 10 mins)',
      message,
    });
    res
      .status(200)
      .send({ status: 'success', token, message: 'PIN sent to email!' });
  } catch (e) {
    user.passwordResetPIN = undefined;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    console.log(e);
    await user.save({ validateBeforeSave: false });
    return next(
      new appError('There is an error sending the email, Try again later!', 500)
    );
  }
});

exports.resetPasswordCheck = AsyncCatch(async (req, res, next) => {
  let hashedToken;
  let pin = req.body.pin;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    hashedToken = req.headers.authorization.split(' ')[1];
    hashedToken = crypto.createHash('sha256').update(hashedToken).digest('hex');
  }
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user)
    return next(
      new appError('Token has Expired or Token is Invalid! Try again.', 400)
    );
  if (user.passwordResetPIN === pin) {
    res.status(200).send({
      status: 'success',
      token: req.headers.authorization.split(' ')[1],
      pin,
    });
  } else next(new appError('Invalid PIN Code!', 400));
});

exports.resetPassword = AsyncCatch(async (req, res, next) => {
  let hashedToken;
  let pin = req.body.pin;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    hashedToken = req.headers.authorization.split(' ')[1];
    hashedToken = crypto.createHash('sha256').update(hashedToken).digest('hex');
  }
  const user = await User.findOne({
    passwordResetToken: hashedToken,
  });
  if (!user)
    return next(
      new appError('Token has Expired or Token is Invalid! Try again.', 404)
    );
  if (user.passwordResetPIN === pin) {
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetExpires = undefined;
    user.passwordResetPIN = undefined;
    user.passwordResetToken = undefined;

    await user.save({ validateBeforeSave: true });

    sendToken(user, 200, res);
  } else next(new appError('Invalid PIN Code!', 400));
});

exports.updatePassword = AsyncCatch(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const { lastPassword, password, confirmPassword } = req.body;

  if (!lastPassword || !password || !confirmPassword)
    return next(
      new appError('Must Provide Password and Confirm Password!', 403)
    );

  if (!(await bcrypt.compare(lastPassword, user.password)))
    return next(new appError('Password is incorrect!', 403));

  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save({ validateBeforeSave: true });
  sendToken(user, 200, res);
});

exports.protect = AsyncCatch(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new appError('you are not Logged in! Please Log in first.', 401)
    );
  }

  const decoded_jwt = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  const user = await User.findById(decoded_jwt.id);

  if (!user) return next(new appError('This User is not Exist!', 401));

  if (user.isChangedPassword(decoded_jwt.iat)) {
    return next(
      new appError(
        'Not Available Page,Password has Changed. log in again!',
        401
      )
    );
  }

  req.user = user;
  next();
});

exports.restrictedTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new appError('you do not have permission to do this action.', 403)
      );
    next();
  };

exports.getAllUsers = AsyncCatch(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .selection()
    .Pagination();
  let users = await features.query;
  res.send({ status: 'success', count: users.length, data: users });
});

exports.getUser = AsyncCatch(async (req, res, next) => {
  const userFound = await User.findById(req.params.id);
  res.send({ status: 'success', data: userFound });
});

exports.deleteUser = AsyncCatch(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send({ status: 'success', data: null });
});

exports.sumUsers = AsyncCatch(async (req, res, next) => {
  const emailCounts = await User.aggregate([
    {
      $match: { password: '12345678' },
    },
    {
      $group: {
        _id: { $toUpper: '$email' },
        password: { $max: '$password' },
        count: { $sum: 1 },
      },
    },
    {
      $match: { _id: { $ne: 'OSAMA@GMAIL.COM' } },
    },
  ]);
  res.status(200).send({ status: 'success', data: emailCounts });
});
