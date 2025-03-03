require('dotenv').config()
const path = require('path')
const winston = require('winston')
const fastify = require('fastify')({
    logger: true,
    // logger: logger2,
});

const autoload = require('fastify-autoload');


// fastify.register(require('@fastify/cors'), (instance) => {
//   return (req, callback) => {
//     const corsOptions = {
//       // This is NOT recommended for production as it enables reflection exploits
//       origin: true
//     };
//
//     // do not include CORS headers for requests from localhost
//     if (/^localhost$/m.test(req.headers.origin)) {
//       corsOptions.origin = false
//     }
//
//     // callback expects two parameters: error and options
//     callback(null, corsOptions)
//   }
// })
fastify.register(autoload, {
    dir: path.join(__dirname, './route'),
    options: { prefix: process.env.API }
});
const start = async () => {
    try {
        await fastify.listen(3000, process.env.H_IP);
        console.log(`start server on ${ fastify.server.address().port} success`);
        // console.log(fastify.routes);
    }
    catch (err) {
        console.log(err)
        process.exit(1);
    }
};

start();
