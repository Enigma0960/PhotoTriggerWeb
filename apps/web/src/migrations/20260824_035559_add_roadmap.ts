import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_roadmap_stages_end_type" AS ENUM('date', 'quarter', 'year');
  CREATE TYPE "public"."enum_roadmap_stages_quarter" AS ENUM('q1', 'q2', 'q3', 'q4');
  CREATE TABLE "roadmap_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"end_type" "enum_roadmap_stages_end_type" DEFAULT 'quarter' NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"quarter" "enum_roadmap_stages_quarter",
  	"year" numeric,
  	"is_current" boolean DEFAULT false
  );
  
  CREATE TABLE "roadmap_stages_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "roadmap" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "roadmap_locales" (
  	"title" varchar DEFAULT 'Project roadmap' NOT NULL,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "roadmap_stages" ADD CONSTRAINT "roadmap_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."roadmap"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roadmap_stages_locales" ADD CONSTRAINT "roadmap_stages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."roadmap_stages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roadmap_locales" ADD CONSTRAINT "roadmap_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."roadmap"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "roadmap_stages_order_idx" ON "roadmap_stages" USING btree ("_order");
  CREATE INDEX "roadmap_stages_parent_id_idx" ON "roadmap_stages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "roadmap_stages_locales_locale_parent_id_unique" ON "roadmap_stages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "roadmap_locales_locale_parent_id_unique" ON "roadmap_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "roadmap_stages" CASCADE;
  DROP TABLE "roadmap_stages_locales" CASCADE;
  DROP TABLE "roadmap" CASCADE;
  DROP TABLE "roadmap_locales" CASCADE;
  DROP TYPE "public"."enum_roadmap_stages_end_type";
  DROP TYPE "public"."enum_roadmap_stages_quarter";`)
}
