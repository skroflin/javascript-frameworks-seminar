import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateToDoTable1729342032539 implements MigrationInterface {
    name = 'CreateToDoTable1729342032539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "to-do" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "isDone" boolean NOT NULL DEFAULT 'false', CONSTRAINT "PK_b6637156e0283e6aadc3033e7b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "to_do_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "isDone" boolean NOT NULL DEFAULT 'false', CONSTRAINT "PK_03a5a499425f9667b78f8d04206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "to_do_entity"`);
        await queryRunner.query(`DROP TABLE "to-do"`);
    }

}
