const db = require('../../handlers/car/handler.js');
module.exports = function (fastify, opts, next) {
    fastify.route({
      method: 'POST',
      url:    '/nameTable',
      schema: {
        properties: {
          query: {
            nameTable:        { type: 'string' },
            namePhotosTable:  { type: 'string' },
          },
        },
      },
      async handler(request, reply) {
        let data = await db.nameTableH(request.body);
        if (data.statusCode !== 200) {
          reply.status(400);
        }
        else {
          reply.status(200);
        }
        reply.send(data);
      },
    });

    fastify.route({
        method: 'POST',
        url:    '/get-one',
        schema: {
            body: {
                type:       'object',
                properties: {
                    id: { type: 'integer' },
                },
            },
        },
        async handler(request, reply) {
            let data = await db.carId(request.body);
            if (data.statusCode !== 200) {
                reply.status(400);
            }
            else {
                reply.status(200);
            }
            reply.send(data);
        },
    });

    fastify.route({
        method: 'GET',
        url:    '/get-all-car',
        schema: {
            properties: {
                query: {
                    page:            { type: 'integer' },
                    manufacturer:    { type: 'string' },
                    modelGroup:      { type: 'string' },
                    formYearMin:     { type: 'string' },
                    formYearMax:     { type: 'string' },
                    color:           { type: 'string' },
                    transmission:    { type: 'string' },
                    fuel:            { type: 'string' },
                    minPrice:        { type: 'integer' },
                    maxPrice:        { type: 'integer' },
                    minMileage:      { type: 'integer' },
                    maxMileage:      { type: 'integer' },
                    minDisplacement: { type: 'integer' },
                    maxDisplacement: { type: 'integer' },
                },
            },
            required:   [ 'page' ],
        },
        async handler(request, reply) {
            let data = await db.getAll(request.query);
            reply.status(data.statusCode);
            reply.send(data);
        },
    });

    fastify.route({
        method: 'POST',
        url:    '/get-filter-manufacturer',
        schema: {
            // body: {
            //     type:       'object',
            //     properties: {
            //         manufacturer: { type: 'string' },
            //     },
            // },
        },
        async handler(request, reply) {
            let data = await db.carManufacturer(request.body);
            if (data.statusCode !== 200) {
                reply.status(400);
            }
            else {
                reply.status(200);
            }
            reply.send(data);
        },
    });

  fastify.route({
    method: 'POST',
    url: '/get-filter-model',
    schema: {
      body: {
        type: 'object',
        properties: {
          manufacturer: { type: ['string', 'null'] }
        }
      }
    },
    async handler(request, reply) {
      let data = {};
      data = await db.carModel(request.body);
      if (data.statusCode !== 200) {
        reply.status(400);
      } else {
        reply.status(200);
      }
      reply.send(data);
    },
  });


  fastify.route({
        method: 'POST',
        url:    '/get-filter-formYear',
        schema: {
            body: {
                type:       'array',
                properties: {
                    formYear: { type: 'string' },
                },
            },
        },
        async handler(request, reply) {
            let data = await db.carFormYear(request.body);
            if (data.statusCode !== 200) {
                reply.status(400);
            }
            else {
                reply.status(200);
            }
            reply.send(data);
        },
    });

    fastify.route({
        method: 'POST',
        url:    '/get-filter-color',
        schema: {
            body: {
                type:       'array',
                properties: {
                    color: { type: 'string' },
                },
            },
        },
        async handler(request, reply) {
            let data = await db.carColor(request.body);
            if (data.statusCode !== 200) {
                reply.status(400);
            }
            else {
                reply.status(200);
            }
            reply.send(data);
        },
    });

    fastify.route({
        method: 'POST',
        url:    '/get-filter-transmission',
        schema: {
            body: {
                type:       'array',
                properties: {
                    transmission: { type: 'string' },
                },
            },
        },
        async handler(request, reply) {
            let data = await db.carTransmission(request.body);
            if (data.statusCode !== 200) {
                reply.status(400);
            }
            else {
                reply.status(200);
            }
            reply.send(data);
        },
    });

    fastify.route({
        method: 'POST',
        url:    '/get-filter-fuel',
        schema: {
            body: {
                type:       'array',
                properties: {
                    fuel: { type: 'string' },
                },
            },
        },
        async handler(request, reply) {
            let data = await db.carFuel(request.body);
            if (data.statusCode !== 200) {
                reply.status(400);
            }
            else {
                reply.status(200);
            }
            reply.send(data);
        },
    });

    fastify.route({
      method: 'POST',
      url:    '/get-filter-price',
      schema: {
        body: {
          type:       'array',
          properties: {
            price: { type: 'string' },
          },
        },
      },
      async handler(request, reply) {
        let data = await db.carPrice(request.body);
        if (data.statusCode !== 200) {
          reply.status(400);
        }
        else {
          reply.status(200);
        }
        reply.send(data);
      },
    });

    fastify.route({
      method: 'POST',
      url:    '/get-filter-mileage',
      schema: {
        body: {
          type:       'array',
          properties: {
            mileage: { type: 'string' },
          },
        },
      },
      async handler(request, reply) {
        let data = await db.carMileage(request.body);
        if (data.statusCode !== 200) {
          reply.status(400);
        }
        else {
          reply.status(200);
        }
        reply.send(data);
      },
    });

    fastify.route({
      method: 'POST',
      url:    '/get-filter-displacement',
      schema: {
        body: {
          type:       'array',
          properties: {
            displacement: { type: 'string' },
          },
        },
      },
      async handler(request, reply) {
        let data = await db.carDisplacement(request.body);
        if (data.statusCode !== 200) {
          reply.status(400);
        }
        else {
          reply.status(200);
        }
        reply.send(data);
      },
    });

    fastify.route({
        method: 'GET',
        url:    '/:id',
        schema: {
            params: {
                type:       'object',
                properties: {
                    id: { type: 'integer' },
                },
            },
        },
        async handler(request, reply) {
            let data = await db.carId(request.params);
            if (data.statusCode !== 200) {
                reply.status(400);
            }
            else {
                reply.status(200);
            }
            reply.send(data);
        },
    });

  fastify.route({
    method: 'POST',
    url:    '/get-similar-manufacturer-cars',
    schema: {
      body: {
        type:       'object',
        properties: {
          manufacturer: { type: 'string' },
          modelGroup:   { type: 'string' },
          id:           { type: 'integer' },
        },
      },
    },
    async handler(request, reply) {
      let data = await db.similarManufacturerCars(request.body);
      if (data.statusCode !== 200) {
        reply.status(400);
      }
      else {
        reply.status(200);
      }
      reply.send(data);
    },
  });

  fastify.route({
    method: 'POST',
    url:    '/get-similar-price-cars',
    schema: {
      body: {
        type:       'object',
        properties: {
          manufacturer: { type: 'string' },
          modelGroup:   { type: 'string' },
          price:        { type: 'string' },
          id:           { type: 'integer' },
        },
      },
    },
    async handler(request, reply) {
      let data = await db.similarPriceCars(request.body);
      if (data.statusCode !== 200) {
        reply.status(400);
      }
      else {
        reply.status(200);
      }
      reply.send(data);
    },
  });

    next();
};
