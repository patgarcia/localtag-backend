const bcrypt = require('bcryptjs');
const mongoose = require('../db/connection');
require('mongoose-type-email');
const { Schema } = mongoose;
SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
    {
        display_name: String,
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.compPwd = async function (pwdToCompare) {
    return bcrypt.compare(pwdToCompare, this.password);
};

// UserSchema.pre('findByIdAndUpdate', async function () {
//     this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model('User', UserSchema);

module.exports = User;
