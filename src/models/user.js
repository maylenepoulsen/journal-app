const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }    
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Your password cannot contain "password".')
      }
    }   
  }
})


const User = mongoose.model('User', userSchema)

module.exports = User