const db = require('../../handlers/bot/handler.js')

module.exports= function (fastify, opts, next) {
  fastify.route({
    method: 'POST',
    url: '/send-feedback',
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
      let data = await db.getFeedback(request.body)
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
