import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602697122324 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'int',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          precision: 10,
          scale: 8,
        },
        {
          name: 'longitude',
          type: 'decimal',
          precision: 11,
          scale: 8,
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages')
  }

}
