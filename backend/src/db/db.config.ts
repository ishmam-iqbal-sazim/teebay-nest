import { ReflectMetadataProvider } from '@mikro-orm/core';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';

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
});

export default ormConfig;
