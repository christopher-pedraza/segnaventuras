const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getAllCategorias(req, res, next) {
	try {
		const resultado = await prisma.isla.findMany()
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

async function getCategoria(req, res, next) {
	try {
		const resultado = await prisma.isla.findUnique({
			where: {
				id_isla: Number(req.params.id_isla)
			}
		})
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

async function addCategoria(req, res, next) {
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

async function removeCategoria(req, res, next) {
	try {
		const resultado = await prisma.isla.delete({
			where: { id_isla: Number(req.params.id_isla) }
		})
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

async function updateCategoria(req, res, next) {
	body = req.body
	try {
		const resultado = await prisma.isla.update({
			where: { id_isla: Number(req.params.id_isla) },
			data: {
				nombre: body.nombre
			}
		})
		res.status(200).json(resultado)
	}
	catch (err) {
		res.status(500).json({ "message": `${err}` })
	}
}

module.exports = {
	getAllCategorias,
	getCategoria,
	addCategoria,
	removeCategoria,
	updateCategoria
}