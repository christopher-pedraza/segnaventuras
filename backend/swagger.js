// var swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
// var outputFile = "./swagger.json";
// var endpointsFiles = ["./app.js"];
// var config = {};

// swaggerAutogen(outputFile, endpointsFiles, config);

const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
    info: {
        title: "API de Señaventura",
    },
    host: "localhost:3000",
};
const outputFile = "./swagger.json";
const routes = ["./app.js"];
const config = {};

swaggerAutogen(outputFile, routes, doc, config);
