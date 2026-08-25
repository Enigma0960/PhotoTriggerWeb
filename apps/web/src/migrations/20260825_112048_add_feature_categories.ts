import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "feature_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 100 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "feature_categories_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "features" ADD COLUMN "category_id" integer;
  ALTER TABLE "_features_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "feature_categories_id" integer;
  INSERT INTO "feature_categories" ("slug", "order") VALUES
    ('trigger', 10),
    ('camera', 20),
    ('automation', 30),
    ('connectivity', 40),
    ('system', 50);
  INSERT INTO "feature_categories_locales" ("title", "_locale", "_parent_id")
    SELECT labels.title, labels.locale::"_locales", feature_categories.id
    FROM (
      VALUES
        ('trigger', 'en', 'Trigger'),
        ('trigger', 'ru', 'Триггер'),
        ('camera', 'en', 'Camera'),
        ('camera', 'ru', 'Камера'),
        ('automation', 'en', 'Automation'),
        ('automation', 'ru', 'Автоматизация'),
        ('connectivity', 'en', 'Connectivity'),
        ('connectivity', 'ru', 'Подключение'),
        ('system', 'en', 'System'),
        ('system', 'ru', 'Система')
    ) AS labels(slug, locale, title)
    INNER JOIN "feature_categories" ON "feature_categories"."slug" = labels.slug;
  UPDATE "features"
    SET "category_id" = "feature_categories"."id"
    FROM "feature_categories"
    WHERE "feature_categories"."slug" = "features"."category"::text;
  UPDATE "_features_v"
    SET "version_category_id" = "feature_categories"."id"
    FROM "feature_categories"
    WHERE "feature_categories"."slug" = "_features_v"."version_category"::text;
  ALTER TABLE "feature_categories_locales" ADD CONSTRAINT "feature_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."feature_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "feature_categories_slug_idx" ON "feature_categories" USING btree ("slug");
  CREATE INDEX "feature_categories_updated_at_idx" ON "feature_categories" USING btree ("updated_at");
  CREATE INDEX "feature_categories_created_at_idx" ON "feature_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "feature_categories_locales_locale_parent_id_unique" ON "feature_categories_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "features" ADD CONSTRAINT "features_category_id_feature_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."feature_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_features_v" ADD CONSTRAINT "_features_v_version_category_id_feature_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."feature_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_feature_categories_fk" FOREIGN KEY ("feature_categories_id") REFERENCES "public"."feature_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "features_category_idx" ON "features" USING btree ("category_id");
  CREATE INDEX "_features_v_version_version_category_idx" ON "_features_v" USING btree ("version_category_id");
  CREATE INDEX "payload_locked_documents_rels_feature_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("feature_categories_id");
  ALTER TABLE "features" DROP COLUMN "category";
  ALTER TABLE "_features_v" DROP COLUMN "version_category";
  DROP TYPE "public"."enum_features_category";
  DROP TYPE "public"."enum__features_v_version_category";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_features_category" AS ENUM('trigger', 'camera', 'automation', 'connectivity', 'system');
  CREATE TYPE "public"."enum__features_v_version_category" AS ENUM('trigger', 'camera', 'automation', 'connectivity', 'system');
  ALTER TABLE "features" ADD COLUMN "category" "enum_features_category";
  ALTER TABLE "_features_v" ADD COLUMN "version_category" "enum__features_v_version_category";
  UPDATE "features"
    SET "category" = CASE "feature_categories"."slug"
      WHEN 'trigger' THEN 'trigger'::"enum_features_category"
      WHEN 'camera' THEN 'camera'::"enum_features_category"
      WHEN 'automation' THEN 'automation'::"enum_features_category"
      WHEN 'connectivity' THEN 'connectivity'::"enum_features_category"
      WHEN 'system' THEN 'system'::"enum_features_category"
      ELSE NULL
    END
    FROM "feature_categories"
    WHERE "feature_categories"."id" = "features"."category_id";
  UPDATE "_features_v"
    SET "version_category" = CASE "feature_categories"."slug"
      WHEN 'trigger' THEN 'trigger'::"enum__features_v_version_category"
      WHEN 'camera' THEN 'camera'::"enum__features_v_version_category"
      WHEN 'automation' THEN 'automation'::"enum__features_v_version_category"
      WHEN 'connectivity' THEN 'connectivity'::"enum__features_v_version_category"
      WHEN 'system' THEN 'system'::"enum__features_v_version_category"
      ELSE NULL
    END
    FROM "feature_categories"
    WHERE "feature_categories"."id" = "_features_v"."version_category_id";
  ALTER TABLE "features" DROP CONSTRAINT "features_category_id_feature_categories_id_fk";
  
  ALTER TABLE "_features_v" DROP CONSTRAINT "_features_v_version_category_id_feature_categories_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_feature_categories_fk";
  
  DROP INDEX "features_category_idx";
  DROP INDEX "_features_v_version_version_category_idx";
  DROP INDEX "payload_locked_documents_rels_feature_categories_id_idx";
  ALTER TABLE "features" DROP COLUMN "category_id";
  ALTER TABLE "_features_v" DROP COLUMN "version_category_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "feature_categories_id";
  ALTER TABLE "feature_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "feature_categories_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "feature_categories" CASCADE;
  DROP TABLE "feature_categories_locales" CASCADE;`)
}
