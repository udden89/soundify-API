import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../db/schemas/userSchema'

const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//Får vårt token i req.header
		const token = req.cookies.loggedIn
		// req.header('Authorization')?.replace('Bearer ', '');
		const decoded = jwt.verify(
			token as string,
			process.env.TOKEN_KEY as string
		) as JwtPayload
		const user = await User.findOne({
			_id: decoded._id,
			// 'tokens.token': token,
		})

		if (!user) {
			throw new Error()
		}

		req.body.token = token
		req.body.user = user
	} catch (error) {
		return res.status(401).send({ error: 'Please authenticate.' })
	}
	next()
}

export default auth
