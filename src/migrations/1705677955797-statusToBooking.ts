import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class StatusToBooking1705677955797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'bookings',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enum: ['confirmed', 'unconfirmed'],
        default: "'unconfirmed'",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('bookings', 'status')
  }
}
