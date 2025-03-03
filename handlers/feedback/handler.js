const fs = require('fs');

const { pool } = require('../../services/libs/pgpool');

async function insertFeedback(object){
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect()
  try{
    let result = await client.query(`INSERT INTO feedback ("FIO", number, mail, "CarOthers", "idCar", "carPrice", "selectCity", "selectCarType", "selectDeliveryPrice")
                                     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
                                     [object.FIO, object.number, object.mail, object.CarOthers, object.idCar, object.carPrice, object.selectCity, object.selectCarType, object.selectDeliveryPrice]
                                   )
    if (result.rowCount > 0){
      data = {
        statusCode: 200,
        message: "success"
      }
    }
  }catch (e) {
    console.log(e.message,e.stack);
  }finally {
    client.release();
    console.log('Release client');
  }
  return data
}

module.exports = {
  insertFeedback : insertFeedback
}
