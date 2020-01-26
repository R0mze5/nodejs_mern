const { Router } = require('express');
const config = require('config');

const shortid = require('shortid');

const Link = require('../models/Link');

const auth = require('../middleware/auth.middleware');

const router = Router();

// /api/auth
router.post('/generate', auth, async (req: any, res: any) => {
  try {
    const baseUrl = config.get('baseUrl');

    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ code });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;

    const link = new Link({ from, to, code, owner: req.user.userId });

    await link.save();

    res.status(201).json({ link }); // 201 created
  } catch (error) {
    res.status(500).json({ message: 'something wrong' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });

    res.json(links);
  } catch (error) {
    // console.log('regiter error', )
    res.status(500).json({ message: 'something wrong' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);

    res.json(links);
  } catch (error) {
    // console.log('regiter error', )
    res.status(500).json({ message: 'something wrong' });
  }
});

module.exports = router;
