const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username 			: {type: String, unique: true},
    namalengkap 	    : String,
    email			    : {type: String, unique: true},
    hashed_password	    : String,
    created_at		    : String,
    temp_password	    : String,
    temp_password_time  : String,
    api_token           : String,
    admin               : Boolean
});
module.exports = mongoose.model('user', userSchema);
