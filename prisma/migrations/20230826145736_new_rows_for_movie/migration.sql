/*
  Warnings:

  - You are about to drop the column `description` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "description",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL;
