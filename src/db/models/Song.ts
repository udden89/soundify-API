import { Artist } from './Artist'

// Document interface
export interface Song {
  name: string
  artist: Artist[]
  thumbnails: []
  videoId: string
  album: {}
  duration: number
  params: string
  type: string
}
