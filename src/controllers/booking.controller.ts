import { Request, Response } from 'express'
import { BookingService } from '../services/booking.service'

export class BookingController {
  static async getBookings(req: Request, res: Response) {
    let { status, email } = req.query
    status = status ? status.toString() : ''
    email = email ? email.toString() : ''
    const result = await BookingService.getBookings(status, email, req)

    return res.status(result.success ? 200 : 500).json(result)
  }

  static async createBooking(req: Request, res: Response) {
    const result = await BookingService.createBooking(req)

    return res.status(result.success ? 200 : 400).json(result)
  }

  static async confirmBooking(req: Request, res: Response) {
    const encodedBookingId = req.params.id
    const result = await BookingService.confirmBooking(encodedBookingId)

    return res.status(result.success ? 200 : 404).json(result)
  }
}
