import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateToDoTable1729343144303 implements MigrationInterface {
    name = 'UpdateToDoTable1729343144303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "date_updated"`);
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "date_created"`);
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "is_done"`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "date_created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "is_done" boolean NOT NULL DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "dateCreated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "isDone" boolean NOT NULL DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "title" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "isDone"`);
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "dateCreated"`);
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "is_done"`);
        await queryRunner.query(`ALTER TABLE "to_do" DROP COLUMN "date_created"`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "is_done" boolean`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "date_created" date`);
        await queryRunner.query(`ALTER TABLE "to_do" ADD "date_updated" date`);
    }

}
