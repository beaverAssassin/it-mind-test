-- CreateTable
CREATE TABLE "iso4217" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL,
    "active_country" BOOLEAN NOT NULL,
    "active_currency" BOOLEAN NOT NULL,

    CONSTRAINT "iso4217_pkey" PRIMARY KEY ("id")
);
