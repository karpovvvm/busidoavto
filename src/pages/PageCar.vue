<template>
  <q-page class="page-car flex row bg-white justify-between">
    <template v-if="device===1 && isLoadingList===true">
      <q-skeleton height="95vh" class="q-ma-md" width="15%"></q-skeleton>
    </template>
    <template v-else-if="device===1 && isLoadingList===false  && 25!==similarPriceCars.length">
      <div style="width: 15%" class="q-ml-sm">
        <q-list class="carlist flex row">
          <div class="q-mt-sm" style="display: flex; flex-direction: row; justify-content: center; width: 100%">
            <span style="font-weight: bold; font-size: medium; color: #383535">
              похожие предложения
            </span>
          </div>
          <q-card
            v-for="car in similarPriceCars"
            :key="car.id"
            class="card q-mt-sm shadow-0"
          >
            <q-card-section class="q-pl-xs q-pr-xs q-pt-xs q-pt-none card-img flex column">
              <div class="pre-carousel">
                <q-carousel
                  animated
                  v-model="car.slide"
                  infinite
                  transition-prev="slide-right"
                  transition-next="slide-left"
                  @mouseenter="autoplay = false"
                  @mouseleave="autoplay = true"
                  class="text-white card-carousel"
                >
                  <!--                <q-carousel-slide name="1" img-src="../assets/noImageFound.png"/>-->
                  <q-carousel-slide
                    name="1"
                    :img-src="car.photo1"
                  />
                  <q-carousel-slide
                    name="2"
                    :img-src="car.photo2"
                  />
                  <q-carousel-slide
                    name="3"
                    :img-src="car.photo3"
                  />
                </q-carousel>
              </div>
            </q-card-section>
            <q-card-section class="car-info q-px-sm q-pb-none q-pt-none column">
              <div><span class="name q-ml-md"> {{ car.manufacturer }} </span></div>
              <div style="width: 100%; border-bottom: solid #383535 1px"><span class="name q-ml-md"> {{ car.model }} </span></div>

              <div class="certificate q-ml-sm q-mt-sm q-pr-lg column">
                <div>
                  <span class=" q-ml-sm q-pt-sm"> {{ car.badge }} </span>
                </div>

                <div>
                  <span class=" q-ml-sm q-pt-sm"> {{ car.fuel }} </span>
                </div>
                <div>
                  <span class=" q-ml-sm q-pt-sm"> {{ car.mileage }} км </span>
                </div>
                <div>
                  <span class=" q-ml-sm q-pt-sm"> {{ car.formYear }} гв</span>
                </div>
              </div>
              <div class="card-price flex q-ml-md">
                <div style="width: auto; text-decoration: underline 2px #C10015"><span class="main-price"> {{ FullPrice(car.price) }} </span></div>
                <!--                              <div style="width: 100%"><span class="month-price q-mb-xs"> {{ CreditPrice(car.price) }} в мес.</span></div>-->
              </div>

            </q-card-section>
            <q-card-section class="q-pt-none q-pb-sm">
              <router-link style="text-decoration: underline 2px #C10015"
                           class="q-ml-sm text-dark text-h6"
                           :to="{ name: 'Car',
                                              params: {
                                                carId: car.id
                                              }
                                            }" target="_blank">
                <span class="" style="font-weight: bold">Подробнее</span>
              </router-link>
            </q-card-section>
          </q-card>
        </q-list>
      </div>
    </template>
    <template v-else-if="device===1">
      <div style="width: 15%" class="q-ml-sm">
        <q-list class="carlist flex row">
          <div class="q-mt-sm" style="display: flex; flex-direction: row; justify-content: center; width: 100%">
            <span style="font-weight: bold; font-size: medium; color: #383535">
              похожие предложения
            </span>
          </div>
          <div>
            {{ similarPriceCars }}
          </div>
        </q-list>
      </div>
    </template>
    <div class="car-content flex column bg-white">
      <div class="info-header q-mb-md">
        <div style="font-size: 2em; font-weight: bold; text-decoration: underline #C10015 2px" class="q-pt-md q-pl-md">{{ carInfo.manufacturer }} {{ carInfo.model}}</div>
      </div>

      <div class="main-info justify-left" style="display: flex; flex-direction: row; flex-wrap: wrap; align-content: start">
        <template v-if="isLoadingList===true">
          <q-skeleton class="q-ml-sm q-mb-md" height="20em" width="24em"></q-skeleton>
        </template>
        <template v-if="isLoadingList===false">
          <div class="pre-carousel q-pl-md q-pb-md">
            <q-carousel
              animated
              v-model="slide"
              swipeable
              thumbnails
              infinite
              transition-prev="slide-right"
              transition-next="slide-left"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
              class="text-white"
            >
              <!--            Стрелки управления-->
              <template v-slot:control>
                <q-carousel-control
                  position="top-right"
                >
                  <q-btn
                    round text-color="white"
                    icon="fas fa-arrow-right"
                    @click="nextslide"
                    flat
                    ripple="false"
                    :ripple="false"
                  />
                </q-carousel-control>
                <q-carousel-control
                  position="top-left"
                >
                  <q-btn
                    round text-color="white"
                    icon="fas fa-arrow-left"
                    @click="backslide"
                    flat
                    :ripple="false"
                  />
                </q-carousel-control>
              </template>
              <q-carousel-slide v-for="(item, index) in carInfo.photos"
                                :name="index+1"
                                :img-src="item"/>
            </q-carousel>
          </div>
        </template>
        <template v-if="isLoadingList===true">
          <q-skeleton class="q-ml-sm" height="20em" width="24em"></q-skeleton>
        </template>
        <template v-if="isLoadingList===false">
          <div class="information  text-weight-bold">
            <q-list class="info-car q-px-md flex row wrap ">
              <q-list class="class-car q-px-md flex row wrap">
                <div
                  class="info-block q-mx-xs q-ml-xs">
                  Год выпуска: {{ carInfo.formYear }}
                </div>
                <div
                  class="info-block q-mx-xs q-ml-xs">
                  Страховка: <a :href="carInfo.history"><q-icon name="fas fa-car"/></a>
                </div>
                <div
                  class="info-block q-mx-xs q-ml-xs">
                  Проверка: <a :href="carInfo.performance"><q-icon name="fas fa-file"/></a>
                </div>
                <div
                  class="info-block q-mx-xs q-ml-xs">
                  Тип топлива: {{ carInfo.fuel }}
                </div>
                <div
                  class="info-block q-mx-xs q-ml-xs">
                  Пробег: {{ carInfo.mileage }}
                </div>
                <div
                  class="info-block q-mx-xs q-ml-xs">
                  Объем двигателя: {{ carInfo.displacement }}
                </div>
                <div
                  class="info-block q-mx-xs q-ml-xs">
                  Цвет: {{ carInfo.color }}
                </div>
                <div
                  class="info-block q-mx-xs q-ml-xs">
                  Двигатель: {{ carInfo.badge }}
                </div>
              </q-list>
            </q-list>
            <div class="q-pl-lg q-mt-xs ">
              <span style="font-weight: bold">Доставка автовозом в город:</span>
              <q-select
                v-model="selectCity"
                :options="cityOptions"
                label="Выберите город"
                :input-style="{ color: 'black', fontWeight: 'lighter' }"
                class="q-mr-md"
              />
              <q-select
                v-model="selectCarType"
                :options="carTypeOptions"
                label="Выберите тип машины"
                :input-style="{ color: 'black' }"
                :disable="disableCarType"
                class="q-mr-md"
              />
              <q-select
                hide-dropdown-icon
                v-model="selectDeliveryPrice"
                :options="deliveryPriceOptions"
                label="Цена доставки"
                :input-style="{ color: 'black' }"
                :readonly="disableDeliveryPrice"
                class="q-mr-md"
              />
              <q-btn
                @click="resetSelect"
                style="border-bottom-left-radius: 40%; border-bottom-right-radius: 40%"
              >
                Сбросить
              </q-btn>
            </div>
            <div class="price q-pl-lg q-mt-md text-weight-bold" style="font-size: large"> {{ FullPrice(carInfo.price) }} <br> <span style="color: gray; font-size: small">( цена относительная и может измениться )</span></div>
<!--            <div class="q-pl-lg q-mt-md text-weight-bold">-->
<!--              <q-btn-->
<!--              class="last-car-information q-pl-md q-pr-md q-mt-md"-->
<!--              @click="getIdCar"-->
<!--              style="background-color: #C10015"-->
<!--            >-->
<!--              Добавить к заявке-->
<!--            </q-btn>-->
<!--            </div>-->

            <div class="buy-btn q-ml-lg">
              <q-btn
                class="last-car-information q-pl-md q-pr-md q-mt-md"
                @click="getIdCar"
                style="background-color: #C10015"
              >
                Подать заявку
              </q-btn>
              <q-tabs v-model="dialog1"></q-tabs>
            </div>
          </div>
        </template>
        <q-dialog v-model="dialog1">
          <q-card-section class="bg-white information" style="height: fit-content">
            <q-input
              outlined
              v-model="FIO"
              label="ФИО"
              class="q-pb-lg margin"
              clearable
              :rules="[val => !!val || 'Обязательное поле']"
              lazy-rules
            />
            <q-input
              outlined
              v-model="number"
              label="Номер телефона для связи"
              class="q-pb-lg margin"
              unmasked-value
              autocomplete="off"
              mask="+7 (###) ###-##-##"
              placeholder="+7 (___) ___-__-__"
              clearable
              :rules="[
              val => !!val || 'Обязательное поле',
              val => val.length > 9 || 'Заполните номер полностью',
              ]"
              lazy-rules
            />
            <q-input
              outlined
              v-model="mail"
              label="Введите email"
              class="q-pb-lg margin"
              clearable
              :rules="[
                value => !!value || 'Обязательное поле',
                value => /^\S{2,}@\S{2,}\.\S{2,}$/.test(value) || 'Укажите корректный email',
              ]"
              lazy-rules
            />

            <q-input
              outlined
              v-model="CarOthers"
              label="Ваш комментарий"
              class="q-pb-md margin"
              clearable
              :rules="[val => !!val || 'Обязательное поле']"
              lazy-rules
            />
            <q-input
              readonly
              outlined
              label="Цена машины"
              class="q-pb-md margin"
              v-model="carPrice"
            />
            <q-input
              readonly
              outlined
              label="Город доставки"
              class="q-pb-md margin"
              v-model="selectCity"
            />
            <q-input
              readonly
              outlined
              label="Цена доставки"
              class="q-pb-md margin"
              v-model="selectDeliveryPrice"
            />
            <q-btn
              class="last-car-information q-mt-md"
              @click="feedback"
              style="background-color: #C10015"
            >
              Отправить
            </q-btn>
          </q-card-section>
        </q-dialog>
      </div>

      <template v-if="device===2 && isLoadingList===true">
        <q-skeleton height="20vh" class="q-ma-md" width="80%"></q-skeleton>
      </template>
      <template v-if="device===2 && isLoadingList===false">
        <div class="q-pl-lg q-pt-lg" style="font-family: 'Noto Sans KR', sans-serif; font-size: medium; font-weight: bold; color: #383535">
          <span>Похожие предложения</span>
        </div>
        <template v-if="similarPriceCars.length!==25 && similarManufacturerCars.length!==35">
          <div class="row justify-between">
            <div style="width: 40%" class="q-ml-lg">
              <q-list class="carlist flex column">
                <q-card
                  v-for="car in similarManufacturerCars"
                  :key="car.id"
                  class="card q-mr-sm shadow-0 q-mt-sm"
                  style="width: 100%; border-radius: 15px; border: solid 1px #383535;"
                >
                  <q-card-section class="q-pl-xs q-pr-xs q-pt-xs q-pt-none card-img flex column">
                    <div class="pre-carousel">
                      <q-carousel
                        animated
                        v-model="car.slide"
                        infinite
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        @mouseenter="autoplay = false"
                        @mouseleave="autoplay = true"
                        class="text-white"
                        style="width: 100%"
                      >
                        <!--                <q-carousel-slide name="1" img-src="../assets/noImageFound.png"/>-->
                        <q-carousel-slide
                          name="1"
                          :img-src="car.photo1"
                        />
                        <q-carousel-slide
                          name="2"
                          :img-src="car.photo2"
                        />
                        <q-carousel-slide
                          name="3"
                          :img-src="car.photo3"
                        />
                      </q-carousel>
                    </div>
                  </q-card-section>
                  <q-card-section class="car-info q-px-sm q-pb-none q-pt-none column">
                    <div><span class="name q-ml-md"> {{ car.manufacturer }} </span></div>
                    <div style="width: 100%; border-bottom: solid #383535 1px"><span class="name q-ml-md"> {{
                        car.model
                      }} </span></div>

                    <div class="certificate q-ml-sm q-mt-sm q-pr-sm column">
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.badge }} </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.fuel }} </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.mileage }} км </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.formYear }} гв</span>
                      </div>
                    </div>
                    <div class="card-price flex q-ml-md">
                      <div style="width: auto; text-decoration: underline 2px #C10015"><span
                        class="main-price"> {{ FullPrice(car.price) }} </span></div>
                      <!--                              <div style="width: 100%"><span class="month-price q-mb-xs"> {{ CreditPrice(car.price) }} в мес.</span></div>-->
                    </div>

                  </q-card-section>
                  <q-card-section class="q-pt-none q-pb-sm">
                    <router-link style="text-decoration: underline 2px #C10015"
                                 class="q-ml-sm text-dark text-h6"
                                 :to="{ name: 'Car',
                                              params: {
                                                carId: car.id
                                              }
                                            }" target="_blank">
                      <span class="" style="font-weight: bold">Подробнее</span>
                    </router-link>
                  </q-card-section>
                </q-card>
              </q-list>
            </div>
            <div style="width: 40%" class="q-mr-lg">
              <q-list class="carlist flex column">
                <q-card
                  v-for="car in similarPriceCars"
                  :key="car.id"
                  class="card q-mr-sm shadow-0 q-mt-sm"
                  style="width: 100%; border-radius: 15px; border: solid 1px #383535;"
                >
                  <q-card-section class="q-pl-xs q-pr-xs q-pt-xs q-pt-none card-img flex column">
                    <div class="pre-carousel">
                      <q-carousel
                        animated
                        v-model="car.slide"
                        infinite
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        @mouseenter="autoplay = false"
                        @mouseleave="autoplay = true"
                        class="text-white"
                        style="width: 100%"
                      >
                        <!--                <q-carousel-slide name="1" img-src="../assets/noImageFound.png"/>-->
                        <q-carousel-slide
                          name="1"
                          :img-src="car.photo1"
                        />
                        <q-carousel-slide
                          name="2"
                          :img-src="car.photo2"
                        />
                        <q-carousel-slide
                          name="3"
                          :img-src="car.photo3"
                        />
                      </q-carousel>
                    </div>
                  </q-card-section>
                  <q-card-section class="car-info q-px-sm q-pb-none q-pt-none column">
                    <div><span class="name q-ml-md"> {{ car.manufacturer }} </span></div>
                    <div style="width: 100%; border-bottom: solid #383535 1px"><span class="name q-ml-md"> {{ car.model }} </span></div>
                    <div class="certificate q-ml-sm q-mt-sm q-pr-sm column">
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.badge }} </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.fuel }} </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.mileage }} км </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.formYear }} гв</span>
                      </div>
                    </div>
                    <div class="card-price flex q-ml-md">
                      <div style="width: auto; text-decoration: underline 2px #C10015"><span
                        class="main-price"> {{ FullPrice(car.price) }} </span></div>
                      <!--                              <div style="width: 100%"><span class="month-price q-mb-xs"> {{ CreditPrice(car.price) }} в мес.</span></div>-->
                    </div>

                  </q-card-section>
                  <q-card-section class="q-pt-none q-pb-sm">
                    <router-link style="text-decoration: underline 2px #C10015"
                                 class="q-ml-sm text-dark text-h6"
                                 :to="{ name: 'Car',
                                              params: {
                                                carId: car.id
                                              }
                                            }" target="_blank">
                      <span class="" style="font-weight: bold">Подробнее</span>
                    </router-link>
                  </q-card-section>
                </q-card>
              </q-list>
            </div>
          </div>
        </template>
        <template v-else-if="similarPriceCars.length===25 && similarManufacturerCars.length!==35">
          <div class="row justify-between">
            <div style="width: 40%" class="q-ml-lg">
              <q-list class="carlist flex column">
                <q-card
                  v-for="car in similarManufacturerCars"
                  :key="car.id"
                  class="card q-mr-sm shadow-0 q-mt-sm"
                  style="width: 100%; border-radius: 15px; border: solid 1px #383535;"
                >
                  <q-card-section class="q-pl-xs q-pr-xs q-pt-xs q-pt-none card-img flex column">
                    <div class="pre-carousel">
                      <q-carousel
                        animated
                        v-model="car.slide"
                        infinite
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        @mouseenter="autoplay = false"
                        @mouseleave="autoplay = true"
                        class="text-white"
                        style="width: 100%"
                      >
                        <!--                <q-carousel-slide name="1" img-src="../assets/noImageFound.png"/>-->
                        <q-carousel-slide
                          name="1"
                          :img-src="car.photo1"
                        />
                        <q-carousel-slide
                          name="2"
                          :img-src="car.photo2"
                        />
                        <q-carousel-slide
                          name="3"
                          :img-src="car.photo3"
                        />
                      </q-carousel>
                    </div>
                  </q-card-section>
                  <q-card-section class="car-info q-px-sm q-pb-none q-pt-none column">
                    <div><span class="name q-ml-md"> {{ car.manufacturer }} </span></div>
                    <div style="width: 100%; border-bottom: solid #383535 1px"><span class="name q-ml-md"> {{
                        car.model
                      }} </span></div>

                    <div class="certificate q-ml-sm q-mt-sm q-pr-sm column">
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.badge }} </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.fuel }} </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.mileage }} км </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.formYear }} гв</span>
                      </div>
                    </div>
                    <div class="card-price flex q-ml-md">
                      <div style="width: auto; text-decoration: underline 2px #C10015"><span
                        class="main-price"> {{ FullPrice(car.price) }} </span></div>
                      <!--                              <div style="width: 100%"><span class="month-price q-mb-xs"> {{ CreditPrice(car.price) }} в мес.</span></div>-->
                    </div>

                  </q-card-section>
                  <q-card-section class="q-pt-none q-pb-sm">
                    <router-link style="text-decoration: underline 2px #C10015"
                                 class="q-ml-sm text-dark text-h6"
                                 :to="{ name: 'Car',
                                              params: {
                                                carId: car.id
                                              }
                                            }" target="_blank">
                      <span class="" style="font-weight: bold">Подробнее</span>
                    </router-link>
                  </q-card-section>
                </q-card>
              </q-list>
            </div>
            <div style="width: 40%" class="q-mr-lg">
              {{ similarPriceCars }}
            </div>
          </div>
        </template>
        <template v-else-if="similarManufacturerCars.length===35 && similarPriceCars.length!==25">
          <div class="row justify-between">
            <div style="width: 40%" class="q-ml-lg">
              {{ similarManufacturerCars }}
            </div>
            <div style="width: 40%" class="q-mr-lg">
              <q-list class="carlist flex column">
                <q-card
                  v-for="car in similarPriceCars"
                  :key="car.id"
                  class="card q-mr-sm shadow-0 q-mt-sm"
                  style="width: 100%; border-radius: 15px; border: solid 1px #383535;"
                >
                  <q-card-section class="q-pl-xs q-pr-xs q-pt-xs q-pt-none card-img flex column">
                    <div class="pre-carousel">
                      <q-carousel
                        animated
                        v-model="car.slide"
                        infinite
                        transition-prev="slide-right"
                        transition-next="slide-left"
                        @mouseenter="autoplay = false"
                        @mouseleave="autoplay = true"
                        class="text-white"
                        style="width: 100%"
                      >
                        <!--                <q-carousel-slide name="1" img-src="../assets/noImageFound.png"/>-->
                        <q-carousel-slide
                          name="1"
                          :img-src="car.photo1"
                        />
                        <q-carousel-slide
                          name="2"
                          :img-src="car.photo2"
                        />
                        <q-carousel-slide
                          name="3"
                          :img-src="car.photo3"
                        />
                      </q-carousel>
                    </div>
                  </q-card-section>
                  <q-card-section class="car-info q-px-sm q-pb-none q-pt-none column">
                    <div><span class="name q-ml-md"> {{ car.manufacturer }} </span></div>
                    <div style="width: 100%; border-bottom: solid #383535 1px"><span class="name q-ml-md"> {{ car.model }} </span></div>
                    <div class="certificate q-ml-sm q-mt-sm q-pr-sm column">
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.badge }} </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.fuel }} </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.mileage }} км </span>
                      </div>
                      <div class=" q-ml-sm q-pt-sm">
                        <span> {{ car.formYear }} гв</span>
                      </div>
                    </div>
                    <div class="card-price flex q-ml-md">
                      <div style="width: auto; text-decoration: underline 2px #C10015"><span
                        class="main-price"> {{ FullPrice(car.price) }} </span></div>
                      <!--                              <div style="width: 100%"><span class="month-price q-mb-xs"> {{ CreditPrice(car.price) }} в мес.</span></div>-->
                    </div>

                  </q-card-section>
                  <q-card-section class="q-pt-none q-pb-sm">
                    <router-link style="text-decoration: underline 2px #C10015"
                                 class="q-ml-sm text-dark text-h6"
                                 :to="{ name: 'Car',
                                              params: {
                                                carId: car.id
                                              }
                                            }" target="_blank">
                      <span class="" style="font-weight: bold">Подробнее</span>
                    </router-link>
                  </q-card-section>
                </q-card>
              </q-list>
            </div>
          </div>
        </template>
        <template v-else-if="similarPriceCars.length===25 && similarManufacturerCars.length===35">
          <div class="row justify-between">
            <div style="width: 40%" class="q-ml-lg">
              {{ similarManufacturerCars }}
            </div>
            <div style="width: 40%" class="q-mr-lg">
              {{ similarPriceCars }}
            </div>
          </div>
        </template>

        </template>
      </div>

<!--      <div class="more-info">-->
<!--        <q-list class="flex column">-->
<!--          <div-->
<!--            v-for="infoblock in infoBlocks"-->
<!--            :key="infoblock"-->
<!--            class="info-block q-pa-xs"-->
<!--          >-->
<!--            {{ infoblock.name }}-->
<!--            <q-list class="flex column wrap">-->
<!--              <div-->
<!--                v-for="info in infoblock.info"-->
<!--                :key="info"-->
<!--                class="col-3 info-label wrap"-->
<!--              >-->
<!--                <div>-->
<!--                  <span> {{ info.label }} </span>-->
<!--                  <q-tooltip-->
<!--                    anchor="top left"-->
<!--                    self="bottom left"-->
<!--                    class="tooltip"-->
<!--                    delay="500"-->
<!--                  >-->
<!--                    {{ info.tooltip }}-->
<!--                  </q-tooltip>-->
<!--                </div>-->
<!--              </div>-->
<!--            </q-list>-->
<!--          </div>-->
<!--        </q-list>-->
<!--      </div>-->

    <template v-if="device===1 && isLoadingList===true">
      <q-skeleton height="95vh" class="q-ma-md" width="15%"></q-skeleton>
    </template>
    <template v-else-if="device===1 && isLoadingList===false  && 35!==similarManufacturerCars.length">
      <div style="width: 15%" class="q-mr-sm">
        <q-list class="carlist flex row">
          <div class="q-mt-sm" style="display: flex; flex-direction: row; justify-content: center; width: 100%">
            <span style="font-weight: bold; font-size: medium; color: #383535">
              похожие предложения
            </span>
          </div>
          <q-card
            v-for="car in similarManufacturerCars"
            :key="car.id"
            class="card q-mt-sm shadow-0"
          >
            <q-card-section class="q-pl-xs q-pr-xs q-pt-xs q-pt-none card-img flex column">
              <div class="pre-carousel">
                <q-carousel
                  animated
                  v-model="car.slide"
                  infinite
                  transition-prev="slide-right"
                  transition-next="slide-left"
                  @mouseenter="autoplay = false"
                  @mouseleave="autoplay = true"
                  class="text-white card-carousel"
                >
                  <!--                <q-carousel-slide name="1" img-src="../assets/noImageFound.png"/>-->
                  <q-carousel-slide
                    name="1"
                    :img-src="car.photo1"
                  />
                  <q-carousel-slide
                    name="2"
                    :img-src="car.photo2"
                  />
                  <q-carousel-slide
                    name="3"
                    :img-src="car.photo3"
                  />
                </q-carousel>
              </div>
            </q-card-section>
            <q-card-section class="car-info q-px-sm q-pb-none q-pt-none column">
              <div><span class="name q-ml-md"> {{ car.manufacturer }} </span></div>
              <div style="width: 100%; border-bottom: solid #383535 1px"><span class="name q-ml-md"> {{ car.model }} </span></div>

              <div class="certificate q-ml-sm q-mt-sm q-pr-lg column">
                <div>
                  <span class=" q-ml-sm q-pt-sm"> {{ car.badge }} </span>
                </div>

                <div>
                  <span class=" q-ml-sm q-pt-sm"> {{ car.fuel }} </span>
                </div>
                <div>
                  <span class=" q-ml-sm q-pt-sm"> {{ car.mileage }} км </span>
                </div>
                <div>
                  <span class=" q-ml-sm q-pt-sm"> {{ car.formYear }} гв</span>
                </div>
              </div>
              <div class="card-price flex q-ml-md">
                <div style="width: auto; text-decoration: underline 2px #C10015"><span class="main-price"> {{ FullPrice(car.price) }} </span></div>
                <!--                              <div style="width: 100%"><span class="month-price q-mb-xs"> {{ CreditPrice(car.price) }} в мес.</span></div>-->
              </div>

            </q-card-section>
            <q-card-section class="q-pt-none q-pb-sm">
              <router-link style="text-decoration: underline 2px #C10015"
                           class="q-ml-sm text-dark text-h6"
                           :to="{ name: 'Car',
                                              params: {
                                                carId: car.id
                                              }
                                            }" target="_blank">
                <span class="" style="font-weight: bold">Подробнее</span>
              </router-link>
            </q-card-section>
          </q-card>
        </q-list>
      </div>
    </template>
    <template v-else-if="device===1">
      <div style="width: 15%" class="q-ml-sm">
        <q-list class="carlist flex row">
          <div class="q-mt-sm" style="display: flex; flex-direction: row; justify-content: center; width: 100%">
            <span style="font-weight: bold; font-size: medium; color: #383535">
              похожие предложения
            </span>
          </div>
          <div>
            {{ similarManufacturerCars }}
          </div>
        </q-list>
      </div>
    </template>
  </q-page>
</template>

<script>
import {ref} from "vue";
import axios from "axios"
import { useQuasar } from "quasar";
export default {
  name: "PageCar",

  data() {
    return {
      carInfo: {},
      similarManufacturerCars: {},
      similarPriceCars: {},
      device: ref(null),
      isLoadingList: true,
      slide: ref(1),
      dialog1: ref(false),
      FIO: ref(''),
      number: ref(''),
      mail: ref(''),
      CarOthers: ref(''),
      idCar: ref(''),
      carPrice: ref(''),
      tab: ref(false),
      selectCity: ref("Владивосток"),
      selectCarType: ref("неважно"),
      selectDeliveryPrice: ref("0"),
      disableCarType: true,
      disableDeliveryPrice: true,
      cityOptions: [
        "Тюмень",
        "Челябинск",
        "Екатеринбург",
        "Пермь",
        "Уфа",
        "Самара",
        "Казань",
        "Нижний Новгород",
        "Волгоград",
        "Москва",
        "Воронеж",
        "СПБ",
        "Краснодар",
      ],
      carTypeOptions: [
        "Легковой автомобиль",
        "Внедорожник",
      ],
      deliveryPriceOptions: [
        "130 000₽",
        "135 000₽",
        "140 000₽",
        "150 000₽",
        "155 000₽",
        "157 000₽",
        "160 000₽",
        "165 000₽",
      ],
      // Информация сюда должна пушится, а пока, можете свернуть этот длинный объект.
      infoBlocks: [
        {
          name: 'Экстерьер/Интерьер',
          info: [
            {
              label: 'Люк',
              tooltip: 'Крыша автомобиля представляет собой открывающееся и закрывающееся стеклом устройство,' +
                ' включающее в себя люк и широкий панорамный люк.'
            },
            {
              label: 'Боковые зеркала с электроприводом складывания',
              tooltip: 'Это функция, позволяющая сложить боковые зеркала с помощью переключателя при парковке' +
                ' или в узком пространстве.'
            },
            {
              label: 'Электрически регулируемый руль',
              tooltip: 'Рулевое колесо можно электрически отрегулировать по наклону и телескопическому усилию,' +
                ' чтобы расположить его в положении, удобном для водителя.'
            },
            {
              label: 'Система автоматической оплаты',
              tooltip: 'Это система, которая автоматически оплачивает проезд с помощью карты, встроенной' +
                ' в терминал Hi-Pass, при выезде со шлагбаума Euro Expressway.'
            },
            {
              label: 'Фонари',
              tooltip: 'HID/LED налобные фонари по цвету близки к естественному свету по сравнению с обычными' +
                ' галогенными лампами, обеспечивая широкий обзор без утомления'
            },
            {
              label: 'Алюминевые диски',
              tooltip: 'Эти колеса изготовлены из алюминиевого сплава и легче обычных стальных колес.'
            },
            {
              label: 'Лепестки переключения передач',
              tooltip: 'Рядом с рулевым колесом установлен рычаг или кнопка, позволяющая переключать передачи,' +
                ' а в некоторых электрических и гибридных автомобилях можно регулировать чувствительность' +
                ' рекуперативного торможения.'
            },
            {
              label: 'Дверной замок с электроприводом',
              tooltip: 'Эта функция автоматически закрывает все двери, когда выключатель блокировки дверей' +
                ' запирается с места водителя.'
            },
            {
              label: 'Электропривод багажника',
              tooltip: 'Эта функция позволяет легко закрыть багажник с помощью выключателя без применения силы.'
            },
            {
              label: 'Багажник на крыше',
              tooltip: 'Багажником на крыше или рейлингом называют две вертикально установленные штанги,' +
                ' используемые для погрузки или фиксации грузов на крыше транспортного средства.'
            },
            {
              label: 'Кнопки на рулевом колесе',
              tooltip: 'Эта функция позволяет удобно управлять аудиоустройствами и устройствами громкой связи с' +
                ' помощью кнопок, установленных на рулевом колесе.'
            },
            {
              label: 'Уситель руля',
              tooltip: 'Это функция, которая помогает вам легко управлять автомобилем, дополняя его другой силой' +
                ' при повороте рулевого колеса. В прошлом использовался гидравлический тип, но в последнее время' +
                ' стал использоваться электрический тип.'
            },
            {
              label: 'Присасывание дверей',
              tooltip: 'Также называемая дверной системой с электроприводом, датчик, прикрепленный к внутренней' +
                ' части двери, обнаруживает, что дверь не полностью закрыта пассажиром, и активирует двигатель,' +
                ' чтобы полностью закрыть дверь.'
            },
            {
              label: 'Подогрев руля',
              tooltip: 'Эта функция подогревает холодный руль зимой.'
            },
            {
              label: 'Зеркало заднего вида в салоне(Антиблик)',
              tooltip: 'При езде в ночное время это устройство, устраняющее ослепление водителя в салонном зеркале' +
                ' фарами движущегося сзади автомобиля.'
            },
            {
              label: 'Электрический стеклоподъемник',
              tooltip: 'Это функция, позволяющая легко открывать и закрывать стеклянное окно, прикрепленное к двери' +
                ' с помощью выключателя.'
            }
          ]
        },
        {
          name: 'Безопасность',
          info: [
            {
              label: 'Подушка безопасности(сиденье водителя и переднего пассажира)',
              tooltip: 'Это устройство, которое защищает пассажиров автомобиля от ударов в случае столкновения' +
                ' транспортных средств и является репрезентативным устройством защиты пассажиров наряду с ремнями' +
                ' безопасности.'
            },
            {
              label: 'Противоскольжение(TCS)',
              tooltip: 'Эта система контролирует движущую силу автомобиля, чтобы предотвратить пробуксовку шин' +
                ' при трогании с места и ускорении на скользкой дороге.'
            },
            {
              label: 'Подвеска с электронным управлением(ECS)',
              tooltip: 'Это устройство, которое автоматически регулирует безопасность и комфорт вождения,' +
                ' регулируя высоту или демпфирующее усилие автомобиля, получая данные от компьютера в соответствии' +
                ' с условиями вождения.'
            },
            {
              label: 'Камера с обзором 360',
              tooltip: 'Это функция, которая отображает окружение автомобиля на 360-градусном мониторе при' +
                ' парковке или медленном движении вперед.'
            },
            {
              label: 'Подушка безопасности(боковая)',
              tooltip: 'безопасности установлены на сиденьях водителя и переднего пассажира для защиты боков' +
                ' пассажиров в случае столкновения автомобиля.'
            },
            {
              label: 'Контроль устойчивости кузова(ECS)',
              tooltip: 'В то время как ABS и TCS являются устройствами безопасности переднего/заднего хода,' +
                ' ESC контролирует недостаточную или избыточную поворачиваемость автомобиля во время крутых поворотов.'
            },
            {
              label: 'Датчик парковки(спереди, сзади)',
              tooltip: 'Эта система обнаруживает препятствия с помощью датчиков, установленных на переднем и' +
                ' заднем бамперах, при парковке или замедлении и уведомляет водителя предупреждающим звуком' +
                ' или монитором.'
            },
            {
              label: 'Подушка безопасности(шторка)',
              tooltip: 'Это подушка-шторка, которая проходит вдоль окна и защищает голову пассажира в случае' +
                ' бокового столкновения автомобиля.'
            },
            {
              label: 'Датчик давления в шинах(TPMS)',
              tooltip: 'Это датчик, который измеряет давление воздуха в 4 колесах автомобиля и уведомляет' +
                ' водителя в качестве предупреждения.'
            },
            {
              label: 'Система предупреждения о слепых зонах',
              tooltip: 'При смене полосы движения во время движения эта функция обнаруживает приближающийся' +
                ' сзади автомобиль (слепая зона) и информирует об этом водителя.'
            },
            {
              label: 'Антиблокировочная система тормозов(ABS)',
              tooltip: 'Это тормозная система, которая предотвращает скольжение водителя или его толкание' +
                ' в сторону, когда колеса блокируются во время резкого торможения, не позволяя водителю' +
                ' должным образом контролировать направление движения автомобиля.'
            },
            {
              label: 'Система предупреждения о выходе из полосы движения (LDWS)',
              tooltip: 'Если автомобиль покидает полосу без сигнала поворота, водитель уведомляется звуковым' +
                ' сигналом или сигналом светофора.В зависимости от модели рулевое колесо может вибрировать,' +
                ' чтобы предупредить водителя.'
            }
          ]
        },
        {
          name: 'Удобство/Мультимедиа',
          info: [
            {
              label: 'Круиз-контроль(обычный, адаптивный)',
              tooltip: 'Когда водитель устанавливает скорость, это устройство поддерживает скорость без' +
                ' нажатия водителем педали.'
            },
            {
              label: 'Умный ключ',
              tooltip: 'Это удобное устройство, позволяющее открыть дверь, просто взяв с собой смарт-ключ,' +
                ' или запустить двигатель, нажав кнопку.'
            },
            {
              label: 'Шторы/жалюзи(задние сиденья, задняя часть)',
              tooltip: 'Шторы/жалюзи для защиты от солнечного света.'
            },
            {
              label: 'Bluetooth',
              tooltip: 'Это функция, которая позволяет вам использовать различные файлы и информацию, например,' +
                ' телефонные звонки и музыку, путем беспроводного подключения вашего смартфона к автомобильной' +
                ' аудиосистеме Bluetooth.'
            },
            {
              label: 'Проекционный дисплей (HUD)',
              tooltip: 'Эта функция позволяет водителю легко проверять информацию (скорость, навигация),' +
                ' проецируя информацию об автомобиле на лобовое стекло водителя.'
            },
            {
              label: 'Беспроводной дверной замок',
              tooltip: 'Это удобное устройство, которое позволяет открывать автомобиль с помощью беспроводного' +
                ' пульта дистанционного управления, не вставляя ключ в дверь.'
            },
            {
              label: 'Навигация',
              tooltip: 'Когда вы устанавливаете пункт назначения, встроенный монитор GPS обеспечивает руководство' +
                ' по маршруту и различную информацию о дорожном движение.'
            },
            {
              label: 'CD плэйер',
              tooltip: 'Устройство, воспроизводящее компакт-диски с музыкой.'
            },
            {
              label: 'Электронный ручной тормоз(EPB)',
              tooltip: 'После парковки автомобиля эта функция позволяет легко управлять стояночным тормозом' +
                ' пальцами, не блокируя его рукой или ногой.'
            },
            {
              label: 'Датчик дождя',
              tooltip: 'Стеклоочистители обнаруживают капли воды на ветровом стекле и автоматически очищают' +
                ' ветровое стекло.'
            },
            {
              label: 'AV-монитор на переднем сиденье',
              tooltip: 'Устройство, оснащенное системой обработки изображений, например, телевизор или видеокамера' +
                ' внутри автомобиля.'
            },
            {
              label: 'USB-разъем',
              tooltip: 'Это терминал, который позволяет вам наслаждаться музыкой с портативного устройства,' +
                ' такого как MP3 или PMP, через аудиосистему автомобиля через внешний вход через разъем USB.'
            },
            {
              label: 'Авто кондиционер',
              tooltip: 'Это кондиционер, который поддерживает постоянную температуру, автоматически регулируя' +
                ' объем воздуха и температуру, когда пользователь устанавливает желаемую температуру.'
            },
            {
              label: 'Автоматический свет',
              tooltip: 'Это функция, которая автоматически включает и выключает свет, обнаруживая темноту в' +
                ' туннеле или вокруг него, без ручного включения фар автомобиля.'
            },
            {
              label: 'AV-монитор на заднем сиденье',
              tooltip: 'Устройство, оснащенное системой обработки изображений, например, телевизор или' +
                ' видеокамера внутри автомобиля.'
            },
            {
              label: 'AUX-разъем',
              tooltip: 'Это разъем, который позволяет прослушивать музыку с портативных устройств, таких как' +
                ' MP3, PMP и т. д., через соединительный разъем AUX через аудиосистему автомобиля.'
            }
          ]
        },
        {
          name: 'Лист',
          info: [
            {
              label: 'Кожаные сиденья',
              tooltip: 'Материал сиденья, используемый для сиденья автомобиля, представляет собой кожу, ' +
                'замшу и смесь ткани и кожи.'
            },
            {
              label: 'Сиденья с памятью(сиденье водителя, сиденья переднего пассажира)',
              tooltip: 'Это функция, которая фиксирует сиденье в удобном положении для сиденья водителя и' +
                ' переднего пассажира и удобно регулирует его в этом положении с помощью кнопки.'
            },
            {
              label: 'Электрические сиденья (сиденье водителя, сиденье переднего пассажира)',
              tooltip: 'Это функция, которая позволяет удобно регулировать высоту, вперед и назад, а также' +
                ' наклон спинки в нужное положение с помощью переключателя.'
            },
            {
              label: 'Вентиляция сидений (сиденье водителя, сиденье переднего пассажира)',
              tooltip: 'В жаркую погоду, при включении переключателя вентиляции сиденья в задней части,' +
                ' которая не достигает кондиционера, холодный воздух циркулирует через сиденье, отводя' +
                ' тепло и поддерживая комфорт.'
            },
            {
              label: 'Сиденье с электроприводом (заднее сиденье)',
              tooltip: 'Это функция, которая обычно используется в больших транспортных средствах и позволяет' +
                ' удобно регулировать высоту сиденья, вперед и назад, а также наклон спинки в нужное положение' +
                ' с помощью переключателя.'
            },
            {
              label: 'Вентиляция сиденья (заднее сиденье)',
              tooltip: 'Отдельная функция вентиляции для задних сидений обеспечивает комфорт благодаря нажатию' +
                ' переключателя вентиляции на ягодицах, которые в жаркую погоду находятся вне досягаемости' +
                ' кондиционера, чтобы обеспечить циркуляцию холодного воздуха к сиденью для контроля температуры.'
            },
            {
              label: 'Подогрев сидений (передние и задние сиденья)',
              tooltip: 'Это функция, которая обогревает сиденье, включая и выключая переключатель зимой.'
            },
            {
              label: 'Массаж в сиденьях',
              tooltip: 'Его также называют массажным сиденьем, и это функция, которая снимает усталость,' +
                ' добавляя функцию массажа к автокреслу.'
            }
          ]
        }
      ]
    }
  },

  setup() {
    const $q =  useQuasar()
    return {
      showNotif(message, type, options = {}) {
        if (type === "success") {
          $q.notify({
            ...options,
            type: 'positive',
            icon: 'fas fa-check-circle',
            message

          })
        } else if (type === "error") {
          $q.notify({
            ...options,
            type: 'negative',
            icon: 'fas fa-exclamation-triangle',
            message
          });
        } else if (type === "info") {
          $q.notify({
            ...options,
            type: 'info',
            icon: 'fas fa-info-circle',
            message
          });
        } else if (type === "warning") {
          $q.notify({
            ...options,
            type: 'warning',
            icon: 'fas fa-exclamation-triangle',
            message
          })
        }
      },
    }
  },

  computed: {
    disableCarType() {
      return this.selectCity === "Владивосток";
    },
  },

  methods: {
    nextslide() {
      // console.log(this.slide)
      if (parseInt(this.slide)<this.carInfo.photos.length) {
        this.slide++
      }
    },

    backslide(){
      if (parseInt(this.slide)>1) {
        this.slide--
      }
    },

    async feedback() {
      let data = {
        FIO:                 this.FIO ? this.FIO : null,
        number:              this.number ? "7" + this.number : null,
        mail:                this.mail ? this.mail : null,
        CarOthers:           this.CarOthers ? this.CarOthers : null,
        idCar:               this.idCar ? this.idCar : null,
        carPrice:            this.carPrice ? this.carPrice : null,
        selectCity:          this.selectCity ? this.selectCity : null,
        selectCarType:       this.selectCarType ? this.selectCarType : null,
        selectDeliveryPrice: this.selectDeliveryPrice ? this.selectDeliveryPrice : null,
      };
      for (let jsonKey in data){
        if (data[jsonKey]===null){
          data={}
        }
      }
      try {
        const response = await axios.post('/api/feedback/feedback', data);
        const response1 = await axios.post('/api/bot/send-feedback', data);
        // console.log(response);
        // console.log(response1);
        this.dialog1 = false
        // console.log(response.data.message);
        if (response.data.message === 'success') {
          this.showNotif('Данные отправлены успешно', "success")
          this.FIO = ''
          this.number = ''
          this.mail = ''
          this.CarOthers = ''
          this.selectCity = 'Владивосток'
          this.selectCarType = 'неважно'
          this.selectDeliveryPrice = '0'
        }
      } catch (e) {
        this.dialog1 = true
        this.showNotif(`Произошла ошибка при сохранении данных. Заполните все поля для ввода.`, "error")
        console.error(e);
        console.error('ERROR SAVE FEEDBACK INFO');

      }
    },

    async getIdCar() {
      this.idCar = this.carInfo.id
      this.carPrice = this.FullPrice(this.carInfo.price)
      this.dialog1 = true
      // console.log(this.idCar)
    },

    FullPrice(price) {
      return (new Intl.NumberFormat("en").format(price).replaceAll(","," ") + " руб.")
    },

    CreditPrice(price) {
      const Price = (price / 12).toFixed(2)
      return (new Intl.NumberFormat("en").format(Price) + " руб.")
    },

    resetSelect() {
      this.selectCity = "Владивосток"
      this.selectCarType = "неважно"
      this.selectDeliveryPrice = "0"
      this.disableCarType = true
    },

  },

  selectCity(val) {
      this.disableCarType = val === "Владивосток";
    },

  watch: {
    selectCarType(val) {
      if (this.selectCity === "Тюмень") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[0];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[4];
        }
      } else if (this.selectCity === "Челябинск") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[1];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[4];
        }
      } else if (this.selectCity === "Екатеринбург") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[0];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[4];
        }
      } else if (this.selectCity === "Пермь") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[1];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[4];
        }
      } else if (this.selectCity === "Уфа") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[1];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[4];
        }
      } else if (this.selectCity === "Самара") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[1];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[3];
        }
      } else if (this.selectCity === "Казань") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[1];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[5];
        }
      } else if (this.selectCity === "Нижний Новгород") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[1];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[4];
        }
      } else if (this.selectCity === "Волгоград") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[3];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[6];
        }
      } else if (this.selectCity === "Москва") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[2];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[4];
        }
      } else if (this.selectCity === "Воронеж") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[4];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[6];
        }
      } else if (this.selectCity === "СПБ") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[6];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[7];
        }
      } else if (this.selectCity === "Краснодар") {
        if (val === "Легковой автомобиль") {
          this.selectDeliveryPrice = this.deliveryPriceOptions[4];
        } else {
          this.selectDeliveryPrice = this.deliveryPriceOptions[6];
        }
      } else {
        this.selectDeliveryPrice = "0";
      }
    }
  },


  async beforeCreate() {
    try {
      const response = await axios.post('/api/cars/get-one', { id: this.$route.params.carId });
      this.carInfo = response.data.message;

      const handleResize = () => {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        if (screenHeight > screenWidth) {
          this.device = 2;
        } else {
          this.device = 1;
        }

        // console.log(this.device);
      };

      // Добавление обработчика события resize
      window.addEventListener('resize', handleResize);

      // Инициальный вызов функции handleResize для получения размеров страницы
      handleResize();

      const responseSimilarManufacturerCars = await axios.post('/api/cars/get-similar-manufacturer-cars', { manufacturer: this.carInfo.manufacturer, modelGroup: this.carInfo.modelGroup, id: this.carInfo.id });
      const responseSimilarPriceCars = await axios.post('/api/cars/get-similar-price-cars', { price: this.carInfo.price, id: this.carInfo.id, manufacturer: this.carInfo.manufacturer, modelGroup: this.carInfo.modelGroup,});

      if (responseSimilarManufacturerCars.data.message.data.length > 0) {
        this.similarManufacturerCars = responseSimilarManufacturerCars.data.message.data;
        for (let i = 0; i < this.similarManufacturerCars.length; i++) {
          this.similarManufacturerCars[i].slide = '1';
        }
      } else {
        this.similarManufacturerCars = 'Похожих машин по марке и модели нет';
      }

      if (responseSimilarPriceCars.data.message.data.length > 0) {
        this.similarPriceCars = responseSimilarPriceCars.data.message.data;
        for (let i = 0; i < this.similarPriceCars.length; i++) {
          this.similarPriceCars[i].slide = '1';
        }
      } else {
        this.similarPriceCars = 'Похожих машин по цене нет';
      }

      this.isLoadingList = false;
    } catch (err) {
      console.error(err);
    }
  },
}
</script>
<style lang="scss">
@mixin info-button(
  $width: auto,
  $color: $dark,
  $icon-color: $dark,
  $border-size: 2em,
  $icon-margin: 0.1em 0.4em 0 0.7em,
){
  border-bottom: solid 2px $primary-dark;
  width: $width;

  span {
    vertical-align: top;
    color: $color;
  }

  i {
    font-size: 1.2em;
    margin: $icon-margin;
    color: $icon-color;
  }
};
.carlist {
  .card {
    width: 22em;
    height: auto;
    border-radius: 15px;
    border: solid 1px $grey-5;
    transition: all .2s cubic-bezier(0.45, 0, 0.55, 1), box-shadow 0.3s cubic-bezier(0.45, 0, 0.55, 1);
    transform: scale(1) translate(0, 0);

    &:hover {
      transform: scale(1.02) translate(0, -20px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.3) !important;
    }

    .card-img {
      width: 100%;

      .pre-carousel {
        max-height: 40vh;

        .q-carousel {
          width: 100%;
          max-width: 90vw;
          height: auto;

          .q-panel {
            height: 8em;
            width: 100%;
            max-width: 90vw;
            max-height: 32vh;
            border-radius: 15px !important;
          }

          .q-carousel__slides-container {
            height: auto;
          }

        }
      }
    }

    .car-info {

      .info-list {
        .q-list {
          .info-block {
            @include info-button(
              $width: auto,
            );

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 0.1em 0.5em 0.1em 0;
            font-family: 'Noto Sans KR', sans-serif;

            .q-icon {
              margin-bottom: 0.2em;
            }
          }
        }
      }
    }
  }
}
</style>
