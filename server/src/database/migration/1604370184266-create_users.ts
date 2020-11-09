import { MigrationInterface, QueryBuilder, QueryRunner, Table } from "typeorm";

export class createUsers1604370184266 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          generationStrategy: 'increment',
          isGenerated: true
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'password',
          type: 'varchar',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
