const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Users = new Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true },
},{
    versionKey: false,
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at', 
    }, 
});


module.exports = mongoose.model('Users', Users);