import { MigrationInterface, QueryRunner } from 'typeorm'

export class Rooms1705660297108 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` 
          CREATE TABLE "rooms"  (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "price" integer NOT NULL,
            "room_count" integer NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
          )`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rooms"`)
  }
}
