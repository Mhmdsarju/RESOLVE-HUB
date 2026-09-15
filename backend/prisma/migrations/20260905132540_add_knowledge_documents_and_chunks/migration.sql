CREATE EXTENSION IF NOT EXISTS vector;

-- CreateEnum
CREATE TYPE "KnowledgeSourceType" AS ENUM ('INCIDENT', 'RUNBOOK', 'SOP', 'RCA', 'ARCHITECTURE');


-- CreateTable
CREATE TABLE "knowledge_documents" (
    "id" TEXT NOT NULL,
    "organizationId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "sourceType" "KnowledgeSourceType" NOT NULL,
    "sourceId" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knowledge_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_chunks" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "organizationId" UUID NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "embedding" vector(768),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knowledge_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "knowledge_documents_organizationId_idx" ON "knowledge_documents"("organizationId");

-- CreateIndex
CREATE INDEX "knowledge_documents_organizationId_sourceType_idx" ON "knowledge_documents"("organizationId", "sourceType");

-- CreateIndex
CREATE INDEX "knowledge_chunks_organizationId_idx" ON "knowledge_chunks"("organizationId");

-- CreateIndex
CREATE INDEX "knowledge_chunks_organizationId_documentId_idx" ON "knowledge_chunks"("organizationId", "documentId");

-- CreateIndex
CREATE UNIQUE INDEX "knowledge_chunks_documentId_chunkIndex_key" ON "knowledge_chunks"("documentId", "chunkIndex");

-- AddForeignKey
ALTER TABLE "knowledge_documents" ADD CONSTRAINT "knowledge_documents_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_chunks" ADD CONSTRAINT "knowledge_chunks_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "knowledge_documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_chunks" ADD CONSTRAINT "knowledge_chunks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
