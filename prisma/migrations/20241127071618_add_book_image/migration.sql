-- CreateTable
CREATE TABLE "BookImage" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "imagePath" TEXT NOT NULL,

    CONSTRAINT "BookImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookImage" ADD CONSTRAINT "BookImage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
