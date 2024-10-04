import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRooms1705925058559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO rooms (price, room_count) VALUES ($1, $2)', [100, 2])
    await queryRunner.query('INSERT INTO rooms (price, room_count) VALUES ($1, $2)', [100, 2])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
