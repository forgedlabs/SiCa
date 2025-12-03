-- CreateTable
CREATE TABLE "AuthAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "attemptedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSuccessful" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "guestRelationship" TEXT,
    "rsvpStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "mealPreference" TEXT,
    "dietaryNotes" TEXT,
    "partyId" TEXT,
    "tableId" TEXT,
    "emailConfirmationSent" BOOLEAN NOT NULL DEFAULT false,
    "lastEmailSentAt" DATETIME,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Guest_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Guest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guest" ("dietaryNotes", "email", "firstName", "id", "lastName", "mealPreference", "partyId", "phone", "rsvpStatus", "tableId", "userId") SELECT "dietaryNotes", "email", "firstName", "id", "lastName", "mealPreference", "partyId", "phone", "rsvpStatus", "tableId", "userId" FROM "Guest";
DROP TABLE "Guest";
ALTER TABLE "new_Guest" RENAME TO "Guest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
