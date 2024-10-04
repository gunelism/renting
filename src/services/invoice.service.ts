import { AppDataSource } from '../data-source'
import { Invoice } from '../entity/Invoice.entity'
import { Booking } from '../entity/Booking.entity'
import { ApiResponse } from '../common/apiRespnse'

export class InvoiceService {
  static async getInvoices(): Promise<ApiResponse<Invoice[]>> {
    try {
      const invoiceRepository = AppDataSource.getRepository(Invoice)
      const invoices = await invoiceRepository.find()

      return { success: true, data: invoices }
    } catch (error) {
      console.error('Error fetching invoices:', error)
      return { success: false, errors: 'Internal Server Error' }
    }
  }

  static async getInvoiceDetails(invoiceId: string): Promise<ApiResponse<Invoice & { totalPrice: number }>> {
    try {
      const invoiceRepository = AppDataSource.getRepository(Invoice)
      const invoice = await invoiceRepository
        .createQueryBuilder('invoice')
        .leftJoin('invoice.booking', 'booking')
        .leftJoin('booking.room', 'room')
        .addSelect(['booking.startDate', 'booking.endDate', 'room.price'])
        .where('invoice.id = :invoiceId', { invoiceId })
        .getOne()

      if (!invoice) {
        return { success: false, errors: 'Invoice not found' }
      }

      const totalPrice = this.calculateTotalPrice(
        invoice.booking.startDate,
        invoice.booking.endDate,
        invoice.booking.room.price,
      )

      return { success: true, data: { ...invoice, totalPrice } }
    } catch (error) {
      console.error('Error fetching invoice details:', error)
      return { success: false, errors: 'Internal Server Error' }
    }
  }

  static async createInvoice(booking: Booking): Promise<ApiResponse<void>> {
    try {
      const invoice = new Invoice()
      invoice.booking = booking

      const invoiceRepository = AppDataSource.getRepository(Invoice)
      await invoiceRepository.save(invoice)

      return { success: true }
    } catch (error) {
      console.error('Error creating invoice:', error)
      return { success: false, errors: 'Internal Server Error' }
    }
  }

  static calculateTotalPrice(startDate: Date, endDate: Date, price: number): number {
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)

    const timeDiff = endDateObj.getTime() - startDateObj.getTime()
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

    return daysDiff * price
  }
}
