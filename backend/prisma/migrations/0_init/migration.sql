-- CreateTable
CREATE TABLE "miembro" (
    "id_miembro" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "contrasegna" TEXT NOT NULL,
    "es_administrador" BOOLEAN NOT NULL,

    CONSTRAINT "miembro_pkey" PRIMARY KEY ("id_miembro")
);

-- CreateTable
CREATE TABLE "isla" (
    "id_isla" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "modelo_general" BYTEA,
    "modelo_especifico" BYTEA,

    CONSTRAINT "isla_pkey" PRIMARY KEY ("id_isla")
);

-- CreateTable
CREATE TABLE "nivel" (
    "id_nivel" SERIAL NOT NULL,
    "id_isla" INTEGER,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "nivel_pkey" PRIMARY KEY ("id_nivel")
);

-- CreateTable
CREATE TABLE "progreso_islas" (
    "id_miembro" INTEGER NOT NULL,
    "id_isla" INTEGER NOT NULL,

    CONSTRAINT "progreso_islas_pkey" PRIMARY KEY ("id_miembro","id_isla")
);

-- CreateTable
CREATE TABLE "progreso_nivel" (
    "id_miembro" INTEGER NOT NULL,
    "id_nivel" INTEGER NOT NULL,
    "completada_videos_cuestionario" BOOLEAN,
    "completada_quiz" BOOLEAN,

    CONSTRAINT "progreso_nivel_pkey" PRIMARY KEY ("id_miembro","id_nivel")
);

-- CreateTable
CREATE TABLE "palabra" (
    "id_palabra" SERIAL NOT NULL,
    "id_nivel" INTEGER NOT NULL,
    "palabra" TEXT NOT NULL,
    "id_video_segna" TEXT NOT NULL,
    "url_icono" TEXT NOT NULL,

    CONSTRAINT "palabra_pkey" PRIMARY KEY ("id_palabra")
);

-- CreateTable
CREATE TABLE "parte_video_cuestionario" (
    "id_parte_video_cuestionario" SERIAL NOT NULL,
    "id_nivel" INTEGER NOT NULL,
    "url_video" TEXT NOT NULL,
    "indice" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "parte_video_cuestionario_pkey" PRIMARY KEY ("id_parte_video_cuestionario")
);

-- CreateTable
CREATE TABLE "preguntas_video_cuestionario" (
    "id_preguntas_video_cuestionario" SERIAL NOT NULL,
    "id_parte_video_cuestionario" INTEGER NOT NULL,
    "pregunta" TEXT NOT NULL,
    "indice" INTEGER NOT NULL,

    CONSTRAINT "preguntas_video_cuestionario_pkey" PRIMARY KEY ("id_preguntas_video_cuestionario")
);

-- CreateTable
CREATE TABLE "respuestas_video_cuestionario" (
    "id_respuestas_video_cuestionario" SERIAL NOT NULL,
    "id_preguntas_video_cuestionario" INTEGER NOT NULL,
    "respuesta" TEXT NOT NULL,
    "es_correcta" BOOLEAN NOT NULL,

    CONSTRAINT "respuestas_video_cuestionario_pkey" PRIMARY KEY ("id_respuestas_video_cuestionario")
);

-- AddForeignKey
ALTER TABLE "nivel" ADD CONSTRAINT "nivel_id_isla_fkey" FOREIGN KEY ("id_isla") REFERENCES "isla"("id_isla") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progreso_islas" ADD CONSTRAINT "progreso_islas_id_miembro_fkey" FOREIGN KEY ("id_miembro") REFERENCES "miembro"("id_miembro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progreso_islas" ADD CONSTRAINT "progreso_islas_id_isla_fkey" FOREIGN KEY ("id_isla") REFERENCES "isla"("id_isla") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progreso_nivel" ADD CONSTRAINT "progreso_nivel_id_miembro_fkey" FOREIGN KEY ("id_miembro") REFERENCES "miembro"("id_miembro") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "progreso_nivel" ADD CONSTRAINT "progreso_nivel_id_nivel_fkey" FOREIGN KEY ("id_nivel") REFERENCES "nivel"("id_nivel") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "palabra" ADD CONSTRAINT "palabra_id_nivel_fkey" FOREIGN KEY ("id_nivel") REFERENCES "nivel"("id_nivel") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "parte_video_cuestionario" ADD CONSTRAINT "parte_video_cuestionario_id_nivel_fkey" FOREIGN KEY ("id_nivel") REFERENCES "nivel"("id_nivel") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "preguntas_video_cuestionario" ADD CONSTRAINT "preguntas_video_cuestionario_id_parte_video_cuestionario_fkey" FOREIGN KEY ("id_parte_video_cuestionario") REFERENCES "parte_video_cuestionario"("id_parte_video_cuestionario") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "respuestas_video_cuestionario" ADD CONSTRAINT "respuestas_video_cuestionario_id_preguntas_video_cuestiona_fkey" FOREIGN KEY ("id_preguntas_video_cuestionario") REFERENCES "preguntas_video_cuestionario"("id_preguntas_video_cuestionario") ON DELETE CASCADE ON UPDATE NO ACTION;

