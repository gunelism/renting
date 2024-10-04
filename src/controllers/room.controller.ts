import { Request, Response } from 'express'
import { RoomService } from '../services/room.service'

export class RoomController {
  static async getRooms(req: Request, res: Response) {
    try {
      const rooms = await RoomService.getRooms()
      return res.status(200).json({
        data: rooms,
      })
    } catch (error) {
      console.error('Error fetching rooms:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
