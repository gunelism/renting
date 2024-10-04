import { MigrationInterface, QueryRunner } from 'typeorm'

export class Bookings1705663910896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` 
          CREATE TABLE "bookings"  (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "email" character varying NOT NULL,
            "room_id" uuid REFERENCES "rooms"("id"),
            "start_date" TIMESTAMP NOT NULL DEFAULT now(),
            "end_date" TIMESTAMP NOT NULL DEFAULT now(),
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
          )`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bookings"`)
  }
}
