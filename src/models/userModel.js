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
      required: true,
      minlength: 8
    },
    role: {
      type: String,
      enum: ['ADMIN', 'STAFF', 'USER'],
      default: 'STAFF',
      required: true
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
