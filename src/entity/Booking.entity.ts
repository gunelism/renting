import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Room } from './Room.entity'

export enum BookingStatus {
  Confirmed = 'confirmed',
  Unconfirmed = 'unconfirmed',
}

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: Room

  @Column()
  email: string

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.Unconfirmed,
  })
  status: BookingStatus

  @Column({ name: 'start_date' })
  startDate: Date

  @Column({ name: 'end_date' })
  endDate: Date

  // calculated total price depending on days column should be added.
}
