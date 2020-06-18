const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

userSchema.pre('save', async function(next) {
  const user = this
  //hash password only if user is just created or updated, the check is done using mongoose .isModified
  if(user.isModified) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})


const User = mongoose.model('User', userSchema)

module.exports = User