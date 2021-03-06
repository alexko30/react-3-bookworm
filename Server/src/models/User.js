import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true,
			index: true,
			unique: true
		},
		passwordHash: { type: String, required: true },
		confirmed: { type: Boolean, default: false },
		confirmationToken: { type: String, default: '' }
	},
	{ timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.setConfirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
	return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
}

schema.methods.generateJWT = function generateJWT() {
	return jwt.sign(
		{
		email: this.email
		},
		process.env.JWT_SECRET
	);
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT()
  };
};

schema.plugin(uniqueValidator, { message: "This email is already taken" });

export default mongoose.model('User', schema);
