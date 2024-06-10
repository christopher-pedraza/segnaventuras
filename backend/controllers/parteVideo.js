const express = require("express");
const router = express.Router();
router.use(express.json());

const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    /*
    #swagger.tags = ['Parte Video']
    #swagger.description = 'Endpoint para obtener todas las partes de video cuestionario.'
    #swagger.responses[200] = {
        description: 'Partes de video cuestionario obtenidas correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id_parte_video_cuestionario: { type: 'integer' },
                            id_nivel: { type: 'integer' },
                            url_video: { type: 'string' },
                            indice: { type: 'integer' },
                            nombre: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al obtener las partes de video cuestionario.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    try {
        const resultado = await prisma.parte_video_cuestionario.findMany();
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.get("/byNivel/:id", async (req, res) => {
    /*
    #swagger.tags = ['Parte Video']
    #swagger.description = 'Endpoint para obtener todas las partes de video cuestionario por nivel.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID del nivel.',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Partes de video cuestionario obtenidas correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id_parte_video_cuestionario: { type: 'integer' },
                            id_nivel: { type: 'integer' },
                            url_video: { type: 'string' },
                            indice: { type: 'integer' },
                            nombre: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al obtener las partes de video cuestionario.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    try {
        const { id } = req.params;
        const resultado = await prisma.parte_video_cuestionario.findMany({
            where: {
                id_nivel: parseInt(id),
            },
        });
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.get("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Parte Video']
    #swagger.description = 'Endpoint para obtener una parte de video cuestionario por su ID.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la parte de video cuestionario.',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'Parte de video cuestionario obtenida correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_parte_video_cuestionario: { type: 'integer' },
                        id_nivel: { type: 'integer' },
                        url_video: { type: 'string' },
                        indice: { type: 'integer' },
                        nombre: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al obtener la parte de video cuestionario.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    try {
        const { id } = req.params;
        const resultado = await prisma.parte_video_cuestionario.findUnique({
            where: {
                id_parte_video_cuestionario: parseInt(id),
            },
        });
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

const extractVideoID = (url) => {
    const regex =
        /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
    const matches = url.match(regex);
    return matches ? matches[5] : url;
};

router.post("/", async (req, res) => {
    /*
    #swagger.tags = ['Parte Video']
    #swagger.description = 'Endpoint para crear una nueva parte de video cuestionario.'
    #swagger.requestBody = {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_nivel: { type: 'integer' },
                        url_video: { type: 'string' },
                        nombre: { type: 'string' }
                    },
                    required: ['id_nivel', 'url_video', 'nombre']
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Parte de video cuestionario creada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_parte_video_cuestionario: { type: 'integer' },
                        id_nivel: { type: 'integer' },
                        url_video: { type: 'string' },
                        indice: { type: 'integer' },
                        nombre: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al crear la parte de video cuestionario.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    try {
        const { id_nivel, url_video, nombre } = req.body;

        // Obtener el id del video del url.
        // Si se recibe en el formato:
        // "https://www.youtube.com/watch?v=hDRTRgXGklU", "hDRTRgXGklU" es el id
        // del video
        // Si se recibe en el formato:
        // "https://www.youtube.com/embed/hDRTRgXGklU", "hDRTRgXGklU" es el id
        // del video
        // Si se recibe en el formato:
        // "https://youtu.be/hDRTRgXGklU", "hDRTRgXGklU" es el id del video
        // Si se recibe en el formato:
        // "hDRTRgXGklU", "hDRTRgXGklU" es el id del video
        // Si se recibe en el formato:
        // "https://www.youtube.com/watch?v=hDRTRgXGklU&feature=youtu.be",
        // "hDRTRgXGklU" es el id del video
        // Si se recibe en el formato:
        // "https://youtu.be/hDRTRgXGklU?feature=shared", "hDRTRgXGklU" es el
        // id del video
        const videoID = extractVideoID(url_video);

        // Obtener el índice más alto para el id_nivel dado
        const maxIndiceRecord = await prisma.parte_video_cuestionario.findFirst(
            {
                where: {
                    id_nivel: parseInt(id_nivel),
                },
                // Al ordenarlos de manera descendente, el primer registro será el que tenga el índice más alto
                orderBy: {
                    indice: "desc",
                },
            }
        );

        // Si no existe ningun registro, el índice será 1, de lo contrario, se
        // incrementa en 1 el índice del registro con el índice más alto
        // encontrado
        const indice = maxIndiceRecord ? maxIndiceRecord.indice + 1 : 0;

        const resultado = await prisma.parte_video_cuestionario.create({
            data: {
                id_nivel: parseInt(id_nivel),
                url_video: videoID,
                indice: indice,
                nombre: nombre,
            },
        });
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.delete("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Parte Video']
    #swagger.description = 'Endpoint para eliminar una parte de video cuestionario.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la parte de video cuestionario a eliminar.',
        required: true,
        type: 'integer'
    }
    #swagger.requestBody = {
    required: false,
    content: {}
    }
    #swagger.responses[200] = {
        description: 'Parte de video cuestionario eliminada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_parte_video_cuestionario: { type: 'integer' },
                        id_nivel: { type: 'integer' },
                        url_video: { type: 'string' },
                        indice: { type: 'integer' },
                        nombre: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al eliminar la parte de video cuestionario.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    try {
        const { id } = req.params;

        // Obtener el registro que se va a eliminar para obtener su índice. Esto
        // servira para poder luego actualizar todos los registros con un índice
        // mayor al índice del registro eliminado
        const recordToDelete = await prisma.parte_video_cuestionario.findUnique(
            {
                where: {
                    id_parte_video_cuestionario: parseInt(id),
                },
            }
        );

        // Elimnar el registro
        const resultado = await prisma.parte_video_cuestionario.delete({
            where: {
                id_parte_video_cuestionario: parseInt(id),
            },
        });

        // Se obtienen todos los registros con un índice mayor al índice del
        // registro eliminado para poder actualizarlos
        const recordsToUpdate = await prisma.parte_video_cuestionario.findMany({
            where: {
                indice: {
                    // gt = greater than
                    gt: recordToDelete.indice,
                },
            },
        });

        // Actualizar los registros con un índice mayor al índice del registro
        // reduciendo en 1 su índice
        const updatePromises = recordsToUpdate.map((record) =>
            prisma.parte_video_cuestionario.update({
                where: {
                    id_parte_video_cuestionario:
                        record.id_parte_video_cuestionario,
                },
                data: {
                    indice: record.indice - 1,
                },
            })
        );
        await Promise.all(updatePromises);

        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.put("/cambiarIndice/:id", async (req, res) => {
    /*
    #swagger.tags = ['Parte Video']
    #swagger.description = 'Endpoint para cambiar el índice de una parte de video cuestionario.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la parte de video cuestionario cuyo índice se cambiará.',
        required: true,
        type: 'integer'
    }
    #swagger.requestBody = {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        direccion: { type: 'string' },
                        id_nivel: { type: 'integer' }
                    },
                    required: ['direccion', 'id_nivel']
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Índices actualizados correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Parte de video cuestionario o parte de intercambio no encontrada.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al cambiar el índice de la parte de video cuestionario.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    try {
        const { id } = req.params;
        const { direccion, id_nivel } = req.body;

        // Se obtiene el registro que se va a cambiar de posicion o indice
        const part = await prisma.parte_video_cuestionario.findUnique({
            where: { id_parte_video_cuestionario: Number(id) },
        });
        if (!part) {
            return res.status(404).json({ message: "Part not found" });
        }

        // Obtenemos el registro con el que se va a intercambiar de posicion.
        // Este puede ser el registro con un indice con 1 mas o 1 menos que el
        // indice del registro que se va a cambiar de posicion. Esto dependera
        // de la direccion en la que se quiere cambiar el indice
        const swapPart = await prisma.parte_video_cuestionario.findFirst({
            where: {
                AND: [
                    {
                        indice:
                            direccion === "up"
                                ? part.indice - 1
                                : part.indice + 1,
                    },
                    { id_nivel: id_nivel },
                ],
            },
        });
        if (!swapPart) {
            return res.status(404).json({ message: "Swap part not found" });
        }

        // Intercambiamos los indices de los registros
        const temp = part.indice;
        part.indice = swapPart.indice;
        swapPart.indice = temp;

        // Se actualizan los registros con los nuevos indices
        await prisma.parte_video_cuestionario.update({
            where: {
                id_parte_video_cuestionario: part.id_parte_video_cuestionario,
            },
            data: { indice: part.indice },
        });
        await prisma.parte_video_cuestionario.update({
            where: {
                id_parte_video_cuestionario:
                    swapPart.id_parte_video_cuestionario,
            },
            data: { indice: swapPart.indice },
        });
        res.json({ message: "Indices updated successfully" });
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.put("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Parte Video']
    #swagger.description = 'Endpoint para editar una parte de video cuestionario.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la parte de video cuestionario a editar.',
        required: true,
        type: 'integer'
    }
    #swagger.requestBody = {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        url_video: { type: 'string' },
                        nombre: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Parte de video cuestionario editada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_parte_video_cuestionario: { type: 'integer' },
                        id_nivel: { type: 'integer' },
                        url_video: { type: 'string' },
                        indice: { type: 'integer' },
                        nombre: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al editar la parte de video cuestionario.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    try {
        const { id } = req.params;
        const { url_video, nombre } = req.body;

        // Obtener el id del video del url.
        // Si se recibe en el formato:
        // "https://www.youtube.com/watch?v=hDRTRgXGklU", "hDRTRgXGklU" es el id
        // del video
        // Si se recibe en el formato:
        // "https://www.youtube.com/embed/hDRTRgXGklU", "hDRTRgXGklU" es el id
        // del video
        // Si se recibe en el formato:
        // "https://youtu.be/hDRTRgXGklU", "hDRTRgXGklU" es el id del video
        // Si se recibe en el formato:
        // "hDRTRgXGklU", "hDRTRgXGklU" es el id del video
        // Si se recibe en el formato:
        // "https://www.youtube.com/watch?v=hDRTRgXGklU&feature=youtu.be",
        // "hDRTRgXGklU" es el id del video
        // Si se recibe en el formato:
        // "https://youtu.be/hDRTRgXGklU?feature=shared", "hDRTRgXGklU" es el
        // id del video
        const videoID = extractVideoID(url_video);

        const resultado = await prisma.parte_video_cuestionario.update({
            where: {
                id_parte_video_cuestionario: parseInt(id),
            },
            data: {
                url_video: videoID,
                nombre: nombre,
            },
        });
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

module.exports = router;

/*
INSERT INTO public.parte_video_cuestionario(
	id_nivel, url_video, indice, nombre)
	VALUES (1, 'url', 0, 'nombre');

INSERT INTO public.parte_video_cuestionario(
	id_nivel, url_video, indice, nombre)
	VALUES (1, 'url', 1, 'nombre');
	
INSERT INTO public.parte_video_cuestionario(
	id_nivel, url_video, indice, nombre)
	VALUES (1, 'url', 2, 'nombre');
	
INSERT INTO public.parte_video_cuestionario(
	id_nivel, url_video, indice, nombre)
	VALUES (1, 'url', 3, 'nombre');
*/
