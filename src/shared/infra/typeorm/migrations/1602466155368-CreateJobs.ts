import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateJobs1602466155368 implements MigrationInterface {
  private table = new Table({
    name: 'jobs',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'driver_id',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'title',
        type: 'varchar',
      },
      {
        name: 'description',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'categories',
        type: 'varchar[]',
        isNullable: false,
      },
      {
        name: 'vacancies',
        type: 'integer',
      },
      {
        name: 'latitude',
        type: 'decimal',
      },
      {
        name: 'longitude',
        type: 'decimal',
      },
      {
        name: 'uri',
        type: 'varchar',
        isNullable: true,
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
    name: 'DriversJobsRelation',
    columnNames: ['driver_id'],
    referencedTableName: 'drivers',
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey('jobs', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('jobs', 'DriversJobsRelation');
    await queryRunner.dropTable('jobs');
  }
}
