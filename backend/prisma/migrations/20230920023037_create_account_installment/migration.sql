/*
  Warnings:

  - You are about to drop the column `date` on the `accounts_receivable` table. All the data in the column will be lost.
  - Added the required column `installment` to the `accounts_receivable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts_receivable" DROP COLUMN "date",
ADD COLUMN     "installment" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "accounts_installments" (
    "id" TEXT NOT NULL,
    "installment" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "remains" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "due_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_receivable_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "accounts_installments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts_installments" ADD CONSTRAINT "accounts_installments_account_receivable_id_fkey" FOREIGN KEY ("account_receivable_id") REFERENCES "accounts_receivable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
