const { Router } = require('express');

const bcrypt = require('bcryptjs');

const config = require('config');

const jwt = require('jsonwebtoken');

const User = require('../models/User');

const { check, validationResult } = require('express-validator');

const router = Router();

// /api/auth
router.post(
  '/register',
  [
    check('email', 'wrong email').isEmail(),
    check('password', 'min password 6 symbols').isLength({ min: 6 }),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'wrong registration data',
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(500)
          .json({ message: { email: 'user already exist' } });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'user created' });
    } catch (error) {
      console.log('regiter error');
      res.status(500).json({ message: 'regiter error' });
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'not correct email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'enter the password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'wrong auth data',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'wrong auth data (email)' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'wrong auth data (password)' });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get('jwtSecret'),
        {
          expiresIn: '1h',
        },
      );

      res.json({ token, userId: user.id });
    } catch (error) {
      // console.log('regiter error', )
      res.status(500).json({ message: 'auth error' });
    }
  },
);

module.exports = router;
