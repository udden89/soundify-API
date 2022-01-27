import app from './app'
import dotenv from 'dotenv'
import connectToDB from './db/connectMongoDB'

dotenv.config()


const startServer = async () => {
	connectToDB()
	const server = await app()
	const port = process.env.PORT || 3000
	console.log(port)

	server.listen(port, () => {
		console.log(`App running on port ${port}`)
	})
}

startServer()
