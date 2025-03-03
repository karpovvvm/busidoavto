const { pool } = require('../../services/libs/pgpool');

async function nameTableH() {
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT "nameTable",
                                        "namePhotosTable"
                                 FROM state
                                 `,[]);
    if(result.rows.length > 0){
      data.message = result.rows
      data.statusCode = 200
    }
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}
async function carId(object) {
  let nameTable = await nameTableH()
  let data = {
        statusCode: 400,
        message: "error"
    }
    const client = await pool.connect();
    let result = null
    try {
        result = await client.query(`SELECT pcp.id,
                                            "manufacturer",
                                            "modelGroup",
                                            "model",
                                            "formYear",
                                            "category",
                                            "fuel",
                                            "badge",
                                            "transmission",
                                            "color",
                                            "price",
                                            "displacement",
                                            "mileage",
                                            "history",
                                            "performance",
                                            "photo1",
                                            "photo2",
                                            "photo3",
                                            "photo4",
                                            "photo5",
                                            "photo6",
                                            "photo7",
                                            "photo8",
                                            "photo9",
                                            "photo10",
                                            "photo15",
                                            "photo16",
                                            "photo17",
                                            "photo18",
                                            "photo19",
                                            "photo20",
                                            "photo21",
                                            "photo22",
                                            "photo23",
                                            "photo24"
                                     FROM "${nameTable.message[0].nameTable}" pcp
                                        LEFT JOIN "${nameTable.message[0].namePhotosTable}" ON "${nameTable.message[0].namePhotosTable}".id = pcp.id
                                     WHERE pcp.id = $1`,[object.id]);
        if(result.rows.length > 0){
            let photos = [
              result.rows[0].photo1,
              result.rows[0].photo2,
              result.rows[0].photo3,
              result.rows[0].photo4,
              result.rows[0].photo5,
              result.rows[0].photo6,
              result.rows[0].photo7,
              result.rows[0].photo8,
              result.rows[0].photo9,
              result.rows[0].photo10,
              result.rows[0].photo15,
              result.rows[0].photo16,
              result.rows[0].photo17,
              result.rows[0].photo18,
              result.rows[0].photo19,
              result.rows[0].photo20,
              result.rows[0].photo21,
              result.rows[0].photo22,
              result.rows[0].photo23,
              result.rows[0].photo24,
            ]
            data.message = {
              id: result.rows[0].id,
              manufacturer: result.rows[0].manufacturer,
              modelGroup: result.rows[0].modelGroup,
              model: result.rows[0].model,
              formYear: result.rows[0].formYear,
              category: result.rows[0].category,
              fuel: result.rows[0].fuel,
              badge: result.rows[0].badge,
              transmission: result.rows[0].transmission,
              color: result.rows[0].color,
              price: result.rows[0].price,
              displacement: result.rows[0].displacement,
              mileage: result.rows[0].mileage,
              history: result.rows[0].history,
              performance: result.rows[0].performance,
              photos
            }
            data.statusCode = 200
        }
    }
    catch (e) {
        console.log(e.stack, e.message);
    }
    finally {
        client.release();
        console.log('Release client');
    }
    return data;
}

/**
 *
 * @param {Object} object
 * @param {Number} object.page
 * @param {Number} object
 * @returns {Promise<{message: string, statusCode: number}>}
 */
async function getAll(object) {
    let nameTable = await nameTableH()
    let data = {
        statusCode: 400,
        message:    'error',
    };
    let limit = 24;
    let offset = object.page * limit - limit;
    let result = null;
    let where = '  ';
    let orderBy = '  ';
    let params = [ limit, offset ];
    const filters = [ 'manufacturer',  'modelGroup',  'formYearMin', 'formYearMax',  'color',  'transmission',  'fuel', 'minPrice', 'maxPrice', 'minMileage', 'maxMileage', 'minDisplacement', 'maxDisplacement']

  console.log('pre');
    const client = await pool.connect();
  console.log('post');

    try {

        for (const filter in object) {
            if (filters.includes(filter)) {
                if (filter === 'minPrice') {
                  if (params.length === 2) {
                    where += ` WHERE `;
                  } else {
                    where += ` AND `;
                  }

                  params.push(object[filter]);
                  where += ` "price" >= $${params.length} `;
                } else if(filter === 'maxPrice') {
                  if (params.length === 2) {
                    where += ` WHERE `;
                  } else {
                    where += ` AND `;
                  }

                  params.push(object[filter]);
                  where += ` "price" <= $${params.length} `;
                }else if(filter === 'minMileage') {
                  if (params.length === 2) {
                    where += ` WHERE `;
                  } else {
                    where += ` AND `;
                  }

                  params.push(object[filter]);
                  where += ` "mileage" >= $${params.length} `;
                }else if(filter === 'maxMileage') {
                  if (params.length === 2) {
                    where += ` WHERE `;
                  } else {
                    where += ` AND `;
                  }

                  params.push(object[filter]);
                  where += ` "mileage" <= $${params.length} `;
                }else if(filter === 'formYearMin') {
                  if (params.length === 2) {
                    where += ` WHERE `;
                  } else {
                    where += ` AND `;
                  }

                  params.push(object[filter]);
                  where += ` "formYear" >= $${params.length} `;
                }else if(filter === 'formYearMax') {
                  if (params.length === 2) {
                  where += ` WHERE `;
                } else {
                  where += ` AND `;
                }

                  params.push(object[filter]);
                  where += ` "formYear" <= $${params.length} `;
                }else if(filter === 'minDisplacement') {
                  if (params.length === 2) {
                    where += ` WHERE `;
                  } else {
                    where += ` AND `;
                  }

                  params.push(object[filter]);
                  where += ` "displacement" >= $${params.length} `;
                }else if(filter === 'maxDisplacement') {
                  if (params.length === 2) {
                    where += ` WHERE `;
                  } else {
                    where += ` AND `;
                  }

                  params.push(object[filter]);
                  where += ` "displacement" <= $${params.length} `;
                }else {
                  if (params.length === 2) {
                    where += ` WHERE `;
                  } else {
                    where += ` AND `;
                  }

                  params.push(object[filter]);
                  where += ` "${filter}" = $${params.length} `;
                }
            }
        }

        if (where.trim()) {
          orderBy += ` ORDER BY price `
        }else{
          orderBy += ` ORDER BY id DESC `
        }



      result = await client.query(`SELECT COUNT("id") AS "count", $1, $2
                                   FROM "${nameTable.message[0].nameTable}" pcp` + where, params);

        const count = result.rows[0].count;

        result = await client.query(`SELECT pcp.id,
                                            "manufacturer",
                                            "modelGroup",
                                            "model",
                                            "formYear",
                                            "category",
                                            "fuel",
                                            "badge",
                                            "transmission",
                                            "color",
                                            "price",
                                            "displacement",
                                            "mileage",
                                            "photo1",
                                            "photo2",
                                            "photo3"
                                     FROM "${nameTable.message[0].nameTable}" pcp
                                            LEFT JOIN "${nameTable.message[0].namePhotosTable}" ON "${nameTable.message[0].namePhotosTable}".id = pcp.id ` + where + orderBy + ` LIMIT $1 OFFSET $2 `, params);

        data.message = {
            data:  result.rows,
            count: count,
        };
        data.statusCode = 200;
    }
    catch (e) {
        console.log(e.stack, e.message);
    }
    finally {
        client.release();
        console.log('Release client');
    }
    return data;
}

async function carManufacturer() {
    let nameTable = await nameTableH()
    let data = {
      statusCode: 400,
      message: "error"
    }
    const client = await pool.connect();
    let result = null
    try {
      result = await client.query(`SELECT DISTINCT "manufacturer"
                                   FROM "${nameTable.message[0].nameTable}" pcp
                                  ORDER BY manufacturer`,[]);
      if(result.rows.length > 0){
        data.message = result.rows
        data.statusCode = 200
      }
    }
    catch (e) {
      console.log(e.stack, e.message);
    }
    finally {
      client.release();
      console.log('Release client');
    }
    return data;
  }

async function carModel(object) {
    let nameTable = await nameTableH()
    let data = {
        statusCode: 400,
        message:    'error',
    };
    const client = await pool.connect();
    let result = null;
    try {
        if (object.manufacturer) {
            result = await client.query(`SELECT DISTINCT "modelGroup"
                                         FROM "${nameTable.message[0].nameTable}" pcp
                                         WHERE manufacturer = $1
                                         ORDER BY "modelGroup"`, [ object.manufacturer ]);
        }
        else {
            result = await client.query(`SELECT DISTINCT "modelGroup"
                                         FROM "${nameTable.message[0].nameTable}" pcp
                                         ORDER BY "modelGroup"`);
        }
        data.message = result.rows;
        data.statusCode = 200;
    }
    catch (e) {
        console.log(e.stack, e.message);
    }
    finally {
        client.release();
        console.log('Release client');
    }
    return data;
}

async function carFormYear() {
  let nameTable = await nameTableH()
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT MIN("formYear"), MAX("formYear")
                                 FROM "${nameTable.message[0].nameTable}" pcp
                                `,[]);
    if(result.rows.length > 0){
      data.message = result.rows
      data.statusCode = 200
    }
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

async function carColor() {
  let nameTable = await nameTableH()
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT DISTINCT "color"
                                 FROM "${nameTable.message[0].nameTable}" pcp
                                `,[]);
    if(result.rows.length > 0){
      data.message = result.rows
      data.statusCode = 200
    }
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

async function carTransmission() {
  let nameTable = await nameTableH()
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT DISTINCT "transmission"
                                 FROM "${nameTable.message[0].nameTable}" pcp
                                `,[]);
    if(result.rows.length > 0){
      data.message = result.rows
      data.statusCode = 200
    }
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

async function carFuel() {
  let nameTable = await nameTableH()
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT DISTINCT "fuel"
                                 FROM "${nameTable.message[0].nameTable}" pcp
                                `,[]);
    if(result.rows.length > 0){
      data.message = result.rows
      data.statusCode = 200
    }
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

async function carPrice() {
  let nameTable = await nameTableH()
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT MIN("price"), MAX("price")
                                 FROM "${nameTable.message[0].nameTable}" pcp
                                `,[]);
    if(result.rows.length > 0){
      data.message = result.rows
      data.statusCode = 200
    }
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

async function carMileage() {
  let nameTable = await nameTableH()
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT MIN("mileage"), MAX("mileage")
                                 FROM "${nameTable.message[0].nameTable}" pcp
                                `,[]);
    if(result.rows.length > 0){
      data.message = result.rows
      data.statusCode = 200
    }
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

async function carDisplacement() {
  let nameTable = await nameTableH()
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT MIN("displacement"), MAX("displacement")
                                 FROM "${nameTable.message[0].nameTable}" pcp
                                `,[]);
    if(result.rows.length > 0){
      data.message = result.rows
      data.statusCode = 200
    }
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

async function similarManufacturerCars(object) {
  let nameTable = await nameTableH()
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT pcp.id,
                                        "manufacturer",
                                        "modelGroup",
                                        "model",
                                        "formYear",
                                        "category",
                                        "fuel",
                                        "badge",
                                        "transmission",
                                        "color",
                                        "price",
                                        "displacement",
                                        "mileage",
                                        "photo1",
                                        "photo2",
                                        "photo3"
                                     FROM "${nameTable.message[0].nameTable}" pcp
                                            LEFT JOIN "${nameTable.message[0].namePhotosTable}" ON "${nameTable.message[0].namePhotosTable}".id = pcp.id
                                     WHERE pcp.manufacturer = $1
                                       AND pcp."modelGroup" = $2
                                       AND pcp.id != $3
                                     LIMIT 10`,[object.manufacturer,object.modelGroup, object.id]);
    data.message = {
      data:  result.rows,
    };
    data.statusCode = 200;
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

async function similarPriceCars(object) {
  let nameTable = await nameTableH()
  let data = {
    statusCode: 400,
    message: "error"
  }
  const client = await pool.connect();
  let result = null
  try {
    result = await client.query(`SELECT pcp.id,
                                        "manufacturer",
                                        "modelGroup",
                                        "model",
                                        "formYear",
                                        "category",
                                        "fuel",
                                        "badge",
                                        "transmission",
                                        "color",
                                        "price",
                                        "displacement",
                                        "mileage",
                                        "photo1",
                                        "photo2",
                                        "photo3"
                                     FROM "${nameTable.message[0].nameTable}" pcp
                                            LEFT JOIN "${nameTable.message[0].namePhotosTable}" ON "${nameTable.message[0].namePhotosTable}".id = pcp.id
                                     WHERE pcp.price <= $1 + 50000
                                       AND pcp.price >= $1 - 50000
                                       AND pcp.id != $2
                                       AND pcp.id NOT IN (
                                       SELECT id FROM "${nameTable.message[0].nameTable}"
                                       WHERE manufacturer = $3 AND "modelGroup" = $4
                                     )
                                     LIMIT 10`,[object.price, object.id, object.manufacturer, object.modelGroup]);
    data.message = {
      data:  result.rows,
    };
    data.statusCode = 200;
  }
  catch (e) {
    console.log(e.stack, e.message);
  }
  finally {
    client.release();
    console.log('Release client');
  }
  return data;
}

module.exports = {
    carId:                    carId,
    getAll:                   getAll,
    carManufacturer:          carManufacturer,
    carFormYear:              carFormYear,
    carModel:                 carModel,
    carColor:                 carColor,
    carTransmission:          carTransmission,
    carFuel:                  carFuel,
    carPrice:                 carPrice,
    carMileage:               carMileage,
    carDisplacement:          carDisplacement,
    nameTableH:               nameTableH,
    similarManufacturerCars:  similarManufacturerCars,
    similarPriceCars:         similarPriceCars,
};





