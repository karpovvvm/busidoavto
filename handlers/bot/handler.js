const TelegramBot = require('node-telegram-bot-api');

const { pool } = require('../../services/libs/pgpool');

const bot = new TelegramBot(process.env.TG_TOKEN, { polling: true });

async function getFeedback(object) {
  let data = {
    statusCode: 400,
    message: "error"
  }
  let text = ''
  const client = await pool.connect()
  let FIO = object.FIO
  let number = object.number
  let mail = object.mail
  let CarOthers = object.CarOthers
  let idCar = object.idCar
  let carPrice = object.carPrice
  let selectCity = object.selectCity
  let selectCarType = object.selectCarType
  let selectDeliveryPrice = object.selectDeliveryPrice
  try{
    let result = await client.query(`SELECT "FIO", "number", "mail", "CarOthers", "idCar", "carPrice", "selectCity", "selectCarType", "selectDeliveryPrice"
                   FROM feedback
                   WHERE "FIO" = $1
                     AND "number" = $2
                     AND "mail" = $3
                     AND "CarOthers" = $4
                     AND "idCar" = $5
                     AND "carPrice" = $6
                     AND "selectCity" = $7
                     AND "selectCarType" = $8
                     AND "selectDeliveryPrice" = $9`,
                    [ FIO, number, mail, CarOthers, idCar, carPrice, selectCity, selectCarType, selectDeliveryPrice ])
    if (result.rowCount > 0){
      data = {
        statusCode: 200,
        message: "success",
      }
      text += `Заявка от ${ FIO }
Номер: ${ number }
Почта: ${ mail }
Комментарий от клиента: ${ CarOthers }
ID машины: ${ idCar }
Цена авто: ${ carPrice }
Город доставки: ${ selectCity }
Тип авто: ${ selectCarType }
Цена доставки: ${ selectDeliveryPrice }
Ссылка на авто encar http://www.encar.com/dc/dc_cardetailview.do?pageid=fc_carsearch&listAdvType=normal&carid=${ idCar }`
    }
  }catch (e) {
    console.log(e.message,e.stack);
  }finally {
    client.release();
    console.log('Release client');
    if (text.length > 0) await sendFeedback(text);
  }
  return data
}

async function sendFeedback(text) {
  try {
    const managerKeybord = {
      reply_markup: JSON.stringify({
          inline_keyboard: [
            [{text: 'Откликнись', callback_data:'original'}]
          ]
      })
    }

    await bot.sendMessage(process.env.TELEGRAM_REG_CHAT_ID, text, managerKeybord);

    await bot.on('callback_query', msg =>{
      const managerClick = {
          inline_keyboard: [
            [{text: `${msg.from.username}`, callback_data:'edit'}]
          ]
      }

      let answer = ''


      if(msg.data === 'edit'){
        answer = 'На эту заявку уже откликнулись'
      }else{
        answer = 'Вы откликнулись на заявку'
        bot.editMessageReplyMarkup(managerClick, {chat_id: process.env.TELEGRAM_REG_CHAT_ID, message_id: msg.message.message_id})
      }
      bot.answerCallbackQuery(msg.id, {text: `${ answer }`})
      console.log(msg.data)
    })

    return { success: true };
  }
  catch (err) {
    console.log(err.message, err.stack);
  }

}

module.exports = {
  sendFeedback: sendFeedback,
  getFeedback: getFeedback
}
