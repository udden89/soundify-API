import { User as IUser } from '../db/models/User'
import User from '../db/schemas/userSchema'


const createNewUser = async (user: IUser) => {
  try {
    const doc = new User(user)

    if (!await doc.save()) throw new Error('Could not create new User.')

    return doc

  } catch (error) {
    console.log(error)
  }
}


const findUser = async (email: string) => {
  return await User.findOne({ email })
}


const userService = {
  createNewUser,
  findUser
}

export default userService
