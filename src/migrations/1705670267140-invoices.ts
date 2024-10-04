import { MigrationInterface, QueryRunner } from 'typeorm'

export class Invoices1705670267140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` 
          CREATE TABLE "invoices"  (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "booking_id" uuid REFERENCES "bookings"("id"),
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_1031171c13130102495201e3e21" PRIMARY KEY ("id")
          )`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invoices"`)
  }
}
