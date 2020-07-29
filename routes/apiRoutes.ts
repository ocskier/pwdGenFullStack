const express = require('express');
const router = express.Router();
import { Request, Response } from 'express';

router.get('/password', (req: Request, res: Response) => {
  console.log('Backend Call!');
});

module.exports = router;
