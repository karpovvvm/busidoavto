import telebot
from telebot.types import InputMediaPhoto, InlineKeyboardMarkup, InlineKeyboardButton
import os
import psycopg2
from dotenv import load_dotenv
from emoji import emojize
from datetime import date


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
token = os.environ.get("CHANEL_TGTOKEN")
id_channel = '@busidoavto'
bot = telebot.TeleBot(token)

def getCar(carId):
      try:
            arr = []
            table = 1

            cur.execute(f'SELECT "nameTable", "namePhotosTable" FROM "state" ')

            tablesActive = cur.fetchall()
            for row in tablesActive:
              for i in row:
                arr.append(i)

            if arr[0] == 'prodCarparam':
                table = 0
            elif arr[0] == 'sndProdCarparam':
                table = 1

            select = f'SELECT * FROM "{arr[0]}" WHERE {carId} = "id"'
            cur.execute(select)
            result = cur.fetchall()

            selectPhoto = f'''
            SELECT "photo1", "photo2", "photo3", "photo4", "photo5", "photo6", "photo7", "photo8", "photo9", "photo10", "photo15", "photo16", "photo17", "photo18", "photo19", "photo20", "photo21", "photo22", "photo23", "photo24" FROM "{arr[1]}"
            WHERE {carId} = "id"
            '''

            cur.execute(selectPhoto)
            result.append(cur.fetchall()[0])

      except Exception as e:
            result = ['Ошибка']
      finally:
          return result

def litering_by_three(a):
    try:
        a = str(a)
        a = a[::-1]
        result = ' '.join([a[i:i + 3] for i in range(0, len(a), 3)])
    except Exception as e:
        pass
    finally:
        return result[::-1]
def text_for_car(car):
    try:
        current_date = date.today()

        name = f'{car[1]} {car[3]} {car[4]}\n'
        yr = f'Год: {car[5]}\n\n'
        topl = f'Топливо: {car[7]}\n'
        cpp = f'Коробка передач: {car[8]}\n'
        v = f'Объем двигателя: {car[10]}\n'
        prob = f'Пробег: {litering_by_three(car[11])} км\n\n'
        prc = f'Цена доставки до Владивостока: {litering_by_three(car[14])} р.\n(Доставим в любой регион России)\n\n'
        voprosi = emojize(f'По вопросам приобретения:\n:telephone_receiver:  8(912)692-95-50\n:notebook:  WhatsApp: 8(912)692-95-50\n\n- цена актуальна на момент выхода поста {current_date}')

        carChooseText = emojize(f':oncoming_automobile: {name}:hourglass_not_done: {yr}:fuel_pump: {topl}:package: {cpp}:oil_drum: {v}:man_running: {prob}:money_bag: {prc}{voprosi}')
        return carChooseText
    except Exception as e:
        pass

@bot.message_handler(commands=['start', 'instruction'])
def start_message(message):
    try:
        if message.chat.id == 422389513 or message.chat.id == 5573414999:
            bot.send_message(message.chat.id, 'Чтобы опубликовать машину пришли ссылку')
        else:
            bot.send_message(message.chat.id, 'Доступ запрещен')
    except Exception as e:
        pass

@bot.message_handler(content_types=['text'])
def commands(message):
    try:
        if message.chat.id == 422389513 or message.chat.id == 5573414999:
            carLink = message.text
            carId = message.text[-8:]

            markup = InlineKeyboardMarkup()
            btn_site = InlineKeyboardButton(text='Перейти', url=carLink)
            markup.add(btn_site)

            carInfo = getCar(carId)
            text = text_for_car(carInfo[0])

            photos = carInfo[1]
            media = [InputMediaPhoto(photos[0], caption=text),
                     InputMediaPhoto(photos[1]),
                     InputMediaPhoto(photos[4]),
                     InputMediaPhoto(photos[5]),
                     InputMediaPhoto(photos[7]),
                     InputMediaPhoto(photos[11]),
                     InputMediaPhoto(photos[12]),
                     InputMediaPhoto(photos[15]),
                     InputMediaPhoto(photos[17])]

            bot.send_media_group(id_channel, media)

            bot.send_message(message.chat.id, "Ожидайте")
            bot.send_message(id_channel, 'Наш сайт', reply_markup=markup)
            bot.send_message(message.chat.id, "Успешно")
        else:
            bot.send_message('Доступ запрещен')
    except Exception as e:
        print(e)
        try:
            bot.send_message(message.chat.id, "Подождите немного, у бота лимит на отправку сообщений, если не помогло, обратись к разработчику")
        except Exception as e:
            pass
bot.polling()
