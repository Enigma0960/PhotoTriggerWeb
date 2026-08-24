import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_dev_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__dev_blog_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__dev_blog_posts_v_published_locale" AS ENUM('en', 'ru');
  CREATE TABLE "dev_blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"review_token" varchar,
  	"review_link_ru" varchar,
  	"review_link_en" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_dev_blog_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "dev_blog_posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_dev_blog_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_review_token" varchar,
  	"version_review_link_ru" varchar,
  	"version_review_link_en" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__dev_blog_posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__dev_blog_posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_dev_blog_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "dev_blog_posts_id" integer;
  ALTER TABLE "dev_blog_posts_locales" ADD CONSTRAINT "dev_blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dev_blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_dev_blog_posts_v" ADD CONSTRAINT "_dev_blog_posts_v_parent_id_dev_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dev_blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dev_blog_posts_v_locales" ADD CONSTRAINT "_dev_blog_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_dev_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "dev_blog_posts_slug_idx" ON "dev_blog_posts" USING btree ("slug");
  CREATE INDEX "dev_blog_posts_updated_at_idx" ON "dev_blog_posts" USING btree ("updated_at");
  CREATE INDEX "dev_blog_posts_created_at_idx" ON "dev_blog_posts" USING btree ("created_at");
  CREATE INDEX "dev_blog_posts__status_idx" ON "dev_blog_posts" USING btree ("_status");
  CREATE UNIQUE INDEX "dev_blog_posts_locales_locale_parent_id_unique" ON "dev_blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_dev_blog_posts_v_parent_idx" ON "_dev_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_dev_blog_posts_v_version_version_slug_idx" ON "_dev_blog_posts_v" USING btree ("version_slug");
  CREATE INDEX "_dev_blog_posts_v_version_version_updated_at_idx" ON "_dev_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_dev_blog_posts_v_version_version_created_at_idx" ON "_dev_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_dev_blog_posts_v_version_version__status_idx" ON "_dev_blog_posts_v" USING btree ("version__status");
  CREATE INDEX "_dev_blog_posts_v_created_at_idx" ON "_dev_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_dev_blog_posts_v_updated_at_idx" ON "_dev_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_dev_blog_posts_v_snapshot_idx" ON "_dev_blog_posts_v" USING btree ("snapshot");
  CREATE INDEX "_dev_blog_posts_v_published_locale_idx" ON "_dev_blog_posts_v" USING btree ("published_locale");
  CREATE INDEX "_dev_blog_posts_v_latest_idx" ON "_dev_blog_posts_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_dev_blog_posts_v_locales_locale_parent_id_unique" ON "_dev_blog_posts_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dev_blog_posts_fk" FOREIGN KEY ("dev_blog_posts_id") REFERENCES "public"."dev_blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_dev_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("dev_blog_posts_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "dev_blog_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "dev_blog_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dev_blog_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_dev_blog_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "dev_blog_posts" CASCADE;
  DROP TABLE "dev_blog_posts_locales" CASCADE;
  DROP TABLE "_dev_blog_posts_v" CASCADE;
  DROP TABLE "_dev_blog_posts_v_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_dev_blog_posts_fk";
  
  DROP INDEX "payload_locked_documents_rels_dev_blog_posts_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "dev_blog_posts_id";
  DROP TYPE "public"."enum_dev_blog_posts_status";
  DROP TYPE "public"."enum__dev_blog_posts_v_version_status";
  DROP TYPE "public"."enum__dev_blog_posts_v_published_locale";`)
}
