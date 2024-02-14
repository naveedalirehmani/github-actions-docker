/*
  Warnings:

  - The primary key for the `Sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Sessions` table. All the data in the column will be lost.
  - You are about to alter the column `sessionID` on the `Sessions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Sessions` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `sessionID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`sessionID`);
