import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class startdb1604654019067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "platform",
            columns: [
                {
                    name: "id",
                    generationStrategy: "increment",
                    isGenerated: true,
                    type: "int",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "link",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE",
                    onUpdate: "CURRENT_DATE"
                }
            ]
        }));
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    generationStrategy: "increment",
                    isGenerated: true,
                    type: "int",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "pseudo",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE",
                    onUpdate: "CURRENT_DATE"
                }
            ]
        }));
        await queryRunner.createTable(new Table({
            name: "offer",
            columns: [
                {
                    name: "id",
                    generationStrategy: "increment",
                    isGenerated: true,
                    type: "int",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "price",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "link",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "place",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "duration",
                    type: "bigint",
                    isNullable: true
                },
                {
                    name: "startTime",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "targetId",
                    type: "varchar",
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: "platformId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE",
                    onUpdate: "CURRENT_DATE"
                }
            ]
        }));
        await queryRunner.createTable(new Table({
            name: "skill",
            columns: [
                {
                    name: "id",
                    generationStrategy: "increment",
                    isGenerated: true,
                    type: "int",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "skill",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE",
                    onUpdate: "CURRENT_DATE"
                }
            ]
        }));
        await queryRunner.createTable(new Table({
            name: "skill_offer",
            columns: [
                {
                    name: "skillId",
                    type: "int",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "offerId",
                    type: "int",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE",
                    onUpdate: "CURRENT_DATE"
                }
            ]
        }));
        await queryRunner.createForeignKey("skill_offer", new TableForeignKey({
            name: "fk_skill_offer_skill",
            columnNames: ["skillId"],
            referencedTableName: "skill",
            referencedColumnNames: ["id"]
        }));
        await queryRunner.createForeignKey("skill_offer", new TableForeignKey({
            name: "fk_skill_offer_offer",
            columnNames: ["offerId"],
            referencedTableName: "offer",
            referencedColumnNames: ["id"]
        }));
        await queryRunner.createForeignKey("offer", new TableForeignKey({
            name: "fk_offer_platform",
            columnNames: ["platformId"],
            referencedTableName: "platform",
            referencedColumnNames: ["id"]
        }));
        await queryRunner.createTable(new Table({
            name: "cron_task",
            columns: [
                {
                    name: "id",
                    generationStrategy: "increment",
                    isGenerated: true,
                    type: "int",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "platformId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE",
                    onUpdate: "CURRENT_DATE"
                }
            ]
        }));
        await queryRunner.createForeignKey("cron_task", new TableForeignKey({
            name: "fk_cron_task_platform",
            columnNames: ["platformId"],
            referencedTableName: "platform",
            referencedColumnNames: ["id"]
        }));
        await queryRunner.createForeignKey("cron_task", new TableForeignKey({
            name: "fk_cron_task_user",
            columnNames: ["userId"],
            referencedTableName: "user",
            referencedColumnNames: ["id"]
        }));
        await queryRunner.createTable(new Table({
            name: "cron_task_keywords",
            columns: [
                {
                    name: "id",
                    generationStrategy: "increment",
                    isGenerated: true,
                    type: "int",
                    isNullable: false,
                    isPrimary: true
                },
                {
                    name: "cronTaskId",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "keyword",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    isNullable: false,
                    default: "CURRENT_DATE",
                    onUpdate: "CURRENT_DATE"
                }
            ]
        }));
        await queryRunner.createForeignKey("cron_task_keywords", new TableForeignKey({
            name: "fk_cron_task_keyword_cron_task",
            columnNames: ["cronTaskId"],
            referencedTableName: "cron_task",
            referencedColumnNames: ["id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("cron_task_keywords", "fk_cron_task_keyword_cron_task");
        await queryRunner.dropForeignKey("cron_task", "fk_cron_task_user");
        await queryRunner.dropForeignKey("cron_task", "fk_cron_task_platform");
        await queryRunner.dropForeignKey("offer", "fk_offer_platform");
        await queryRunner.dropForeignKey("skill_offer", "fk_skill_offer_offer");
        await queryRunner.dropForeignKey("skill_offer", "fk_skill_offer_skill");
        await queryRunner.dropTable("cron_task_keywords");
        await queryRunner.dropTable("cron_task");
        await queryRunner.dropTable("skill_offer");
        await queryRunner.dropTable("skill");
        await queryRunner.dropTable("offer");
        await queryRunner.dropTable("user");
        await queryRunner.dropTable("platform");
    }

}
