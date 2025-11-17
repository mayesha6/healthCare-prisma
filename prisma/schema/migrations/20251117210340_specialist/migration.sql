-- CreateTable
CREATE TABLE "specialists" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "specialists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_specialists" (
    "specialistsId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "doctor_specialists_pkey" PRIMARY KEY ("specialistsId","doctorId")
);

-- AddForeignKey
ALTER TABLE "doctor_specialists" ADD CONSTRAINT "doctor_specialists_specialistsId_fkey" FOREIGN KEY ("specialistsId") REFERENCES "specialists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specialists" ADD CONSTRAINT "doctor_specialists_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
