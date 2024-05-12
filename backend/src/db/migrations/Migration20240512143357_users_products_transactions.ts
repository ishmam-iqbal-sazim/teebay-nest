import { Migration } from '@mikro-orm/migrations';

export class Migration20240512143357_users_products_transactions extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) not null);',
    );
    this.addSql(
      'alter table "users" add constraint "users_email_unique" unique ("email");',
    );

    this.addSql(
      'create table "products" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "description" varchar(255) not null, "purchase_price" double precision not null, "rent_price" double precision not null, "rentDuration" text check ("rentDuration" in (\'hourly\', \'daily\', \'weekly\', \'monthly\')) not null, "available" text check ("available" in (\'AVAILABLE\', \'NOT_AVAILABLE\')) not null, "categories" text[] not null, "user_id" int not null);',
    );

    this.addSql(
      'create table "transactions" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "status" text check ("status" in (\'RENTED\', \'BOUGHT\', \'SOLD\', \'LENT\', \'AVAILABLE\')) not null, "product_id" int not null, "user_id" int not null, "rental_start" timestamptz null, "rental_end" timestamptz null);',
    );

    this.addSql(
      'create table "user_profiles" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "address" varchar(255) not null, "phone_number" varchar(255) not null, "user_id" int not null);',
    );
    this.addSql(
      'alter table "user_profiles" add constraint "user_profiles_user_id_unique" unique ("user_id");',
    );

    this.addSql(
      'alter table "products" add constraint "products_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "transactions" add constraint "transactions_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "transactions" add constraint "transactions_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "user_profiles" add constraint "user_profiles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "products" drop constraint "products_user_id_foreign";',
    );

    this.addSql(
      'alter table "transactions" drop constraint "transactions_user_id_foreign";',
    );

    this.addSql(
      'alter table "user_profiles" drop constraint "user_profiles_user_id_foreign";',
    );

    this.addSql(
      'alter table "transactions" drop constraint "transactions_product_id_foreign";',
    );

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "products" cascade;');

    this.addSql('drop table if exists "transactions" cascade;');

    this.addSql('drop table if exists "user_profiles" cascade;');
  }
}
