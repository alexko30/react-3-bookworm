import mongoose, { Schema } from 'mongoose';

// const schema = new mongoose.Schema(
// 	{
// 		email: {
// 			type: String,
// 			required: true,
// 			lowercase: true,
// 			index: true
// 		},
// 		passwordHash: { type: String, required: true }
// 	},
// 	{ timestamps: true }
// );
//
// export default mongoose.model('User', schema);

const schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true,
			index: true
		},
		passwordHash: { type: String, required: true }
	},
	{ timestamps: true }
);

export default mongoose.model('User', schema);
