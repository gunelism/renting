import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Booking } from './Booking.entity'

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: string

  @OneToOne(() => Booking)
  @JoinColumn({ name: 'booking_id', referencedColumnName: 'id' })
  booking: Booking
}
