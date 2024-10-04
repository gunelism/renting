import { Request, Response } from 'express'
import { InvoiceService } from '../services/invoice.service'

export class InvoiceController {
  static async getInvoices(req: Request, res: Response) {
    const result = await InvoiceService.getInvoices()
    return res.status(result.success ? 200 : 500).json(result)
  }

  static async getInvoice(req: Request, res: Response) {
    const invoiceId = req.params.id
    const result = await InvoiceService.getInvoiceDetails(invoiceId)
    return res.status(result.success ? 200 : 404).json(result)
  }
}
