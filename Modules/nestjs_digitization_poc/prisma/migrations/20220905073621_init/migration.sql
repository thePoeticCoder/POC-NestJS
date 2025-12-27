-- CreateTable
CREATE TABLE "Zoho" (
    "id" SERIAL NOT NULL,
    "recurringInvoiceProfileId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "deliveryCharge" TEXT NOT NULL,
    "finalAmount" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "taxAmount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "invoiceUrl" TEXT NOT NULL,
    "invoiceDate" TEXT NOT NULL,
    "kenkoDiscount" TEXT NOT NULL,
    "medpayDiscount" TEXT NOT NULL,
    "couponDiscount" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zoho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessedEvents" (
    "id" SERIAL NOT NULL,
    "logId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "event" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "eventData" JSONB NOT NULL,

    CONSTRAINT "ProcessedEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dataEntryQAPersons" (
    "id" TEXT NOT NULL,
    "role" TEXT,
    "userName" TEXT,
    "userEmail" TEXT,
    "password" TEXT,
    "ownerHubspotId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dataEntryQAPersons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organs" (
    "id" TEXT NOT NULL,
    "organName" TEXT NOT NULL,
    "organNormalIcon" TEXT NOT NULL,
    "organAbnormalIcon" TEXT NOT NULL,
    "organInactiveIcon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganMarkers" (
    "id" TEXT NOT NULL,
    "organId" TEXT NOT NULL,
    "markerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganMarkers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requiredMarkers" (
    "id" TEXT NOT NULL,
    "testTypeId" TEXT NOT NULL,
    "markerName" TEXT,
    "markerUnit" TEXT,
    "emergencyRangeLowerLimit" DOUBLE PRECISION NOT NULL,
    "emergencyRangeUpperLimit" DOUBLE PRECISION NOT NULL,
    "abnormalRangeLowerLimit" DOUBLE PRECISION NOT NULL,
    "abnormalRangeUpperLimit" DOUBLE PRECISION NOT NULL,
    "normalRangeLowerLimit" DOUBLE PRECISION NOT NULL,
    "normalRangeUpperLimit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requiredMarkers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testType" (
    "id" TEXT NOT NULL,
    "testType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tests" (
    "id" TEXT NOT NULL,
    "userHubspotId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "digitisationOwner" TEXT NOT NULL,
    "qaOwner" TEXT NOT NULL,
    "digitizationStatus" TEXT NOT NULL,
    "testTypeId" INTEGER NOT NULL,
    "reportSource" TEXT NOT NULL,
    "reportUrl" TEXT NOT NULL,
    "isSafeUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metaData" (
    "id" TEXT NOT NULL,
    "markerName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "metaData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testMetaData" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "metaDataId" TEXT NOT NULL,
    "markerValue" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testMetaData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userMarkerTable" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "markerId" TEXT NOT NULL,
    "comment" TEXT,
    "value" TEXT,
    "isValidMarker" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userMarkerTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dataEntryQAPersons_id_key" ON "dataEntryQAPersons"("id");

-- CreateIndex
CREATE UNIQUE INDEX "dataEntryQAPersons_userEmail_key" ON "dataEntryQAPersons"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "dataEntryQAPersons_ownerHubspotId_key" ON "dataEntryQAPersons"("ownerHubspotId");

-- CreateIndex
CREATE UNIQUE INDEX "organs_id_key" ON "organs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "organs_organName_key" ON "organs"("organName");

-- CreateIndex
CREATE UNIQUE INDEX "OrganMarkers_id_key" ON "OrganMarkers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "requiredMarkers_id_key" ON "requiredMarkers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "requiredMarkers_markerName_key" ON "requiredMarkers"("markerName");

-- CreateIndex
CREATE UNIQUE INDEX "testType_id_key" ON "testType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tests_id_key" ON "Tests"("id");

-- CreateIndex
CREATE UNIQUE INDEX "metaData_id_key" ON "metaData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "metaData_markerName_key" ON "metaData"("markerName");

-- CreateIndex
CREATE UNIQUE INDEX "testMetaData_id_key" ON "testMetaData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userMarkerTable_id_key" ON "userMarkerTable"("id");

-- AddForeignKey
ALTER TABLE "OrganMarkers" ADD CONSTRAINT "OrganMarkers_organId_fkey" FOREIGN KEY ("organId") REFERENCES "organs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganMarkers" ADD CONSTRAINT "OrganMarkers_markerId_fkey" FOREIGN KEY ("markerId") REFERENCES "requiredMarkers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requiredMarkers" ADD CONSTRAINT "requiredMarkers_testTypeId_fkey" FOREIGN KEY ("testTypeId") REFERENCES "testType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testMetaData" ADD CONSTRAINT "testMetaData_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testMetaData" ADD CONSTRAINT "testMetaData_metaDataId_fkey" FOREIGN KEY ("metaDataId") REFERENCES "metaData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userMarkerTable" ADD CONSTRAINT "userMarkerTable_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userMarkerTable" ADD CONSTRAINT "userMarkerTable_markerId_fkey" FOREIGN KEY ("markerId") REFERENCES "requiredMarkers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
