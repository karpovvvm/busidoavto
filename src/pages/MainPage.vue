<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="header bg-white " style="z-index: 2">
      <q-toolbar  style="border-bottom: solid 3px; border-color: #363636">
        <q-toolbar-title class="text-weight-bolder">
          <span style="color: #C10015; font-size: xx-large">BUSIDO</span> <span style="color: #363636">AVTO</span>
        </q-toolbar-title>
        <q-btn
          v-if="leftDrawerOpen===false"
          flat
          @click="toggleLeftDrawer"
          style="position: absolute; left: 0px; bottom: -43px"
          class="q-pa-none"
        >
          <q-icon name="fas fa-arrow-right" class="bg-primary-dark text-white q-pa-sm"/>
        </q-btn>
        <q-btn
          v-else
          flat
          @click="toggleLeftDrawer"
          class="q-pa-none"
          style="position: absolute; bottom: -43px; left: 300px;"
        >
          <q-icon name="fas fa-arrow-left" class="bg-primary-dark text-white q-pa-sm"/>
        </q-btn>
      </q-toolbar>
    </q-header>
  <!--------------------------Фильтры-------------------------->
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      bordered
    >
      <template v-if="isLoadingList">
        <q-skeleton height="600px" class="q-ma-md"/>
      </template>
      <template v-else>
        <div class="q-mt-sm q-pl-sm q-pb-none"
             style="font-size: medium; font-weight: bold; color: #363636; border-top: solid 1px #c0c0c0; border-radius:  5px 5px 0 0">
          <span>
            Цена
          </span>
        </div>
        <div style="display: flex; flex-direction: row">
          <q-input
            type="number"
            style="width: 50%"
            class="q-mb-sm"
            color="grey-9"
            label-color="grey-9"
            outlined
            clearable
            v-model="selectPriceMin"
            :placeholder="`От ${priceOptions.min}`"
            emit-value
            @clear="selectName(1, '', priceOptions.min, 'min', priceOptions.max)"
            @update:model-value="selectName(1,$event,priceOptions.min,'min', priceOptions.max)"
          />

          <q-input
            type="number"
            style="width: 50%"
            class="q-mb-sm"
            color="grey-9"
            label-color="grey-9"
            outlined
            clearable
            v-model="selectPriceMax"
            :placeholder="`До ${priceOptions.max}`"
            emit-value
            @clear="selectName(1, '', priceOptions.max, 'max', priceOptions.min)"
            @update:model-value="selectName(1,$event,priceOptions.max,'max', priceOptions.min)"
          />
        </div>

        <q-select
          class="q-mb-sm"
          color="grey-9"
          label-color="grey-9"
          outlined
          clearable
          v-model="selectManufacturer"
          :options="manufacturerOptions"
          label="Марка"
          emit-value
          use-input
          option-value="manufacturer"
          :loading="manufacturerLoading"
          @filter="filterManufacture"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-selection>
                <q-item-label>
                  <span style="font-weight: bold">{{ scope.label.manufacturer }}</span>
                </q-item-label>
              </q-item-selection>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              @remove="chipClear(scope)"
              :tabindex="scope.tabindex"
              class="q-ma-none"
            >
              <span style="font-weight: bold">{{ scope.opt }}</span>
            </q-chip>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                <span style="font-weight: bold">Данной марки нет</span>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          color="grey-9"
          label-color="grey-9"
          class="q-mb-sm"
          outlined
          clearable
          v-model="selectModelGroup"
          :options="modelGroupOptions"
          label="Модель"
          emit-value
          use-input
          option-value="modelGroup"
          :loading="modelGroupLoading"
          @filter="filterModelGroup"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-selection>
                <q-item-label>
                  {{ scope.label.modelGroup }}
                </q-item-label>
              </q-item-selection>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              @remove="chipClear(scope)"
              :tabindex="scope.tabindex"
              class="q-ma-none"
            >
              {{ scope.opt }}
            </q-chip>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Данной модели нет
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="q-pl-sm q-pb-none"
             style="font-size: medium; font-weight: bold; color: #363636; border-top: solid 1px #c0c0c0; border-radius:  5px 5px 0 0">
          <span>
            Год выпуска
          </span>
        </div>
        <div style="display: flex; flex-direction: row">
          <q-input
            type="number"
            style="width: 50%"
            class="q-mb-sm"
            color="grey-9"
            label-color="grey-9"
            outlined
            clearable
            v-model="selectformYearMin"
            :placeholder="`От ${formYearOptions.min}`"
            emit-value
            @clear="selectName(2, '', formYearOptions.min, 'min', formYearOptions.max)"
            @update:model-value="selectName(2,$event,formYearOptions.min,'min', formYearOptions.max)"
          />

          <q-input
            type="number"
            style="width: 50%"
            class="q-mb-sm"
            color="grey-9"
            label-color="grey-9"
            outlined
            clearable
            v-model="selectformYearMax"
            :placeholder="`До ${formYearOptions.max}`"
            emit-value
            @clear="selectName(2, '', formYearOptions.max, 'max', formYearOptions.min)"
            @update:model-value="selectName(2,$event,formYearOptions.max,'max', formYearOptions.min)"
          />
        </div>

        <q-select
          color="grey-9"
          label-color="grey-9"
          class="q-mb-sm"
          outlined
          clearable
          v-model="selectColor"
          :options="colorOptions"
          label="Цвет"
          emit-value
          use-input
          option-value="color"
          :loading="colorLoading"
          @filter="filterColor"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-selection>
                <q-item-label>
                  {{ scope.label.color }}
                </q-item-label>
              </q-item-selection>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              @remove="chipClear(scope)"
              :tabindex="scope.tabindex"
              class="q-ma-none"
            >
              {{ scope.opt }}
            </q-chip>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Данного цвета нет
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          color="grey-9"
          label-color="grey-9"
          class="q-mb-sm"
          outlined
          clearable
          v-model="selectTransmission"
          :options="transmissionOptions"
          label="КПП"
          emit-value
          use-input
          option-value="transmission"
          :loading="transmissionLoading"
          @filter="filterTransmission"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-selection>
                <q-item-label>
                  {{ scope.label.transmission }}
                </q-item-label>
              </q-item-selection>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              @remove="chipClear(scope)"
              :tabindex="scope.tabindex"
              class="q-ma-none"
            >
              {{ scope.opt }}
            </q-chip>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Данного КПП нет
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          color="grey-9"
          label-color="grey-9"
          class="q-mb-sm"
          outlined
          clearable
          v-model="selectFuel"
          :options="fuelOptions"
          label="Тип топлива"
          emit-value
          use-input
          option-value="fuel"
          :loading="fuelLoading"
          @filter="filterFuel"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-selection>
                <q-item-label>
                  {{ scope.label.fuel }}
                </q-item-label>
              </q-item-selection>
            </q-item>
          </template>
          <template v-slot:selected-item="scope">
            <q-chip
              removable
              dense
              @remove="chipClear(scope)"
              :tabindex="scope.tabindex"
              class="q-ma-none"
            >
              {{ scope.opt }}
            </q-chip>
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Данного типа топлива нет
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <div class="q-pl-sm q-pb-none"
             style="font-size: medium; font-weight: bold; color: #363636; border-top: solid 1px #c0c0c0; border-radius:  5px 5px 0 0">
          <span>
            Пробег
          </span>
        </div>
        <div style="display: flex; flex-direction: row">
          <q-input
            type="number"
            style="width: 50%"
            class="q-mb-sm"
            color="grey-9"
            label-color="grey-9"
            outlined
            clearable
            v-model="selectMileageMin"
            :placeholder="`От ${mileageOptions.min}`"
            emit-value
            @clear="selectName(3, '', mileageOptions.min, 'min', mileageOptions.max)"
            @update:model-value="selectName(3,$event,mileageOptions.min,'min', mileageOptions.max)"
          />

          <q-input
            type="number"
            style="width: 50%"
            class="q-mb-sm"
            color="grey-9"
            label-color="grey-9"
            outlined
            clearable
            v-model="selectMileageMax"
            :placeholder="`До ${mileageOptions.max}`"
            emit-value
            @clear="selectName(3, '', mileageOptions.max, 'max', mileageOptions.min)"
            @update:model-value="selectName(3,$event,mileageOptions.max,'max', mileageOptions.min)"
          />
        </div>

        <div class="q-pl-sm q-pb-none"
             style="font-size: medium; font-weight: bold; color: #363636; border-top: solid 1px #c0c0c0; border-radius:  5px 5px 0 0">
          <span>
            Объём двигателя (см.куб)
          </span>
        </div>
        <div style="display: flex; flex-direction: row">
          <q-input
            type="number"
            style="width: 50%"
            class="q-mb-sm"
            color="grey-9"
            label-color="grey-9"
            outlined
            clearable
            v-model="selectDisplacementMin"
            :placeholder="`От ${displacementOptions.min}`"
            emit-value
            @clear="selectName(4, '', displacementOptions.min, 'min', displacementOptions.max)"
            @update:model-value="selectName(4,$event,displacementOptions.min,'min', displacementOptions.max)"
          />

          <q-input
            type="number"
            style="width: 50%"
            class="q-mb-sm"
            color="grey-9"
            label-color="grey-9"
            outlined
            clearable
            v-model="selectDisplacementMax"
            :placeholder="`До ${displacementOptions.max}`"
            emit-value
            @clear="selectName(4, '', displacementOptions.max, 'max', displacementOptions.min)"
            @update:model-value="selectName(4,$event,displacementOptions.max,'max', displacementOptions.min)"
          />
        </div>
      </template>
      <q-btn
        class="last-car-information q-ml-xl q-mt-md"
        @click="updateFilters"
        style="background-color: #C10015"
      >
        Применить фильтры
      </q-btn>
      <q-btn
        class="last-car-information q-ml-xl q-mt-md"
        @click="deleteFilters"
        style="background-color: #C10015"
      >
        Сбросить фильтры
      </q-btn>
    </q-drawer>

    <q-page-container class="flex flex-center">
      <div class="content" style="min-height: 88vh">
        <!--<TransitionBlock>-->
        <template v-if="isLoadingList">
          <q-list class="carlist flex row">
            <q-card
              v-for="i in 4"
              class="card q-ml-xl q-mr-sm q-mt-lg shadow-0"
            >
              <q-skeleton type="text" height="300px"/>
            </q-card>
          </q-list>
        </template>

        <template v-else>
          <q-list class="carlist flex row">
            <q-card
              v-for="car in carLists"
              :key="car.id"
              class="card q-ml-xl q-mr-sm q-mt-lg shadow-0"
            >
              <q-card-section class="q-pl-xs q-pr-xs q-pt-xs q-pt-none card-img flex column">
                <div class="pre-carousel">
                  <q-carousel
                    animated
                    v-model="car.slide"
                    navigation
                    infinite
                    arrows
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
                <div style="width: 100%">
                  <router-link
                    style="color: #383535; text-decoration: none;"
                    :to="{ name: 'Car',
                                              params: {
                                                carId: car.id
                                              }
                                            }" target="_blank">
                    <span class="name q-ml-md" style=""> {{ car.manufacturer }} </span>
                  </router-link>
                </div>
                <div style="width: 100%; border-bottom: solid #383535 1px">
                  <router-link
                    style="color: #383535; text-decoration: none"
                    :to="{ name: 'Car',
                                              params: {
                                                carId: car.id
                                              }
                                            }" target="_blank">
                    <span class="name q-ml-md" style=""> {{ car.model }} </span>
                  </router-link>
                </div>
                <div class="certificate q-ml-sm q-mt-sm q-pr-lg column">
                  <div class="q-ml-sm">
                    <span class="q-pt-sm"> {{ car.badge }} </span>
                    <span class="q-ml-sm q-pt-sm"> {{ car.fuel }} </span>
                  </div>
                  <div>
                    <span class="q-ml-sm q-pt-sm"> {{ car.mileage }} км </span>
                    <span class="q-ml-sm q-pt-sm"> {{ car.formYear }} гв</span>
                  </div>
                </div>
                <div class="card-price flex q-ml-md">
                  <div style="width: auto; text-decoration: underline 2px #C10015"><span class="main-price"> {{ FullPrice(car.price) }} </span></div>
                  <!--<div style="width: 100%"><span class="month-price q-mb-xs"> {{ CreditPrice(car.price) }} в мес.</span></div>-->
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
        </template>
      </div>
      <!--      Пагинация-->
      <div class="flex row">
        <q-btn class="transparent q-pa-none" flat round @click="PreviusPage">
          <q-icon size="l" style="color: #C10015" name="fas fa-arrow-left"></q-icon>
        </q-btn>
        <template v-if="maxpage===1">
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage)" style=" color: #1D1D1D">{{ shoppage }}</q-btn>
        </template>
        <template v-else-if="maxpage===2 && shoppage===1">
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(1)" style=" color: #1D1D1D">1</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(2)" style=" color: #C10015">2</q-btn>
        </template>
        <template v-else-if="maxpage===2 && shoppage===2">
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(1)" style=" color: #C10015">1</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(2)" style=" color: #1D1D1D">2</q-btn>
        </template>
        <template v-else-if="shoppage===1">
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage)" style=" color: #1D1D1D">{{ shoppage }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage+1)" style=" color: #C10015">{{ shoppage + 1 }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage+2)" style=" color: #C10015">{{ shoppage + 2 }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(maxpage)" style=" color: #C10015">{{ maxpage }}</q-btn>
        </template>
        <template v-else-if="shoppage===2">
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(1)" style=" color: #C10015">1</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage)" style=" color: #1D1D1D">{{ shoppage }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage+1)" style=" color: #C10015">{{ shoppage + 1 }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(maxpage)" style=" color: #C10015">{{ maxpage }}</q-btn>
        </template>
        <template v-else-if="shoppage===maxpage">
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(1)" style=" color: #C10015">1</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage-2)" style=" color: #C10015">{{ shoppage - 2 }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage-1)" style=" color: #C10015">{{ shoppage - 1 }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(maxpage)" style=" color: #1D1D1D">{{ maxpage }}</q-btn>
        </template>
        <template v-else-if="shoppage===maxpage-1">
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(1)" style=" color: #C10015">1</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage-1)" style=" color: #C10015">{{ shoppage - 1 }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage)" style=" color: #1D1D1D">{{ shoppage }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage+1)" style=" color: #C10015">{{ shoppage + 1 }}</q-btn>
        </template>
        <template v-else-if="2<shoppage && shoppage!=maxpage">
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(1)" style=" color: #C10015">1</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage-1)" style=" color: #C10015">{{ shoppage - 1 }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage)" style=" color: #1D1D1D">{{ shoppage }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(shoppage+1)" style=" color: #C10015">{{ shoppage + 1 }}</q-btn>
          <q-btn class="text-weight-bold text-h4 text-weight-bold" flat @click="ThisPage(maxpage)" style=" color: #C10015">{{ maxpage }}</q-btn>
        </template>

        <q-btn class="transparent q-pa-none" flat round @click="NextPage">
          <q-icon size="l" style="color: #C10015" name="fas fa-arrow-right"></q-icon>
        </q-btn>
      </div>
    </q-page-container>
<!--Футер-->
    <div style="position: relative; bottom: 0; width: 100%; min-height: 50px; align-items: end" class="q-pt-md bg-dark column wrap">
      <img src="../assets/denchik.jpg" width="75" style="position: absolute; top: 5px; left: 5px;">
      <div class="q-mr-md q-ml-sm q-mt-md" style="color: #F0E7D8; font-weight: bold"><span>Телефон: </span><a target="_blank" href="tel:+79126748144" style="text-decoration: #F0E7D8; color: #F0E7D8">+7 (912) 674 81-44</a></div>
      <div class="q-mr-md q-ml-sm q-mt-sm" style="color: #F0E7D8; font-weight: bold"><span>Эл. почта: <a target="_blank" href="mailto:Busidoavto@yandex.ru" style="text-decoration: #F0E7D8; color: #F0E7D8">Busidoavto@yandex.ru</a></span></div>
      <div class="q-mr-md q-ml-sm q-mt-sm" style="color: #F0E7D8; font-weight: bold"><span>Инстаграм*: <a target="_blank" href="https://instagram.com/busido.avto?igshid=YmMyMTA2M2Y=" style="text-decoration: #F0E7D8; color: #F0E7D8">busido.avto</a></span></div>
      <div class="q-mr-md q-ml-sm q-mt-sm" style="color: #F0E7D8; font-weight: bold"><span>Адрес: <a target="_blank" href="https://yandex.ru/maps/11168/nizhniy-tagil/house/vyazovskaya_ulitsa_9/YUAYfwBjQEECQFttfXVwc3ljYg==/?ll=59.973945%2C57.912506&z=16" style="text-decoration: #F0E7D8; color: #F0E7D8">г. Нижний Тагил, ул. Вязовского, 9</a></span></div>
      <div class="q-mt-lg q-mr-md q-ml-sm q-mt-sm" style="color: #F0E7D8; font-size: smaller"><span>* Запрещенный на территории РФ интернет-ресурс</span></div>
    </div>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { generateGetQueryParams } from '../scripts/helpers';
import TransitionBlock from 'components/TransitionBlock.vue';

export default {
  name: 'MainPage',
    components: {
      // TransitionBlock
    },

  data() {
    return {
      isLoadingList: false,
      totalCount: 0,
      perPage:  24,
      shoppage: 1,
      maxpage: ref(null),
      allcars: [],
      carsList: [],
      sortedCar: [],
      othodnyak: [],
      manufacturerLoading: false,
      manufacturerOptions: [],
      modelGroupLoading: false,
      modelGroupOptions: [],
      formYearOptions: [],
      colorLoading: false,
      colorOptions: [],
      transmissionLoading: false,
      transmissionOptions: [],
      fuelLoading: false,
      fuelOptions: [],
      priceOptions: {},
      mileageOptions: {},
      displacementOptions: {},
      tab: ref('1'),
      selectPriceMin: ref(null),
      selectPriceMax: ref(null),
      selectMileageMin: ref(null),
      selectMileageMax: ref(null),
      selectDisplacementMin: ref(null),
      selectDisplacementMax: ref(null),
      selectManufacturer: ref(null),
      selectModelGroup: ref(null),
      selectformYearMin: ref(null),
      selectformYearMax: ref(null),
      selectColor: ref(null),
      selectTransmission: ref(null),
      selectFuel: ref(null),
      icons: {
        fuel: "fas fa-sharp fa-solid fa-gas-pump",
        manufacturer: "fas fa-solid fa-engine",
        // formYear:       "fas fa-calendar-day",
      },
      leftDrawerOpen: false
    }
  },
  computed: {
    carLists() {
      if(this.sortedCar.length){
        return this.sortedCar
      }
      else {
        return this.carsList
      }
    },
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    async chipClear(scope){
      scope.removeAtIndex(scope.index)
      this.sortedCar = []
      // console.log(this.carsList);
    },

    async openPageCar(route, event) {
      event.preventDefault()
      event.stopPropagation()
      // console.log(route.params)

      // if (event.target.attributes.class.value.indexOf('material-icons') === -1) {
      await this.$router.push({name: route.name, params: route.params })
      // }
    },

    async generateCarsList() {
      this.isLoadingList = true;

      try {
        this.carsList = [];
        let request = {
          page:            this.shoppage,
          manufacturer:    this.selectManufacturer,
          modelGroup:      this.selectModelGroup,
          formYearMin:     this.selectformYearMin,
          formYearMax:     this.selectformYearMax,
          color:           this.selectColor,
          transmission:    this.selectTransmission,
          fuel:            this.selectFuel,
          minPrice:        this.selectPriceMin,
          maxPrice:        this.selectPriceMax,
          minMileage:      this.selectMileageMin,
          maxMileage:      this.selectMileageMax,
          minDisplacement: this.selectDisplacementMin,
          maxDisplacement: this.selectMileageMax
        };
        //query param в адресную строку
        const currentPath = this.$route.path;
        const newQueryParams = {...this.$route.query, ...request};
        const newQuery = generateGetQueryParams(newQueryParams);
        const newUrl = currentPath + '?' + newQuery;
        this.$router.push(newUrl);
        //-----------------------------
        request = generateGetQueryParams(request);
        const response = await axios.get(`/api/cars/get-all-car?${request}`);
        this.carsList = response.data.message.data;
        this.totalCount = response.data.message.count;
        this.maxpage = (Math.floor(this.totalCount / 24) + 1)

        for (let i = 0; i < this.carsList.length; i++) {
          this.carsList[i].slide = '1';
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoadingList = false;
      }
    },

    FullPrice(price) {
      return (new Intl.NumberFormat("en").format(price).replaceAll(","," ") + " р.")
    },

    CreditPrice(price) {
      const Price = (price / 12).toFixed(2)
      return (new Intl.NumberFormat("en").format(Price) + " р.")
    },

    async NextPage() {
        if (this.totalCount >= this.perPage * this.shoppage + 1) {
            this.shoppage += 1
            await this.generateCarsList();
        }
    },

    async PreviusPage() {
      if (this.shoppage !== 1) {
        this.shoppage -= 1
        this.carsList = []
          await this.generateCarsList();
      }
    },

    async ThisPage(huy) {
      this.shoppage = huy;
      await this.generateCarsList();
    },

    async updateFilters() {
        this.shoppage = 1;
        await this.generateCarsList();
    },

    async deleteFilters() {
      this.shoppage = 1;
      this.selectManufacturer =    null;
      this.selectModelGroup =      null;
      this.selectformYearMin =     null;
      this.selectformYearMax =     null;
      this.selectColor =           null;
      this.selectTransmission =    null;
      this.selectFuel =            null;
      this.selectPriceMin =        null;
      this.selectPriceMax =        null;
      this.selectMileageMin =      null;
      this.selectMileageMax =      null;
      this.selectDisplacementMin = null;
      this.selectDisplacementMax = null;
      await this.generateCarsList();
    },

    async filterManufacture(value, update, abort) {
        this.manufacturerLoading = true;
        try {
            const response = await axios.post('/api/cars/get-filter-manufacturer', { filter: value })
            this.manufacturerOptions = response.data.message.filter(option =>
              option.manufacturer.toLowerCase().includes(value.toLowerCase())
            );
            update();
        }
        catch (err) {
            console.error(err);
            abort();
        }
        finally {
            this.manufacturerLoading = false;
        }
    },

    async filterModelGroup(value, update, abort) {
      this.modelGroupLoading = true;
      let request = {}
      try {
        request = {
          manufacturer: this.selectManufacturer
        };
        const response = await axios.post('/api/cars/get-filter-model', request);
        this.modelGroupOptions = response.data.message.filter(option =>
          option.modelGroup.toLowerCase().includes(value.toLowerCase())
        );
        update();
      }
      catch (err) {
        console.error(err);
        abort();
      }
      finally {
        this.modelGroupLoading = false;
      }
    },

    async filterFormYear() {
      try {
        const response = await axios.post('/api/cars/get-filter-formYear')
        this.formYearOptions = response.data.message[0]
      }
      catch (err) {
        console.error(err);
      }
    },

    async filterColor(value, update, abort) {
      this.colorLoading = true;
      try {
        const response = await axios.post('/api/cars/get-filter-color')
        this.colorOptions = response.data.message.filter(option =>
          option.color.toLowerCase().includes(value.toLowerCase())
        );
        update();
      }
      catch (err) {
        console.error(err);
        abort();
      }
      finally {
        this.colorLoading = false;
      }
    },

    async filterTransmission(value, update, abort) {
      this.transmissionLoading = true;
      try {
        const response = await axios.post('/api/cars/get-filter-transmission')
        this.transmissionOptions = response.data.message.filter(option =>
          option.transmission.toLowerCase().includes(value.toLowerCase())
        );
        update();
      }
      catch (err) {
        console.error(err);
        abort();
      }
      finally {
        this.transmissionLoading = false;
      }
    },

    async filterFuel(value, update, abort) {
      this.fuelLoading = true;
      try {
        const response = await axios.post('/api/cars/get-filter-fuel')
        this.fuelOptions = response.data.message.filter(option =>
          option.fuel.toLowerCase().includes(value.toLowerCase())
        );
        update();
      }
      catch (err) {
        console.error(err);
        abort();
      }
      finally {
        this.fuelLoading = false;
      }
    },

    async filterPrice() {
      try {
        const response = await axios.post('/api/cars/get-filter-price')
        this.priceOptions = response.data.message[0]
      }
      catch (err) {
        console.error(err);
      }
    },

    async filterMileage() {
      try {
        const response = await axios.post('/api/cars/get-filter-mileage')
        this.mileageOptions = response.data.message[0]
      }
      catch (err) {
        console.error(err);
      }
    },

    async filterDisplacement() {
      try {
        const response = await axios.post('/api/cars/get-filter-displacement')
        this.displacementOptions = response.data.message[0]
      }
      catch (err) {
        console.error(err);
      }
    },

    checkInputMin(newValue, Extremum, secondExtremum) {
      const value = Number(newValue)
      const extremum = Number(Extremum)
      const max = secondExtremum

      if (!isNaN(value) && value < extremum) {
        return Extremum
      }else if (value > max) {
        return secondExtremum
      }

      return newValue !== '' ? newValue : null
    },
    checkInputMax(newValue, Extremum, secondExtremum) {
      const value = Number(newValue)
      const extremum = Number(Extremum)
      const min = secondExtremum

      if (!isNaN(value) && (value > extremum || value < min)) {
        return extremum
      }

      return newValue !== '' ? newValue : null
    },

    swapPrice() {
      if (
        this.selectPriceMin !== '' &&
        this.selectPriceMax !== '' &&
        this.selectPriceMin > this.selectPriceMax
      ) {
        const temp = this.selectPriceMin;
        this.selectPriceMin = this.selectPriceMax;
        this.selectPriceMax = temp;
      }
    },
    swapFormYear() {
      if (
        this.selectformYearMin !== '' &&
        this.selectformYearMax !== '' &&
        this.selectformYearMin > this.selectformYearMax
      ) {
        const temp = this.selectformYearMin;
        this.selectformYearMin = this.selectformYearMax;
        this.selectformYearMax = temp;
      }
    },
    swapMileage() {
      if (
        this.selectMileageMin !== '' &&
        this.selectMileageMax !== '' &&
        this.selectMileageMin > this.selectMileageMax
      ) {
        const temp = this.selectMileageMin;
        this.selectMileageMin = this.selectMileageMax;
        this.selectMileageMax = temp;
      }
    },
    swapDisplacement() {
      if (
        this.selectDisplacementMin !== '' &&
        this.selectDisplacementMax !== '' &&
        this.selectDisplacementMin > this.selectDisplacementMax
      ) {
        const temp = this.selectDisplacementMin;
        this.selectDisplacementMin = this.selectDisplacementMax;
        this.selectDisplacementMax = temp;
      }
    },

    selectName (number,newValue, Extremum, typeExtremum, secondExtremum) {
      if (number === 1 && typeExtremum === 'min') {
        this.selectPriceMin = newValue !== '' ? this.checkInputMin(newValue, Extremum, secondExtremum) : null
        if (this.selectPriceMin !== null && this.selectPriceMax !== null) {
          this.swapPrice();
        }
      } else if (number === 1 && typeExtremum === 'max') {
        this.selectPriceMax = newValue !== '' ? this.checkInputMax(newValue, Extremum, secondExtremum) : null
        if (this.selectPriceMin !== null && this.selectPriceMax !== null) {
          this.swapPrice();
        }
      } else if (number === 2 && typeExtremum === 'min') {
        this.selectformYearMin = newValue !== '' ? this.checkInputMin(newValue, Extremum, secondExtremum) : null
        if (this.selectformYearMin !== null && this.selectformYearMax !== null) {
          this.swapFormYear();
        }
      } else if (number === 2 && typeExtremum === 'max') {
        this.selectformYearMax = newValue !== '' ? this.checkInputMax(newValue, Extremum, secondExtremum) : null
        if (this.selectformYearMin !== null && this.selectformYearMax !== null) {
          this.swapFormYear();
        }
      } else if (number === 3 && typeExtremum === 'min') {
        this.selectMileageMin = newValue !== '' ? this.checkInputMin(newValue, Extremum, secondExtremum) : null
        if (this.selectMileageMin !== null && this.selectMileageMax !== null) {
          this.swapMileage();
        }
      } else if (number === 3 && typeExtremum === 'max') {
        this.selectMileageMax = newValue !== '' ? this.checkInputMax(newValue, Extremum, secondExtremum) : null
        if (this.selectMileageMin !== null && this.selectMileageMax !== null) {
          this.swapMileage();
        }
      } else if (number === 4 && typeExtremum === 'min') {
        this.selectDisplacementMin = newValue !== '' ? this.checkInputMin(newValue, Extremum, secondExtremum) : null
        if (this.selectDisplacementMin !== null && this.selectDisplacementMax !== null) {
          this.swapDisplacement();
        }
      } else if (number === 4 && typeExtremum === 'max') {
        this.selectDisplacementMax = newValue !== '' ? this.checkInputMax(newValue, Extremum, secondExtremum) : null
        if (this.selectDisplacementMin !== null && this.selectDisplacementMax !== null) {
          this.swapDisplacement();
        }
      }
    },

  },

  watch: {

  },

  mounted() {
    this.generateCarsList()
    this.filterPrice()
    this.filterMileage()
    this.filterDisplacement()
    // this.filterManufacture()
    // this.filterModel()
    this.filterFormYear()
    // this.filterColor()
    // this.filterTransmission()
    // this.filterFuel()
    const pageHeight = document.documentElement.scrollHeight
    // console.log(window.outerWidth + 'px')
    document.querySelector(':root').style.setProperty('--outer-width', window.outerWidth + 'px')
    document.querySelector(':root').style.setProperty('--page-height', pageHeight + 'px')
  }
}

</script>

<style>
.q-slider--h{
  width: 90%;
  margin-left: 5%;
}
::-webkit-scrollbar{
  width: 10px;
  height: 10px;

}
::-webkit-scrollbar-track {
  border: solid #1D1D1D 1px;

}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #383535;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {

}
 .q-field__label {
   font-weight: bold;
 }
</style>
