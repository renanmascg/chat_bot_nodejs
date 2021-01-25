import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

import { MESSAGE_TABLE_NAME, USER_TABLE_NAME } from '../tablesNames';

export default class AlterUserFieldToUserId1611552816802
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(MESSAGE_TABLE_NAME, 'user');

    await queryRunner.addColumn(
      MESSAGE_TABLE_NAME,
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      MESSAGE_TABLE_NAME,
      new TableForeignKey({
        name: 'UserMessage',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: USER_TABLE_NAME,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(MESSAGE_TABLE_NAME, 'UserMessage');

    await queryRunner.dropColumn(MESSAGE_TABLE_NAME, 'user_id');

    await queryRunner.addColumn(
      MESSAGE_TABLE_NAME,
      new TableColumn({
        name: 'user',
        type: 'varchar',
      }),
    );
  }
}
