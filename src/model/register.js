const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema({
    
    email: {
        type: String,
        require: true,
        unique: true
    },
    firstname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    confirmpassword: {
        type: String,
        require: true,
    },
    
})



const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;