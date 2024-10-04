import { AppDataSource } from '../data-source'
import { Booking, BookingStatus } from '../entity/Booking.entity'
import { Room } from '../entity/Room.entity'
import { Request } from 'express'
import { InvoiceService } from './invoice.service'
import { CryptoService } from './crypto.service'
import { BookingDto } from '../dto/booking.dto'
import { ApiResponse } from '../common/apiRespnse'

export class BookingService {
  static async getBookings(status: string, email: string, req: Request): Promise<ApiResponse<Booking[]>> {
    const bookingStatus = status === 'confirmed' ? BookingStatus.Confirmed : BookingStatus.Unconfirmed

    try {
      const bookingRepository = AppDataSource.getRepository(Booking)
      const queryBuilder = bookingRepository.createQueryBuilder('Booking')

      if (status) {
        queryBuilder.andWhere('Booking.status = :status', { status: bookingStatus })
      }
      if (email) {
        queryBuilder.andWhere('Booking.email = :email', { email })
      }

      const bookings = await queryBuilder.getMany()
      return { success: true, data: bookings }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      return { success: false, errors: 'Internal Server Error' }
    }
  }

  // reduce the complexity of this method.
  // work on return type of the method.

  static async createBooking(req: Request): Promise<ApiResponse<string>> {
    const bookingDto = new BookingDto(req.body)
    const validationErrors = await bookingDto.validate()

    console.log(validationErrors)
    if (validationErrors.length > 0) {
      const readableErrors = validationErrors.map((error) => Object.values(error.constraints).join(', '))
      return { success: false, errors: readableErrors }
    }

    const { email, startDate, endDate, roomId } = bookingDto
    const roomRepository = AppDataSource.getRepository(Room)
    const room = await roomRepository.findOne({
      where: {
        id: roomId,
      },
    })

    try {
      if (!room) {
        return { success: false, errors: 'Room not found' }
      }

      const validatedDates = await this.validateDates(startDate, endDate)
      if (validatedDates != null) {
        console.log(validatedDates)
        return { success: false, errors: validatedDates }
      }

      const booking = new Booking()
      booking.email = email
      booking.startDate = new Date(startDate)
      booking.endDate = new Date(endDate)
      booking.room = room

      const bookingRepository = AppDataSource.getRepository(Booking)
      await bookingRepository.save(booking)

      const encryptedBookingId = CryptoService.encrypt(booking.id)
      const confirmationLink = `${req.protocol}://${req.get('host')}/bookings/${encryptedBookingId}/confirm`

      return { success: true, data: confirmationLink }
    } catch (error) {
      console.error('Error creating booking:', error)
      return { success: false, errors: 'Internal Server Error' }
    }
  }

  static async confirmBooking(id: string): Promise<ApiResponse<{ message: string }>> {
    const decryptedBookingId = CryptoService.decrypt(id)

    try {
      const bookingRepository = AppDataSource.getRepository(Booking)
      const booking = await bookingRepository.findOne({
        where: {
          id: decryptedBookingId,
        },
      })

      if (!booking) {
        return { success: false, errors: 'Booking not found' }
      }

      if (booking.status === BookingStatus.Confirmed) {
        return { success: false, errors: 'Already confirmed' }
      }

      booking.status = BookingStatus.Confirmed
      await bookingRepository.save(booking)

      await InvoiceService.createInvoice(booking)

      return { success: true, data: { message: 'Booking confirmed' } }
    } catch (error) {
      console.error('Error confirming booking:', error)
      return { success: false, errors: 'Internal Server Error' }
    }
  }

  static async validateDates(startDate: string, endDate: string): Promise<string | null> {
    const currentDate = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start >= end) {
      return 'StartDate cannot be after or equal to endDate'
    }

    if (start < currentDate) {
      return 'StartDate cannot be in the past'
    }

    return null
  }
}
