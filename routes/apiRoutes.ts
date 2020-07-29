const express = require('express');
const router = express.Router();
const generatePwd = require('generate-password');

import { Request, Response } from 'express';

router.post('/password', (req: Request, res: Response) => {
  res.json({
    possibleCode: generatePwd.generate({
      length: Number(req.body.length),
      lowercase: req.body.answers[0],
      uppercase: req.body.answers[1],
      symbols: req.body.answers[2],
      numbers: req.body.answers[3],
    }),
  });
});

module.exports = router;
