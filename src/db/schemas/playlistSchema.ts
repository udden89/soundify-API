import mongoose, { Schema, model } from 'mongoose';
import { PlaylistInterface } from '../models/Playlist';

const playlistSchema = new Schema<PlaylistInterface>(
	{
		playlist_name: { type: String, required: true, unique: false },
		songs: [],
	},
	{
		timestamps: true,
	}
);

const Playlist = model<PlaylistInterface>('Playlist', playlistSchema);
export default Playlist;
