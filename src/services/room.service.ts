import { AppDataSource } from '../data-source'
import { Room } from '../entity/Room.entity'

export class RoomService {
  static async getRooms() {
    const roomRepository = AppDataSource.getRepository(Room)
    return await roomRepository.find()
  }
}
