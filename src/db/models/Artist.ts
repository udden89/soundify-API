import { Album } from './Album';
import { Song } from './Song';

export interface Artist {
	artist_name: string;
	albums: Album[];
	songs: Song[];
}
