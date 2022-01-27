import { NextFunction, Request, Response, Router } from 'express'
import { PlaylistInterface } from '../db/models/Playlist'
import Playlist from '../db/schemas/playlistSchema'
import playlistService from '../services/playlistService'
import userService from '../services/userService'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../db/schemas/userSchema'

const router: Router = Router()

//create a new playlist (empty)
router.post('/createplaylist', async (req: Request, res: Response) => {
  try {
    const token = req.cookies.loggedIn

    if (!token || !process.env.TOKEN_KEY) return

    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_KEY as string
    ) as JwtPayload

    const currentUser = await User.findById(decoded._id)
      .populate('playlists')
      .exec()
    if (!currentUser) {
      return
    }

    const newPlaylist = await playlistService.createNewPlaylist(
      req.body as PlaylistInterface
    )
    if (newPlaylist) {
      currentUser.playlists.push(newPlaylist)
      currentUser.save()
    }

    res.send(currentUser.getPublicProfile())
  } catch (error: any) {
    res.sendStatus(500).json(error.message)
  }
})
//get all playlists by user
// router.get('/getallplaylists', async (req: Request, res: Response) => {
// 	try {
// 		const token = req.cookies.loggedIn;
// 		const decoded = jwt.verify(
// 			token as string,
// 			process.env.TOKEN_KEY as string
// 		) as JwtPayload;

// 		const doc = await Playlist.find({ user: decoded });

// 		res.send(doc);
// 	} catch (error: any) {
// 		res.sendStatus(500).json(error.message);
// 	}
// });

//get specific playlist by name
router.get('/getplaylist/:id', (req: Request, res: Response) => {
  try {
    let id = req.params.id

    Playlist.findById({ _id: id }, function (err: any, docs: any) {
      if (err) {
        res.send(err.message)
      } else {
        res.send(docs)
      }
    })
  } catch (error: any) {
    res.sendStatus(500).json(error.message)
  }
})

//delete a specific song in a playlist
router.delete(
  '/delete/:playlistId/:songId',
  async (req: Request, res: Response) => {
    try {
      const playlistId = req.params.playlistId
      const songId = req.params.songId

      const doc = await Playlist.findById(playlistId)
      if (doc) {
        doc.songs = doc?.songs.filter((song: any) => song.videoId !== songId)
        doc?.save()
      }

      res.send(doc)
    } catch (error: any) {
      res.send(error.message)
    }
  }
)

//delete a specific playlist
router.delete('/deleteplaylist/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const doc = await Playlist.findById(id)
  doc?.delete()
  res.send(req.params)
})

//update a specific playlist
router.put('/update/:name', async (req: Request, res: Response) => {
  //hämta listan med id
  try {
    const song = req.body
    const playlist = await Playlist.find({ playlist_name: req.params.name })

    playlist[0].songs.push(song)
    playlist[0].save()

    res.json(playlist[0])
  } catch (error: any) {
    res.send(error.message)
  }
})

export = router

//get, save, update, delete, create
