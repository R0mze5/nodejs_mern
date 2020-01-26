import { link } from 'fs';

const { Router } = require('express');

const Link = require('../models/Link');
const router = Router();

export interface ILink {
  from: string;
  to: string;
  clicks: number;
  data: Date;
  _id: string;
  save: Function;
}

router.get('/:code', async (req, res) => {
  try {
    const link: ILink = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks++;

      await link.save();

      return res.redirect(link.from);
    }

    res.status(404).json('ref not found');
  } catch (error) {
    // console.log('regiter error', )
    res.status(500).json({ message: 'something wrong' });
  }
});

module.exports = router;
