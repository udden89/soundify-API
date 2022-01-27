import { Artist } from './Artist';
import { Song } from './Song';

export interface Album {
	artist: Artist;
	songs: Song[];
}
