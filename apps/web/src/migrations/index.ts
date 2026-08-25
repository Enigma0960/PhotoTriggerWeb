import * as migration_20260823_071952_add_features from './20260823_071952_add_features'
import * as migration_20260823_100022_add_features from './20260823_100022_add_features'
import * as migration_20260823_125436_i18n_localized_fields from './20260823_125436_i18n_localized_fields'
import * as migration_20260824_035559_add_roadmap from './20260824_035559_add_roadmap'
import * as migration_20260824_042140_add_dev_blog from './20260824_042140_add_dev_blog'
import * as migration_20260824_105535_add_home_page from './20260824_105535_add_home_page'
import * as migration_20260824_121548_add_support_feedback_analytics_site_events from './20260824_121548_add_support_feedback_analytics_site_events'
import * as migration_20260825_112048_add_feature_categories from './20260825_112048_add_feature_categories'

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
    name: '20260823_125436_i18n_localized_fields',
  },
  {
    up: migration_20260824_035559_add_roadmap.up,
    down: migration_20260824_035559_add_roadmap.down,
    name: '20260824_035559_add_roadmap',
  },
  {
    up: migration_20260824_042140_add_dev_blog.up,
    down: migration_20260824_042140_add_dev_blog.down,
    name: '20260824_042140_add_dev_blog',
  },
  {
    up: migration_20260824_105535_add_home_page.up,
    down: migration_20260824_105535_add_home_page.down,
    name: '20260824_105535_add_home_page',
  },
  {
    up: migration_20260824_121548_add_support_feedback_analytics_site_events.up,
    down: migration_20260824_121548_add_support_feedback_analytics_site_events.down,
    name: '20260824_121548_add_support_feedback_analytics_site_events',
  },
  {
    up: migration_20260825_112048_add_feature_categories.up,
    down: migration_20260825_112048_add_feature_categories.down,
    name: '20260825_112048_add_feature_categories',
  },
]
