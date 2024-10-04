import * as express from 'express'
import { InvoiceController } from '../controllers/invoice.controller'
const Router = express.Router()

Router.get('/', InvoiceController.getInvoices)

Router.get('/:id', InvoiceController.getInvoice)
export { Router as invoiceRouter }
