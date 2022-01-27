import { Album as IAlbum } from '../db/models/Album'
import { Artist as IArtist } from '../db/models/Artist'
import { Song as ISong } from '../db/models/Song'
import Album from '../db/schemas/albumSchema'
import Artist from '../db/schemas/artistSchema'
import Song from '../db/schemas/songSchema'



export const saveSong = async (song: ISong) => {
  try {
    const doc = new Song(song)
    return await doc.save()

  } catch (error) {
    console.log(error)
  }
}

export const deleteSong = async (id: number) => {
  return await Song.deleteOne({ _id: id })
}


export const saveAlbum = async (album: IAlbum) => {
  try {
    const doc = new Album(album)
    return await doc.save()

  } catch (error) {
    console.log(error)
  }
}

export const saveArtist = async (artist: IArtist) => {
  try {
    const doc = new Artist(artist)
    return await doc.save()

  } catch (error) {
    console.log(error)
  }
}

export const getSong = async (id: number) => {
  return await Song.findOne({ id })
}

export const getArtist = async (id: number) => {
  return await Artist.findOne({ id })
}

export const getAlbum = async (id: number) => {
  return await Album.findOne({ id })
}


const musicService = {
  saveSong,
  deleteSong,
  saveAlbum,
  saveArtist,
  getSong,
  getArtist,
  getAlbum
}

export default musicService


