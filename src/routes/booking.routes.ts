import * as express from 'express'
import { BookingController } from '../controllers/booking.controller'
const Router = express.Router()

Router.get('/', BookingController.getBookings)
Router.post('/create', BookingController.createBooking)

Router.get('/:id/confirm', BookingController.confirmBooking)
export { Router as bookingRouter }
