CREATE TABLE IF NOT EXISTS "base" (
	"id" INTEGER NOT NULL UNIQUE,
	"basename" TEXT NOT NULL UNIQUE,
	"password" TEXT,
	"main_currency" INTEGER NOT NULL DEFAULT 0,
	"url" INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("id"),
	FOREIGN KEY ("main_currency") REFERENCES "currency"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE UNIQUE INDEX IF NOT EXISTS "base_index_0"
ON "base" ("url", "id");

CREATE TABLE IF NOT EXISTS "spending_category" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id"),
	FOREIGN KEY ("id") REFERENCES "spending"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "spending" (
	"id" INTEGER NOT NULL UNIQUE,
	"price" REAL NOT NULL,
	"description" TEXT,
	"decomposition" TEXT,
	"day" INTEGER,
	"month" INTEGER,
	"year" INTEGER NOT NULL,
	"baseId" INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY ("baseId") REFERENCES "base"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE UNIQUE INDEX IF NOT EXISTS "spending_index_0"
ON "spending" ("year", "month", "day", "baseId");

CREATE TABLE IF NOT EXISTS "accounts" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"score" REAL NOT NULL DEFAULT 0,
	"currency" INTEGER DEFAULT 1,
	"account_category" INTEGER,
	"baseId" INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY ("baseId") REFERENCES "base"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE UNIQUE INDEX IF NOT EXISTS "accounts_index_0"
ON "accounts" ("baseId", "id");

CREATE TABLE IF NOT EXISTS "currency" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id"),
	FOREIGN KEY ("id") REFERENCES "accounts"("currency")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- INSERT INTO "currency"("name") VALUES ("Usd");
-- INSERT INTO "currency"("name") VALUES ("Rub");
-- INSERT INTO "currency"("name") VALUES ("Eur");

CREATE TABLE IF NOT EXISTS "account_categories" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL UNIQUE,
	"categoryColor" TEXT NOT NULL,
	PRIMARY KEY("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "account_categories_index_0"
ON "account_categories" ("id");

CREATE TABLE IF NOT EXISTS "accounts__to__account_categories" (
	"id" INTEGER NOT NULL UNIQUE,
	"acc_id" INTEGER NOT NULL,
	"acc_c_id" INTEGER NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY ("acc_id") REFERENCES "accounts"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION,
	FOREIGN KEY ("acc_c_id") REFERENCES "account_categories"("id")
	ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE UNIQUE INDEX IF NOT EXISTS "accounts__to__account_categories_index_0"
ON "accounts__to__account_categories" ("acc_id", "acc_c_id");