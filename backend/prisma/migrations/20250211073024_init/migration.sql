-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('Draft', 'Published', 'Completed');

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile_thumbnail" BYTEA,
    "login_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_login_at" TIMESTAMP(3),
    "is_google_account" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "prefecture" (
    "prefecture_id" TEXT NOT NULL,
    "prefecture_name" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prefecture_pkey" PRIMARY KEY ("prefecture_id")
);

-- CreateTable
CREATE TABLE "area" (
    "area_id" TEXT NOT NULL,
    "area_name" TEXT NOT NULL,
    "prefecture_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("area_id")
);

-- CreateTable
CREATE TABLE "concept" (
    "concept_id" TEXT NOT NULL,
    "concept_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "concept_pkey" PRIMARY KEY ("concept_id")
);

-- CreateTable
CREATE TABLE "parent_plan" (
    "parent_plan_id" TEXT NOT NULL,
    "start_area_id" TEXT NOT NULL,
    "end_area_id" TEXT NOT NULL,
    "concept_id" TEXT NOT NULL,
    "plan_name" VARCHAR(255) NOT NULL,
    "plan_thumbnail" BYTEA,
    "start_date_time" TIMESTAMP(3) NOT NULL,
    "end_date_time" TIMESTAMP(3) NOT NULL,
    "purpose" VARCHAR(255),
    "status" "PlanStatus" NOT NULL DEFAULT 'Draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parent_plan_pkey" PRIMARY KEY ("parent_plan_id")
);

-- CreateTable
CREATE TABLE "child_plan" (
    "child_plan_id" TEXT NOT NULL,
    "parent_plan_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "location_name" TEXT NOT NULL,
    "check_in_time" TIMESTAMP(3),
    "check_out_time" TIMESTAMP(3),
    "memo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "child_plan_pkey" PRIMARY KEY ("child_plan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "prefecture_prefecture_name_key" ON "prefecture"("prefecture_name");

-- CreateIndex
CREATE UNIQUE INDEX "area_prefecture_id_area_name_key" ON "area"("prefecture_id", "area_name");

-- CreateIndex
CREATE UNIQUE INDEX "concept_concept_name_key" ON "concept"("concept_name");

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_prefecture_id_fkey" FOREIGN KEY ("prefecture_id") REFERENCES "prefecture"("prefecture_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_plan" ADD CONSTRAINT "parent_plan_start_area_id_fkey" FOREIGN KEY ("start_area_id") REFERENCES "area"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_plan" ADD CONSTRAINT "parent_plan_end_area_id_fkey" FOREIGN KEY ("end_area_id") REFERENCES "area"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parent_plan" ADD CONSTRAINT "parent_plan_concept_id_fkey" FOREIGN KEY ("concept_id") REFERENCES "concept"("concept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_plan" ADD CONSTRAINT "child_plan_parent_plan_id_fkey" FOREIGN KEY ("parent_plan_id") REFERENCES "parent_plan"("parent_plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;
