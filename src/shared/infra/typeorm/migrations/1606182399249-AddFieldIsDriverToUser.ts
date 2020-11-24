import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldIsDriverToUser1606182399249 implements MigrationInterface {
  private column = new TableColumn({
    name: 'isDriver',
    type: 'boolean',
    isNullable: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', this.column);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', this.column);
  }
}
