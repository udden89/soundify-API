import { Model, Schema, model } from 'mongoose';
import { PlaylistInterface } from './Playlist';

// Document interface
export interface ReturnUser {
	user_name: string;
	playlists: Array<PlaylistInterface>;
	email: string;
}
