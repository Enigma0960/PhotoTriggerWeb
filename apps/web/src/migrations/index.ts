import * as migration_20260823_071952_add_features from './20260823_071952_add_features';
import * as migration_20260823_100022_add_features from './20260823_100022_add_features';
import * as migration_20260823_125436_i18n_localized_fields from './20260823_125436_i18n_localized_fields';

export const migrations = [
  {
    up: migration_20260823_071952_add_features.up,
    down: migration_20260823_071952_add_features.down,
    name: '20260823_071952_add_features',
  },
  {
    up: migration_20260823_100022_add_features.up,
    down: migration_20260823_100022_add_features.down,
    name: '20260823_100022_add_features',
  },
  {
    up: migration_20260823_125436_i18n_localized_fields.up,
    down: migration_20260823_125436_i18n_localized_fields.down,
    name: '20260823_125436_i18n_localized_fields'
  },
];
