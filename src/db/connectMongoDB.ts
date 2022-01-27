import mongoose, { Mongoose } from 'mongoose'


export default async function connectToDB() {

  await mongoose.connect(process.env.DB as string).
    catch(error => console.log(error))
}

