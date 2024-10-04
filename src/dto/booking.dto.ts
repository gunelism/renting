import { IsEmail, IsDateString, IsUUID, IsDefined, validate } from 'class-validator'

export class BookingDto {
  @IsEmail()
  @IsDefined()
  email: string

  @IsDateString()
  @IsDefined()
  startDate: string

  @IsDateString()
  @IsDefined()
  endDate: string

  @IsUUID()
  @IsDefined()
  roomId: string

  constructor(data: Partial<BookingDto>) {
    Object.assign(this, data)
  }

  async validate() {
    return await validate(this)
  }
}
