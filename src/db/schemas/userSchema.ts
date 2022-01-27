import mongoose, { Schema, model } from 'mongoose'
import { User, UserModel } from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ReturnUser } from '../models/ReturnUser'

const userSchema = new Schema<User, UserModel>(
  {
    user_name: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Playlist',
      },
    ],
    email: { type: String, unique: true, required: true, trim: true },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.TOKEN_KEY as string
  )
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.methods.getPublicProfile = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.createdAt
  delete userObject.updatedAt
  delete userObject.__v
  delete userObject._id

  return userObject as ReturnUser
}

userSchema.static(
  'findByCredentials',
  async function findByCredentials(email: string, password: string) {
    const user = await User.findOne({ email }).populate('playlists').exec()

    if (!user) throw new Error('User doesnt exist.')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error('Wrong password.')

    return user
  }
)

const User = model<User, UserModel>('User', userSchema)

export default User
