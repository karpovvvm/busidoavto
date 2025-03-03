import os
import psycopg2
from datetime import datetime
import time
from dotenv import load_dotenv
from getInfo import getInfo
import datetime

dotenv_path = os.path.join(os.path.dirname(__file__), '../../.env')
if os.path.exists(dotenv_path):
  a = load_dotenv(dotenv_path)

con = psycopg2.connect(
  database=os.environ.get("DB_NAME"),
  user=os.environ.get("DB_USER"),
  password=os.environ.get("DB_PASSWORD"),
  host=os.environ.get("DB_HOST"),
  port=os.environ.get("DB_PORT")
)

cur = con.cursor()


def getState():
  try:
    arr = []
    table = 1

    cur.execute(
      f'''
            SELECT "nameTable", "namePhotosTable"
            FROM "state"
            '''
    )

    result = cur.fetchall()

    for row in result:
      for i in row:
        arr.append(i)

    print('Текущая активная таблица', arr[0])
    if arr[0] == 'prodCarparam':
      table = 0
    elif arr[0] == 'sndProdCarparam':
      table = 1


    return table

  except Exception as e:
    print('Ошибка при работе getState', e)


# вносим данные
def connectionDb(tableName, photosTableName, info):
    try:
        for car in info:
            try:
                cur.execute(
                    f'''INSERT INTO "{tableName}"
                              ("id", "manufacturer", "modelGroup", "model", "badge", "formYear", "category", "fuel", "transmission", "color", "displacement", "mileage", "performance", "history", "price", "encarPrice")
                              VALUES ({car['Id']}, %s, %s, %s, %s, {car['Year']}, %s, %s, %s, %s, {car['Displacement']}, {car['Mileage']}, %s, %s, {car['Price']}, {car['encarPrice']})''',
                    [car['Manufacturer'], car['ModelGroup'], car['Model'], car['Badge'], car['Category'], car['FuelType'], car['Transmission'], car['Color'], car['Strahovka'], car['History']]
                )
                photo = car['Photo']
                cur.execute(
                  f'''INSERT INTO "{photosTableName}"
                            ("id", photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo18, photo19, photo20, photo21, photo22, photo23, photo24)
                            VALUES ({car['Id']}, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                            ''',
                  [photo[0], photo[1], photo[2], photo[3], photo[4], photo[5], photo[6], photo[7], photo[8], photo[9], photo[10], photo[11], photo[12], photo[13], photo[14], photo[15], photo[16], photo[17], photo[18], photo[19], photo[20], photo[21], photo[22], photo[23]])
            except Exception as e:
                print('Ошибка у машины:', e)
                pass

    except Exception as e:
        print('Ошибка файла connection.py функции connectionDb', e)


# удаляем данные из неактивной бд
def deleteFromDatabase(tableName, photosTableName):
  try:
    cur.execute(
      f'''DELETE from "{tableName}"'''
    )
    cur.execute(
      f'''DELETE from "{photosTableName}"'''
    )

    con.commit()
  except Exception as e:
    print('Ошибка файла connection.py функции deleteFromDatabase', e)


# изменяем состояние активной бд
def changeState(nameTable, namePhotosTable):
    try:
        cur.execute(
            f'''DELETE FROM "state" '''
            )

        cur.execute(
            f'''INSERT INTO "state"
            ("nameTable", "namePhotosTable")
            VALUES (%s, %s)
            ''' , [nameTable, namePhotosTable]
            )

    except Exception as e:
        print('Ошибка файла connection.py функции changeState', e)



# парсинг
# while True:

try:
    # парсим
    data = getInfo()
    print(datetime.datetime.now())
    print('end parse')
    print(getState())
    # в зависимости от активности бд вносим данные и удаляем из неактивной
    if getState() == 1:
        print(datetime.datetime.now())
        print('start adding')
        connectionDb('prodCarparam', 'prodPhotos', data)
        print(datetime.datetime.now())
        print('end of addition')
        changeState('prodCarparam', 'prodPhotos')
        print(datetime.datetime.now())
        print('State: prodCarparam')
        deleteFromDatabase('sndProdCarparam', 'sndProdPhotos')
        print(datetime.datetime.now())
        print('clear sndProdCarparam')

    elif getState() == 0:
        print(datetime.datetime.now())
        print('start adding')
        connectionDb('sndProdCarparam', 'sndProdPhotos', data)
        print(datetime.datetime.now())
        print('end of addition')
        changeState('sndProdCarparam', 'sndProdPhotos')
        print(datetime.datetime.now())
        print('State: sndProdCarparam')
        deleteFromDatabase('prodCarparam', 'prodPhotos')
        print(datetime.datetime.now())
        print('clear prodCarparam')


except Exception as e:
    print('Ошибка файла connection.py цикла while', e)
