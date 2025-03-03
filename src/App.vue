<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  meta: {
    title: "Продажа авто из Кореи - каталог автомобилей из Южной Кореи | BusidoAvto",
    meta: {
      description: { name: 'description', content: "Продаем автомобили из Южной Кореи. 3 года успешной работы. Выбираете автомобиль в каталоге, заключаем договор, осматриваем, доставляем авто в любой регион России за 3-4 недели. Популярные марки автомобилей с маленьким пробегом "},
      keywords: { name: 'keywords', content: "Авто, аукционы, Корея, машины, доставка, продажа, Владивосток, пробег" },
    },
  },
})


</script>
