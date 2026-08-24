import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_feedback_messages_locale" AS ENUM('en', 'ru');
  CREATE TYPE "public"."enum_feedback_messages_status" AS ENUM('new', 'reviewed', 'spam', 'archived');
  CREATE TYPE "public"."enum_site_events_event_type" AS ENUM('page_view', 'navigation_click', 'external_click');
  CREATE TYPE "public"."enum_site_events_locale" AS ENUM('en', 'ru');
  CREATE TABLE "feedback_messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar,
  	"message" varchar NOT NULL,
  	"locale" "enum_feedback_messages_locale" DEFAULT 'ru' NOT NULL,
  	"status" "enum_feedback_messages_status" DEFAULT 'new' NOT NULL,
  	"admin_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_type" "enum_site_events_event_type" NOT NULL,
  	"locale" "enum_site_events_locale" NOT NULL,
  	"path" varchar NOT NULL,
  	"target" varchar,
  	"title" varchar,
  	"referrer" varchar,
  	"session_id" varchar,
  	"user_agent" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "support_page_support_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "support_page_support_options_locales" (
  	"title" varchar,
  	"text" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "support_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "support_page_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"support_options_title" varchar,
  	"support_options_intro" varchar,
  	"feedback_cta_title" varchar,
  	"feedback_cta_text" varchar,
  	"feedback_cta_button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "analytics_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"google_analytics_enabled" boolean DEFAULT false,
  	"google_analytics_measurement_id" varchar,
  	"google_analytics_anonymize_ip" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "feedback_messages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "site_events_id" integer;
  ALTER TABLE "support_page_support_options" ADD CONSTRAINT "support_page_support_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."support_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "support_page_support_options_locales" ADD CONSTRAINT "support_page_support_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."support_page_support_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "support_page_locales" ADD CONSTRAINT "support_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."support_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "feedback_messages_updated_at_idx" ON "feedback_messages" USING btree ("updated_at");
  CREATE INDEX "feedback_messages_created_at_idx" ON "feedback_messages" USING btree ("created_at");
  CREATE INDEX "site_events_event_type_idx" ON "site_events" USING btree ("event_type");
  CREATE INDEX "site_events_locale_idx" ON "site_events" USING btree ("locale");
  CREATE INDEX "site_events_path_idx" ON "site_events" USING btree ("path");
  CREATE INDEX "site_events_target_idx" ON "site_events" USING btree ("target");
  CREATE INDEX "site_events_session_id_idx" ON "site_events" USING btree ("session_id");
  CREATE INDEX "site_events_updated_at_idx" ON "site_events" USING btree ("updated_at");
  CREATE INDEX "site_events_created_at_idx" ON "site_events" USING btree ("created_at");
  CREATE INDEX "support_page_support_options_order_idx" ON "support_page_support_options" USING btree ("_order");
  CREATE INDEX "support_page_support_options_parent_id_idx" ON "support_page_support_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "support_page_support_options_locales_locale_parent_id_unique" ON "support_page_support_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "support_page_locales_locale_parent_id_unique" ON "support_page_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_feedback_messages_fk" FOREIGN KEY ("feedback_messages_id") REFERENCES "public"."feedback_messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_events_fk" FOREIGN KEY ("site_events_id") REFERENCES "public"."site_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_feedback_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("feedback_messages_id");
  CREATE INDEX "payload_locked_documents_rels_site_events_id_idx" ON "payload_locked_documents_rels" USING btree ("site_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "feedback_messages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "support_page_support_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "support_page_support_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "support_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "support_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "analytics_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "feedback_messages" CASCADE;
  DROP TABLE "site_events" CASCADE;
  DROP TABLE "support_page_support_options" CASCADE;
  DROP TABLE "support_page_support_options_locales" CASCADE;
  DROP TABLE "support_page" CASCADE;
  DROP TABLE "support_page_locales" CASCADE;
  DROP TABLE "analytics_settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_feedback_messages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_site_events_fk";
  
  DROP INDEX "payload_locked_documents_rels_feedback_messages_id_idx";
  DROP INDEX "payload_locked_documents_rels_site_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "feedback_messages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "site_events_id";
  DROP TYPE "public"."enum_feedback_messages_locale";
  DROP TYPE "public"."enum_feedback_messages_status";
  DROP TYPE "public"."enum_site_events_event_type";
  DROP TYPE "public"."enum_site_events_locale";`)
}
