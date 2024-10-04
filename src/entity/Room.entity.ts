import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Booking } from './Booking.entity'

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ default: 100 })
  price: number

  @Column({ default: 2, name: 'room_count' })
  roomCount: number

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[]
}
