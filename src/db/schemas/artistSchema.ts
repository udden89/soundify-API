import mongoose, { Schema, model } from 'mongoose';
import { Artist } from '../models/Artist';

const artistSchema = new Schema<Artist>(
	{
		albums: [
			{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Album' },
		],
		songs: [
			{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Song' },
		],
		artist_name: { type: String, required: true, trim: true, unique: true },
	},
	{
		timestamps: true,
	}
);

const Artist = model<Artist>('Artist', artistSchema);

export default Artist;
