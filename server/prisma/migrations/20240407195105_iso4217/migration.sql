-- AlterTable
ALTER TABLE "iso4217" ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "currency" DROP NOT NULL,
ALTER COLUMN "currency_code" DROP NOT NULL;