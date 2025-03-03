import requests
import json
from googletrans import Translator
from calc import getPrice
translator = Translator()

def upcase_first_letter(s):
  return s[0].upper() + s[1:]

def lowcase_first_letter(s):
  return s[0].lower() + s[1:]

# делаем запрос и преобразуем в json
def remakeToJson(url, headers):
    try:
        response = requests.get(url, headers=headers)
        SearchResults = json.loads(response.text)
    except Exception as e:
        SearchResults = {}
        print(e)
    finally:
        return SearchResults

# получаем инфу о машине
def getCar(carJson):
    try:
        headers = {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Accept-Language': 'ru,en;q=0.9',
          'Connection': 'keep-alive',
          'Cookie': 'WMONID=DAtQgh8R5TB; OAX=XoyIsGPfi6oADRbL; PCID=16755946682312098906608; _fbp=fb.1.1676046488573.1675328925; afUserId=2aa2874e-3688-47c6-8c95-5161d5ed8d3e-p; _gcl_au=1.1.362288268.1685895549; RecentViewTruck=; cto_bundle=9NJIBV9MVkw5R2lzSTVNanNaU3ZOMnptcDhiU3BNQVl4c1NHdG1MaFlIZVF3ZDBGakU0a1QlMkYlMkZUVDlxQTlNOUEzWm03WVh5YUFOJTJGWHVlUEVzYVlRZGtRbndhZFRNR0VYRkRlUk41eUdET1h1eW5yJTJGSWlMQUNKZkhCZkcySGhWbWolMkJ0R2s; RecentViewAllCar=32548611%2C35335674%2C35253384%2C35098401%2C34864427%2C35406875%2C34772076%2C35302684%2C35408370%2C35476146%2C35312387%2C35429588%2C35283684%2C35277765%2C34376884; RecentViewCar=32548611%2C35335674%2C35253384%2C35098401%2C34864427%2C35406875%2C34772076%2C35302684%2C35408370%2C35476146%2C35312387%2C35429588%2C35283684%2C35277765%2C34376884; _gid=GA1.2.775045843.1690381563; SEARCH_CONTENTS_CAR.prevModel={%22key%22:%22002028110%22%2C%22source%22:{%22carTypeValue%22:%22Y%22%2C%22carTypeName%22:%22kor%22%2C%22manufacturerCode%22:%22002%22%2C%22manufacturerName%22:%22%EA%B8%B0%EC%95%84%22%2C%22modelGroupCode%22:%22028%22%2C%22modelGroupName%22:%22%EC%8F%98%EC%9A%B8%22%2C%22modelCode%22:%22110%22%2C%22modelName%22:%22%EC%98%AC%20%EB%89%B4%20%EC%8F%98%EC%9A%B8%22%2C%22modelEndYear%22:%222016%22}%2C%22buyerCount%22:-1%2C%22buyerCountGroup%22:-1}; _ga_WY0RWR65ED=GS1.2.1690432250.9.0.1690432250.0.0.0; _ga=GA1.1.1527712619.1675594668; _ga_75Z8JTVTJD=GS1.2.1690432261.2.0.1690432261.60.0.0; AF_SYNC=1690432263439; _ga_BQ7RK9J6BZ=GS1.1.1690432261.29.1.1690433759.54.0.0; _ga_SX6YBF7MKB=GS1.1.1690432261.30.1.1690433760.0.0.0; RECENT_CAR_CARID_35429588_0=35429588%253A%25ED%2598%2584%25EB%258C%2580%2B%25EB%258D%2594%2B%25EB%2589%25B4%2B%25EC%2595%2584%25EB%25B0%2598%25EB%2596%25BC%2BAD%2B1.6%2BLPi%25240; _encar_hostname=http://www.encar.com; JSESSIONID=BXpGEvZPGRaGumDzYK6kzUZXxdV2V1Qb8S9g2kKAKSZj5uQJxbonx5uUKEylZ1Td.mono-was1-prod_servlet_encarWeb1',
          'Referer': 'http://www.encar.com/dc/dc_cardetailview.do?pageid=fc_carsearch&listAdvType=normal&carid=35429588',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 YaBrowser/23.3.1.906 (beta) Yowser/2.5 Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest',
        }
        # !
        car = {
            'Id': 0,
            'Manufacturer': '',
            'Model': '',
            'ModelGroup': '',
            'Badge': '',
            'Color': '',
            'Transmission': '',
            'FuelType': '',
            'Category': '',
            'Year': 0,
            'Mileage': 0,
            'Displacement': 0,
            'Price': 0,
            'encarPrice': 0,
            'Photo': [],
            'Strahovka': '',
            'History': ''
        }

        car['Id'] = carJson['Id']

        manufacturerTr = translator.translate(text=carJson['Manufacturer'], src='ko', dest='en').text
        manufacturerTr = upcase_first_letter(manufacturerTr)
        if manufacturerTr == 'Benz':
            manufacturerTr = 'Mercedes-Benz'
        if manufacturerTr == 'Mini':
            manufacturerTr = 'MINI'
        if manufacturerTr == 'Citroen/DS':
            manufacturerTr = 'Citroen'
        if manufacturerTr == 'Aston martin':
            manufacturerTr = 'Aston Martin'
        if manufacturerTr == 'Dongpung Socon':
            manufacturerTr = 'Dongfeng'
        if manufacturerTr == 'Rolls royce':
            manufacturerTr = 'Rolls-Royce'
        if manufacturerTr == 'Chevrolet (GM Daewoo)':
            manufacturerTr = 'Chevrolet'
        car['Manufacturer'] = manufacturerTr

        car['Model'] = translator.translate(text=carJson['Model'], src='ko', dest='en').text
        car['Model'] = lowcase_first_letter(car['Model'])

        car['ModelGroup'] = translator.translate(text=carJson['ModelGroup'], src='ko', dest='en').text
        car['ModelGroup'] = lowcase_first_letter(car['ModelGroup'])

        car['Badge'] = translator.translate(text=carJson['Badge'], src='ko', dest='en').text
        car['Badge'] = lowcase_first_letter(car['Badge'])

        transmTr = translator.translate(carJson['Transmission'], src='ko', dest='ru').text
        if transmTr == 'полуавтоматический':
            transmTr = 'роботизированная'
        elif transmTr == 'авто':
            transmTr = 'автомат'
        elif transmTr == 'вариатор':
            transmTr = 'вариативная'
        elif transmTr == 'руководство':
            transmTr = 'механика'
        else:
            transmTr = 'автомат'
        car['Transmission'] = transmTr

        car['FuelType'] = translator.translate(text=carJson['FuelType'], src='ko', dest='ru').text
        car['FuelType'] = lowcase_first_letter(car['FuelType'])

        car['Year'] = int(str(carJson['Year'])[:4])
        car['Mileage'] = int(str(carJson['Mileage'])[:-2])

        carUrl = remakeToJson(f'http://www.encar.com/dc/dc_cardetailview.do?method=ajaxInspectView&rgsid={carJson["Id"]}&sdFlag=N', headers)
        car['Displacement'] = carUrl[0]['inspect']['carSaleDto']['displacement']

        carCtg = carUrl[0]['inspect']['carSaleDto']['categoryNm']
        car['Category'] = translator.translate(text=carCtg, src='ko', dest='ru').text
        car['Category'] = lowcase_first_letter(car['Category'])

        carClr = carUrl[0]['inspect']['carSaleDto']['color']
        car['Color'] = translator.translate(text=carClr, src='ko', dest='ru').text
        car['Color'] = lowcase_first_letter(car['Color'])

        noPrice = ['999990000', '99990000', '9999900000', '5555550000', '555550000', '55550000', '66660000',
                   '666660000', '6666660000', '7777770000', '777770000', '77770000']
        price = int(str(carJson['Price'])[:-2] + '0000')
        car['encarPrice'] = price
        if price in noPrice:
          return 0
        car['Price'] = getPrice(price, car['Year'], car['Displacement'], car['FuelType'])

        numPhotos = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012', '013', '014',
        '015', '016', '017', '018', '019', '020', '021', '022', '023', '024']
        photos = []
        for numPhoto in numPhotos:
            pikLoc = f'''http://ci.encar.com/carpicture{carJson['Photo']}'''
            pikLink = pikLoc + f'{numPhoto}.jpg'
            photos.append(pikLink)
        car['Photo'] = photos

        car['Strahovka'] = f'http://www.encar.com/md/sl/mdsl_regcar.do?method=inspectionViewNew&carid={car["Id"]}&wtClick_carview=015'
        car['History'] = f'http://www.encar.com/dc/dc_cardetailview.do?method=kidiFirstPop&carid={car["Id"]}&wtClick_carview=044'
        # print(car)
        return car
    except Exception as e:
        return 0

def getInfo():
    try:
        # путь до списков марок машин
        headers = {
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'Accept-Language': 'ru,en;q=0.9',
          'Connection': 'keep-alive',
          'Origin': 'https://m.encar.com',
          'Referer': 'https://m.encar.com/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 YaBrowser/23.3.1.906 (beta) Yowser/2.5 Safari/537.36',
          'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "YaBrowser";v="23"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': 'Linux',
        }
        manufacturersJson = remakeToJson('https://api.encar.com/search/car/list/mobile?count=true&q=(And.Hidden.N._.(Or.CarType.Y._.CarType.N.))&inav=%7CMetadata%7CSort', headers)
        manufacturersListKorea = manufacturersJson['iNav']['Nodes'][1]['Facets'][0]['Refinements']['Nodes'][0]['Facets']
        manufacturersList = manufacturersJson['iNav']['Nodes'][1]['Facets'][1]['Refinements']['Nodes'][0]['Facets']

        #! получаем значения
        manufacturers = []
        for i in range(len(manufacturersListKorea)-1):
            manufacturers.append(manufacturersListKorea[i]['Value'])
        for i in range(len(manufacturersList)-1):
            manufacturers.append(manufacturersList[i]['Value'])

        #! проходимся по каждой марке и странице
        cars = []
        for manufacturer in manufacturers:
            # # для тестового парсинга
            # if manufacturer == '기아':
            #     break
            for page in range(0, 801, 200):
                try:
                    links  = [
                      f'https://api.encar.com/search/car/list/mobile?count=true&q=(And.Year.range(201900..)._.Hidden.N._.Condition.InspectionDirect._.Condition.Record._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.Y._.Manufacturer.{manufacturer}.))&sr=%7CPriceAsc%7C{page}%7C200&inav=%7CMetadata%7CSort',
                      f'https://api.encar.com/search/car/list/mobile?count=true&q=(And.Year.range(201900..)._.Hidden.N._.Condition.InspectionDirect._.Condition.Record._.SellType.%EC%9D%BC%EB%B0%98._.(C.CarType.N._.Manufacturer.{manufacturer}.))&sr=%7CPriceAsc%7C{0}%7C200&inav=%7CMetadata%7CSort'
                    ]

                    for link in links:
                        carsJson = remakeToJson(link, headers)
                        for i in (carsJson['SearchResults']):
                            car = getCar(i)
                            # print(car)
                            if car == 0:
                                pass
                            cars.append(car)

                            # для тестового парсинга
                            # break

                except Exception as e:
                    pass
            print(manufacturer, 'has parsed')

    except Exception as e:
        cars = []
        print('Ошибка в getInfo:', e)
    finally:
        # print(cars)
        return cars


# getInfo()
