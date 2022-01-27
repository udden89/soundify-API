import mongoose, { Schema, model } from 'mongoose';
import { Album } from '../models/Album';

const albumSchema = new Schema<Album>(
	{
		artist: [
			{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Artist' },
		],
		songs: [
			{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Song' },
		],
	},
	{
		timestamps: true,
	}
);

const Album = model<Album>('Album', albumSchema);

export default Album;
