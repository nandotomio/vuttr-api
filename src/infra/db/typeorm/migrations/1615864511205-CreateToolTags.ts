import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateToolTags1615864511205 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tool_tags',
        columns: [
          {
            name: 'tool_id',
            type: 'uuid'
          },
          {
            name: 'tag_id',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            referencedTableName: 'tools',
            referencedColumnNames: ['id'],
            columnNames: ['tool_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            columnNames: ['tag_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )

    await queryRunner.createPrimaryKey('tool_tags', [
      'tool_id',
      'tag_id'
    ])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tool_tags')
  }
}
