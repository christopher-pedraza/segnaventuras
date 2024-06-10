const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const sha512 = require("js-sha512");

const prisma = new PrismaClient();
const TOKEN_SECRET = process.env.TOKEN_SECRET;

async function getAll(req, res, next) {
  try {
    const resultado = await prisma.miembro.findMany();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
}

async function get(req, res, next) {
  try {
    const resultado = await prisma.miembro.findUnique({
      where: { id_miembro: Number(req.params.id) },
    });
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
}

async function add(req, res, next) {
  const { usuario, contrasegna, es_administrador } = req.body;
  try {
    const resultado = await prisma.miembro.create({
      data: {
        usuario: usuario.toLowerCase(),
        contrasegna: sha512(contrasegna),
        es_administrador: es_administrador,
      },
    });
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
}

async function remove(req, res, next) {
  const { id } = req.body;
  try {
    const resultado = await prisma.miembro.delete({
      where: { id_miembro: Number(id) },
    });
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
}

async function update(req, res, next) {
  const { usuario, contrasegna, es_administrador } = req.body;
  const { id } = req.params;

  try {
    const resultado = await prisma.miembro.update({
      where: { id_miembro: Number(id) },
      data: {
        usuario: usuario.toLowerCase(),
        contrasegna: sha512(contrasegna),
        es_administrador: es_administrador,
      },
    });
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
}

async function login(req, res, next) {
  const { usuario, contrasegna } = req.body;
  try {
    const resultado = await prisma.miembro.findMany({
      where: {
        AND: {
          usuario: usuario.toLowerCase(),
          contrasegna: sha512(contrasegna),
        },
      },
    });
    if (resultado.length != 0) {
      res.status(200).json(true);
    } else {
      res.status(403).json(false);
    }
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
}

async function loginWeb(req, res, next) {
  const { usuario, contrasegna } = req.body;
  try {
    const resultado = await prisma.miembro.findMany({
      where: {
        AND: {
          usuario: usuario.toLowerCase(),
          contrasegna: sha512(contrasegna),
          es_administrador: { equals: true },
        },
      },
    });

    if (resultado.length != 0) {
      console.log(TOKEN_SECRET);
      const token = jwt.sign({ usuario: usuario }, TOKEN_SECRET, {
        expiresIn: "1d",
      });
      console.log("Token: ", token);
      res.status(200).json({ autenticado: true, token: token });
    } else {
      res.status(403).json({ autenticado: false, token: "" });
    }
  } catch (err) {
    res.status(500).json({ autenticado: false, token: "", message: `${err}` });
  }
}

async function authToken(req, res, next) {
  const { token } = req.body;

  try {
    var decoded = jwt.verify(token, TOKEN_SECRET);
    res.status(200).json({ autenticado: true, usuario: decoded.usuario });
  } catch (err) {
    res.status(403).json({ autenticado: false, usuario: "" });
  }
}

module.exports = {
  getAll,
  get,
  add,
  remove,
  update,
  login,
  loginWeb,
  authToken,
};
