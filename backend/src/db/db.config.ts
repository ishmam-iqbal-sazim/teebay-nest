import { ReflectMetadataProvider, Dictionary } from '@mikro-orm/core';
import { IPrimaryKeyValue } from '@mikro-orm/core/typings';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { Logger, NotFoundException } from '@nestjs/common';

import * as path from 'path';

const ormConfig = defineConfig({
  entities: [path.resolve(process.cwd(), 'dist/**/*.entity.js')],
  entitiesTs: [path.resolve(process.cwd(), 'src/**/*.entity.ts')],

  metadataProvider: ReflectMetadataProvider,

  clientUrl:
    'postgresql://postgres:postgres@localhost:5432/teebay_nest_db?schema=public',

  extensions: [Migrator],

  validate: true,
  strict: true,
  debug: true,

  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './dist/db/migrations',
    pathTs: './src/db/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    snapshotName: '.snapshot',
    emit: 'ts',
    generator: TSMigrationGenerator,
    fileName: (timestamp: string, name?: string) => {
      if (!name) {
        throw new Error('Specify migration name via `--name=...`');
      }
      return `Migration${timestamp}_${name}`;
    },
  },

  findOneOrFailHandler: (
    entityName: string,
    where: Dictionary | IPrimaryKeyValue,
  ) => {
    Logger.debug(
      `Entity ${entityName} not found with where ${JSON.stringify(where)}`,
    );
    return new NotFoundException();
  },
  findExactlyOneOrFailHandler(
    entityName: string,
    where: Dictionary | IPrimaryKeyValue,
  ) {
    Logger.debug(
      `Entity ${entityName} not found with where ${JSON.stringify(where)}`,
    );
    return new NotFoundException();
  },

  logger(message: string) {
    Logger.debug(message);
  },

  ignoreUndefinedInQuery: true,
});

export default ormConfig;
