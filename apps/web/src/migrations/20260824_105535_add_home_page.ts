import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_steps_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_capabilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_capabilities_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_advantages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_advantages_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "home_page_gallery_items_locales" (
  	"alt" varchar,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"eyebrow" varchar,
  	"product_name" varchar,
  	"subtitle" varchar,
  	"intro" varchar,
  	"signal_title" varchar,
  	"hero_image_id" integer,
  	"hero_image_alt" varchar,
  	"hero_image_caption" varchar,
  	"flow_eyebrow" varchar,
  	"flow_title" varchar,
  	"flow_intro" varchar,
  	"capabilities_title" varchar,
  	"advantages_title" varchar,
  	"gallery_eyebrow" varchar,
  	"gallery_title" varchar,
  	"gallery_intro" varchar,
  	"status_eyebrow" varchar,
  	"status_title" varchar,
  	"status_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "home_page_steps" ADD CONSTRAINT "home_page_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_steps_locales" ADD CONSTRAINT "home_page_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_capabilities" ADD CONSTRAINT "home_page_capabilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_capabilities_locales" ADD CONSTRAINT "home_page_capabilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_capabilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_advantages" ADD CONSTRAINT "home_page_advantages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_advantages_locales" ADD CONSTRAINT "home_page_advantages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_advantages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_gallery_items" ADD CONSTRAINT "home_page_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_gallery_items" ADD CONSTRAINT "home_page_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_gallery_items_locales" ADD CONSTRAINT "home_page_gallery_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_gallery_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_steps_order_idx" ON "home_page_steps" USING btree ("_order");
  CREATE INDEX "home_page_steps_parent_id_idx" ON "home_page_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_steps_locales_locale_parent_id_unique" ON "home_page_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_capabilities_order_idx" ON "home_page_capabilities" USING btree ("_order");
  CREATE INDEX "home_page_capabilities_parent_id_idx" ON "home_page_capabilities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_capabilities_locales_locale_parent_id_unique" ON "home_page_capabilities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_advantages_order_idx" ON "home_page_advantages" USING btree ("_order");
  CREATE INDEX "home_page_advantages_parent_id_idx" ON "home_page_advantages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_advantages_locales_locale_parent_id_unique" ON "home_page_advantages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_gallery_items_order_idx" ON "home_page_gallery_items" USING btree ("_order");
  CREATE INDEX "home_page_gallery_items_parent_id_idx" ON "home_page_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_gallery_items_image_idx" ON "home_page_gallery_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "home_page_gallery_items_locales_locale_parent_id_unique" ON "home_page_gallery_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_image_idx" ON "home_page_locales" USING btree ("hero_image_id","_locale");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_steps" CASCADE;
  DROP TABLE "home_page_steps_locales" CASCADE;
  DROP TABLE "home_page_capabilities" CASCADE;
  DROP TABLE "home_page_capabilities_locales" CASCADE;
  DROP TABLE "home_page_advantages" CASCADE;
  DROP TABLE "home_page_advantages_locales" CASCADE;
  DROP TABLE "home_page_gallery_items" CASCADE;
  DROP TABLE "home_page_gallery_items_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;`)
}
