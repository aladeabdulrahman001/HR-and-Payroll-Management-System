import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      match: [/^[^\s@\.]+@[^\s@\.]+\.[^\s@\.]+$/, 'Invalid email format']
    },
    password: {
      type: String,
      required: false, // Password is not required for invited users until they set it
      minlength: 8
    },
    role: {
      type: String,
      enum: ['ADMIN', 'STAFF', 'HRM'],
      default: 'STAFF',
      required: true
    },
<<<<<<< HEAD
    isActive: { type: Boolean, default: false },
    inviteToken: { type: String, default: null },
    inviteExpiry: { type: Date, default: null }
=======
    inviteToken: {
      type: String,
    },

    inviteExpiry: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: false,
    },  
    
>>>>>>> main
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User


