import { Application } from 'express'
import user from './controllers/userController'
import playlist from './controllers/playlistController'
import searchController from './controllers/searchController'

export = (app: Application): void => {
	// Routes
	app.use('/api/user', user)
	app.use('/api/playlist', playlist)
	app.use('/api/search', searchController)
	app.all('*', (req, res) => {
		res.status(404).send('<h1>resource not found</h1>')
	})
}
