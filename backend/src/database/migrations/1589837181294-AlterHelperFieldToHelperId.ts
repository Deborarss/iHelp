import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterHelperFieldToHelperId1589837181294
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'helper');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'helper_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentHelper',
        columnNames: ['helper_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentHelper');

    await queryRunner.dropColumn('appointments', 'helper_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'helper',
        type: 'varchar',
      }),
    );
  }
}
