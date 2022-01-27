import { Artist } from './Artist'

// Document interface
export interface Song {
  name: string
  artist: Artist[]
  thumbnail: string
  videoId: string
  album: {}
  duration: number
  params: string
  type: string
}
