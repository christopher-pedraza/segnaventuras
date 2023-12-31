const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getAll(req, res, next) {
	try {
		const resultado = await prisma.isla.findMany()
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

async function get(req, res, next) {
	try {
		const resultado = await prisma.isla.findUnique({
			where: {
				id_isla: Number(req.params.id)
			}
		})
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

async function getWithPalabras(req, res, next) {
	try {
		const resultado = await prisma.isla.findMany({
			select: {
				id_isla: true,
				nombre: true,
				palabra: {
					select: {
						id_palabra: true,
						palabra: true,
						id_video_segna: true,
						url_icono: true,
						escaneable: true,
					},
				},
			},
			where: {
				id_isla: Number(req.params.id)
			}
		})
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

async function getAllWithPalabras(req, res, next) {
	try {
		const resultado = await prisma.isla.findMany({
			select: {
				id_isla: true,
				nombre: true,
				palabra: {
					select: {
						id_palabra: true,
						palabra: true,
						id_video_segna: true,
						url_icono: true,
						escaneable: true,
					},
				},
			},
		})
		const response = { categorias: resultado };
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json({ "message": `${err}` });
	}

}

async function add(req, res, next) {
	body = req.body
	try {
		const resultado = await prisma.isla.create({
			data: {
				nombre: body.nombre,
				modelo_general: null,
				modelo_especifico: null
			}
		})
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

async function remove(req, res, next) {
	try {
		const resultado = await prisma.isla.delete({
			where: { id_isla: Number(req.params.id) }
		})
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

async function update(req, res, next) {
	body = req.body
	try {
		const resultado = await prisma.isla.update({
			where: { id_isla: Number(req.params.id) },
			data: {
				nombre: body.nombre,
				modelo_general: body.modelo_general,
				modelo_especifico: body.modelo_especifico
			}
		})
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

module.exports = {
	getAll,
	get,
	getWithPalabras,
	getAllWithPalabras,
	add,
	remove,
	update
}
