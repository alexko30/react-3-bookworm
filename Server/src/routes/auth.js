import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/*', (req, res) => {
	const { credentials } = req.body;
	User.findOne({ email: credentials.email });
});

export default router;
