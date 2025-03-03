import requests
import datetime
from googletrans import Translator

try:
  now = datetime.datetime.now()
  data = requests.get('https://www.cbr-xml-daily.ru/daily_json.js').json()
except Exception as e:
  print('Ошибка calc.py вне функции', e)


def getPrice(price, formYear, displacement, fuel):
  try:
      usd = data['Valute']['USD']['Value']
      von = data['Valute']['KRW']['Value']
      eur = data['Valute']['EUR']['Value']

      priceRub = price * von / 1000
      priceEur = priceRub / eur

      # постоянные расходы по Корее
      price += 1800000

      # в рубли
      price = price * von / 1000

      # банкам отдаем и все такое +3.5%
      proz = price*0.035
      price += proz

      # брокер
      price += 80000

      # заработали
      price += 50000


      # таможенная пошлина
      if 'электричество' in fuel:
        price += priceRub * 0.35
        price += 100 * 0.75 * 55

      else:
        if now.year - formYear < 3:
          if priceEur < 8500:
            if priceEur * 0.54 > 2.5 * displacement:
              price += priceRub * 0.54
            else:
              price += 2.5 * displacement * eur
          elif 8500 <= priceEur < 16700:
            if priceEur * 0.48 > 3.5 * displacement:
              price += priceRub * 0.48
            else:
              price += 3.5 * displacement * eur
          elif 16700 <= priceEur < 42300:
            if priceEur * 0.48 > 5.5 * displacement:
              price += priceRub * 0.48
            else:
              price += 5.5 * displacement * eur
          elif 42300 <= priceEur < 84500:
            if priceEur * 0.48 > 7.5 * displacement:
              price += priceRub * 0.48
            else:
              price += 7.5 * displacement * eur
          elif 84500 <= priceEur < 169000:
            if priceEur * 0.48 > 15 * displacement:
              price += priceRub * 0.48
            else:
              price += 15 * displacement * eur
          elif 169000 <= priceEur:
            if priceEur * 0.48 > 20 * displacement:
              price += priceRub * 0.48
            else:
              price += 20 * displacement * eur
        elif now.year - formYear >= 3:
          if displacement <= 1000:
            price += 1.5 * displacement * eur
          if 1001 <= displacement <= 1500:
            price += 1.7 * displacement * eur
          if 1501 <= displacement <= 1800:
            price += 2.5 * displacement * eur
          if 1801 <= displacement < 2300:
            price += 2.7 * displacement * eur
          if 2301 <= displacement <= 3000:
            price += 3 * displacement * eur
          if 3001 <= displacement:
            price += 3.6 * displacement * eur


      return int(price)
  except Exception as e:
    print('Ошибка файла calc.py в функции getPrice', e)
    return 0
