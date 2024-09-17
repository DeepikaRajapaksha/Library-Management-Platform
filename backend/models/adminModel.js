const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/admindb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const adminSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true }
});

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Admin = adminConnection.model('Admin', adminSchema); // Notice the use of adminConnection
module.exports = Admin;

