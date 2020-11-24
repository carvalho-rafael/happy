import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";
import { boolean } from "yup";

export class UpdateOrphanagesTable1605907301336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orphanages',
            new TableColumn({
                name: 'is_visible',
                type: 'boolean',
                default: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orphanages', 'is_visible')
    }

}
