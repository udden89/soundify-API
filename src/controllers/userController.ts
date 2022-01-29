import { NextFunction, Request, Response, Router } from 'express'
import { User as IUser } from '../db/models/User'
import userService from '../services/userService'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../db/schemas/userSchema'
import auth from '../middleware/auth'
const { promisify } = require('util')

const router: Router = Router()

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await userService.createNewUser(req.body as IUser)

      if (!newUser) throw new Error('User Already Exist. Please Login')

      const token = await newUser.generateAuthToken()
      res.cookie('loggedIn', token, { maxAge: 9000000, httpOnly: true })

      res.status(200).json(await newUser.getPublicProfile())
    } catch (error: any) {
      res.sendStatus(500).json(error.msg)
    }
  }
)

router.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)

    if (!user) throw new Error('Could not log in. Please check credentials.')

    if (user) {
      const token = await user.generateAuthToken()
      const resUser = await user.getPublicProfile()

      res.cookie('loggedIn', token, { maxAge: 900000000, httpOnly: true })
      res.send(resUser)
    }

  } catch (e: any) {
    console.log(e)
    res.sendStatus(500).json(e.msg)
  }
})
//auth

const tokenCatcher = async (req: Request) => {
  const token = req.cookies.loggedIn
  // req.header('Authorization')?.replace('Bearer ', '');
  const decoded = jwt.verify(
    token as string,
    process.env.TOKEN_KEY as string
  ) as JwtPayload

  return decoded
}

router.post('/logout', auth, async (req: Request, res: Response) => {
  const token_payload = await tokenCatcher(req)
  const token2 = req.cookies.loggedIn
  try {
    let user = await User.findOne({ _id: token_payload._id })

    if (user && token2) {
      user.tokens = user.tokens.filter((token: any) => {
        return token.token !== token2
      })
      res.clearCookie('loggedIn')
      await user.save()
      res.send(200)
    }
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/whoami', async (req: Request, res: Response) => {
  if (req.cookies.loggedIn) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.loggedIn,
        process.env.TOKEN_KEY
      )

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded._id)
        .populate('playlists')
        .exec()

      if (!currentUser) {
        return res.send({ message: 'nothing' })
      }
      return res.send(currentUser.getPublicProfile())
    } catch (err) {
      res.status(500).send(err)
    }
  }
  res.send({ message: 'nothing' })
})
export = router
