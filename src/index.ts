import { AppDataSource } from './data-source'
import * as express from 'express'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
import 'reflect-metadata'
import { roomRouter } from './routes/room.routes'
import { bookingRouter } from './routes/booking.routes'
import { invoiceRouter } from './routes/invoice.routes'
import { errorHandler } from './middlewares/error.middleware'
import { CryptoService } from './services/crypto.service'

dotenv.config()
const app = express()
app.use(express.json())
app.use(errorHandler)

const { PORT = 3000 } = process.env
app.use('/rooms', roomRouter)
app.use('/bookings', bookingRouter)
app.use('/invoices', invoiceRouter)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hi!' })
})
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' })
})

AppDataSource.initialize()
  .then(async () => {
    await CryptoService.initializeEncryptionKey(process.env.SECRET_KEY)
    app.listen(PORT, () => {
      console.log('Server is running on http://localhost:' + PORT)
    })
    console.log('Data Source has been initialized!')
  })
  .catch((error) => console.log(error))
