import * as migration_20260823_071952_add_features from './20260823_071952_add_features';

export const migrations = [
  {
    up: migration_20260823_071952_add_features.up,
    down: migration_20260823_071952_add_features.down,
    name: '20260823_071952_add_features'
  },
];
