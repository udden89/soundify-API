import { Model, Schema, model, Types } from 'mongoose'
import { PlaylistInterface } from './Playlist'

export interface UserModel extends Model<User> {
	findByCredentials: (email: string, password: string) => Promise<User>
}

// Document interface
export interface User {
	user_name: string
	password: string
	tokens: string[]
	playlists: Array<PlaylistInterface>
	email: string
	generateAuthToken: () => Promise<void>
	getPublicProfile: () => Promise<void>
}
