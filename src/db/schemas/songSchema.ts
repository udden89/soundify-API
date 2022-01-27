import mongoose, { Schema, model } from 'mongoose'
import { Song } from '../models/Song'

const songSchema = new Schema<Song>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    artist: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Artist' },
    ],
    duration: { type: Number, required: true, trim: true },
    thumbnail: { type: String, required: true },
    videoId: { type: String, required: true },
    type: { type: String },
    params: { type: String },
    album: { type: Object },
  },
  {
    timestamps: true,
  }
)

const Song = model<Song>('Song', songSchema)

export default Song
