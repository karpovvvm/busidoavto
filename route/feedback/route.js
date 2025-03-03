const db = require('../../handlers/feedback/handler.js')

module.exports= function (fastify, opts, next) {
    fastify.route({
    method: 'POST',
    url: '/feedback',
    schema: {
      body:{
        type:"object",
        properties:{
          FIO:                 {type: "string"},
          number:              {type: "integer"},
          mail:                {type: "string"},
          CarOthers:           {type: "string"},
          idCar:               {type: "integer"},
          carPrice:            {type: "string"},
          selectCity:          {type: "string"},
          selectCarType:       {type: "string"},
          selectDeliveryPrice: {type: "string"},
        },
        required: [ 'FIO', 'number', 'mail', 'CarOthers', 'idCar', 'carPrice', 'selectCity', 'selectCarType', 'selectDeliveryPrice' ]
      }
    },
    async handler (request, reply) {
      let data = await db.insertFeedback(request.body)
      if (data.statusCode !== 200){
        reply.status(400)
      }
      else{
        reply.status(200)
      }
      reply.send(data)
    }
  })

  next()
}
