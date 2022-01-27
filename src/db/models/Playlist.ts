import { Song } from './Song'
import { User } from './User'

// Document interface
export interface PlaylistInterface {
  playlist_name: string
  songs: any[]
  created_at: Date
  modified_at: Date
}
