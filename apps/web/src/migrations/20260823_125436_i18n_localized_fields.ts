import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ru');
  CREATE TYPE "public"."enum__features_v_published_locale" AS ENUM('en', 'ru');
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "features_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_features_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_locales" (
  	"tagline" varchar DEFAULT 'Programmable camera trigger and photography automation platform.' NOT NULL,
  	"description" varchar DEFAULT 'Project Iris is an open hardware configurable camera trigger for interval, HDR, lightning, sound and external-trigger photography.' NOT NULL,
  	"meta_title" varchar DEFAULT 'Project Iris',
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_navigation_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"description" varchar DEFAULT 'Open hardware camera trigger and photography automation project.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "_features_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_features_v" ADD COLUMN "published_locale" "enum__features_v_published_locale";
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_locales" ADD CONSTRAINT "features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_features_v_locales" ADD CONSTRAINT "_features_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_features_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_locales" ADD CONSTRAINT "header_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_links_locales" ADD CONSTRAINT "footer_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  INSERT INTO "media_locales" ("alt", "_locale", "_parent_id")
  SELECT "alt", 'en', "id" FROM "media";
  INSERT INTO "features_locales" ("title", "summary", "description", "_locale", "_parent_id")
  SELECT "title", "summary", "description", 'en', "id" FROM "features";
  INSERT INTO "_features_v_locales" ("version_title", "version_summary", "version_description", "_locale", "_parent_id")
  SELECT "version_title", "version_summary", "version_description", 'en', "id" FROM "_features_v";
  INSERT INTO "site_settings_locales" ("tagline", "description", "meta_title", "meta_description", "_locale", "_parent_id")
  SELECT "tagline", "description", "meta_title", "meta_description", 'en', "id" FROM "site_settings";
  INSERT INTO "header_navigation_locales" ("label", "_locale", "_parent_id")
  SELECT "label", 'en', "id" FROM "header_navigation";
  INSERT INTO "footer_links_locales" ("label", "_locale", "_parent_id")
  SELECT "label", 'en', "id" FROM "footer_links";
  INSERT INTO "footer_locales" ("description", "_locale", "_parent_id")
  SELECT "description", 'en', "id" FROM "footer";
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "features_locales_locale_parent_id_unique" ON "features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_features_v_locales_locale_parent_id_unique" ON "_features_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_navigation_locales_locale_parent_id_unique" ON "header_navigation_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_links_locales_locale_parent_id_unique" ON "footer_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_features_v_snapshot_idx" ON "_features_v" USING btree ("snapshot");
  CREATE INDEX "_features_v_published_locale_idx" ON "_features_v" USING btree ("published_locale");
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "features" DROP COLUMN "title";
  ALTER TABLE "features" DROP COLUMN "summary";
  ALTER TABLE "features" DROP COLUMN "description";
  ALTER TABLE "_features_v" DROP COLUMN "version_title";
  ALTER TABLE "_features_v" DROP COLUMN "version_summary";
  ALTER TABLE "_features_v" DROP COLUMN "version_description";
  ALTER TABLE "site_settings" DROP COLUMN "tagline";
  ALTER TABLE "site_settings" DROP COLUMN "description";
  ALTER TABLE "site_settings" DROP COLUMN "meta_title";
  ALTER TABLE "site_settings" DROP COLUMN "meta_description";
  ALTER TABLE "header_navigation" DROP COLUMN "label";
  ALTER TABLE "footer_links" DROP COLUMN "label";
  ALTER TABLE "footer" DROP COLUMN "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "alt" varchar;
  ALTER TABLE "features" ADD COLUMN "title" varchar;
  ALTER TABLE "features" ADD COLUMN "summary" varchar;
  ALTER TABLE "features" ADD COLUMN "description" jsonb;
  ALTER TABLE "_features_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_features_v" ADD COLUMN "version_summary" varchar;
  ALTER TABLE "_features_v" ADD COLUMN "version_description" jsonb;
  ALTER TABLE "site_settings" ADD COLUMN "tagline" varchar DEFAULT 'Programmable camera trigger and photography automation platform.' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "description" varchar DEFAULT 'Project Iris is an open hardware configurable camera trigger for interval, HDR, lightning, sound and external-trigger photography.' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "meta_title" varchar DEFAULT 'Project Iris';
  ALTER TABLE "site_settings" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "header_navigation" ADD COLUMN "label" varchar;
  ALTER TABLE "footer_links" ADD COLUMN "label" varchar;
  ALTER TABLE "footer" ADD COLUMN "description" varchar DEFAULT 'Open hardware camera trigger and photography automation project.';
  UPDATE "media"
  SET "alt" = "media_locales"."alt"
  FROM "media_locales"
  WHERE "media_locales"."_parent_id" = "media"."id"
    AND "media_locales"."_locale" = 'en';
  UPDATE "features"
  SET
    "title" = "features_locales"."title",
    "summary" = "features_locales"."summary",
    "description" = "features_locales"."description"
  FROM "features_locales"
  WHERE "features_locales"."_parent_id" = "features"."id"
    AND "features_locales"."_locale" = 'en';
  UPDATE "_features_v"
  SET
    "version_title" = "_features_v_locales"."version_title",
    "version_summary" = "_features_v_locales"."version_summary",
    "version_description" = "_features_v_locales"."version_description"
  FROM "_features_v_locales"
  WHERE "_features_v_locales"."_parent_id" = "_features_v"."id"
    AND "_features_v_locales"."_locale" = 'en';
  UPDATE "site_settings"
  SET
    "tagline" = "site_settings_locales"."tagline",
    "description" = "site_settings_locales"."description",
    "meta_title" = "site_settings_locales"."meta_title",
    "meta_description" = "site_settings_locales"."meta_description"
  FROM "site_settings_locales"
  WHERE "site_settings_locales"."_parent_id" = "site_settings"."id"
    AND "site_settings_locales"."_locale" = 'en';
  UPDATE "header_navigation"
  SET "label" = "header_navigation_locales"."label"
  FROM "header_navigation_locales"
  WHERE "header_navigation_locales"."_parent_id" = "header_navigation"."id"
    AND "header_navigation_locales"."_locale" = 'en';
  UPDATE "footer_links"
  SET "label" = "footer_links_locales"."label"
  FROM "footer_links_locales"
  WHERE "footer_links_locales"."_parent_id" = "footer_links"."id"
    AND "footer_links_locales"."_locale" = 'en';
  UPDATE "footer"
  SET "description" = "footer_locales"."description"
  FROM "footer_locales"
  WHERE "footer_locales"."_parent_id" = "footer"."id"
    AND "footer_locales"."_locale" = 'en';
  UPDATE "media" SET "alt" = '' WHERE "alt" IS NULL;
  UPDATE "header_navigation" SET "label" = '' WHERE "label" IS NULL;
  UPDATE "footer_links" SET "label" = '' WHERE "label" IS NULL;
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "header_navigation" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "footer_links" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_features_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "features_locales" CASCADE;
  DROP TABLE "_features_v_locales" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "header_navigation_locales" CASCADE;
  DROP TABLE "footer_links_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP INDEX "_features_v_snapshot_idx";
  DROP INDEX "_features_v_published_locale_idx";
  ALTER TABLE "_features_v" DROP COLUMN "snapshot";
  ALTER TABLE "_features_v" DROP COLUMN "published_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__features_v_published_locale";`)
}
