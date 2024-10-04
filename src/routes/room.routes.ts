import * as express from 'express'
import { RoomController } from '../controllers/room.controller'
const Router = express.Router()

Router.get('/', RoomController.getRooms)
export { Router as roomRouter }
