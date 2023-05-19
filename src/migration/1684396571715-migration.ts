import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1684396571715 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS transaction_entity (
        id SERIAL PRIMARY KEY,
        "from" VARCHAR NOT NULL,
        "to" VARCHAR NOT NULL,
        value VARCHAR NOT NULL,
        block_number INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS transaction_entity;`);
  }
}
