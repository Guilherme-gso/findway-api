import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateDrivers1602462097272 implements MigrationInterface {
  private table = new Table({
    name: 'drivers',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'company',
        type: 'varchar',
      },
      {
        name: 'cpf',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'cnpj',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'city',
        type: 'varchar',
      },
      {
        name: 'uf',
        type: 'varchar',
      },
      {
        name: 'phone',
        type: 'varchar',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },

      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  private foreignKey = new TableForeignKey({
    name: 'UserDriverRelation',
    columnNames: ['user_id'],
    referencedTableName: 'users',
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('drivers', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('drivers', 'UserDriverRelation');
    await queryRunner.dropTable('drivers');
  }
}
