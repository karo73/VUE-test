<template>
  <form
      class="filter-form q-pt-lg q-pb-md"
      method="get"
      @submit.prevent="filterData">
    <div class="filter-form__row row bg-white">
      <div class="filter-form__item col-3">
        <q-select
            v-model="filterStore.countrySelected"
            :options="filterStore.countryOptions"
            label="Страна"
            outlined
            transition-show="flip-up"
            transition-hide="flip-down"
            @update:model-value="countrySelectChange"
        />
      </div>
      <div class="filter-form__item col-3">
        <q-select
            v-model="filterStore.citySelected"
            :options="filterStore.cityOptions"
            :disable="filterStore.cityOptions.length === 0"
            label="Город"
            outlined
            transition-show="scale"
            transition-hide="scale"
            @update:model-value="citySelectChange"
        />
      </div>
      <div class="filter-form__item col-3">
        <q-select
            v-model="filterStore.serviceSelected"
            :options="filterStore.serviceOptions"
            label="Рубрика"
            outlined
            transition-show="jump-up"
            transition-hide="jump-up"
        />
      </div>
      <div class="filter-form__item col-3">
        <q-btn
            type="submit"
            align="left"
            class="filter-form__btn"
            color="secondary"
            label="Search"
        />
      </div>
    </div>
  </form>
</template>

<script>

  import { useFilterStore } from '@/stores/filter';
  import { useAdvertsStore } from '@/stores/adverts';
  import { Country } from '@/enums/countries';
  import { AdvertServiceType } from '@/enums/advertServiceType';
  import Cities from '@/api/geoApi';

  export default {
    created(){

      // Get country list
      this.filterStore.countryOptions = this.getCountryList();

      // Get city list
      Cities.getCities().then(cities => this.filterStore.cityList = cities);

      // Get services list
      this.filterStore.serviceOptions = this.getServicesList();

    },
    setup(){

      return {
        filterStore: useFilterStore(),
        advertsStore: useAdvertsStore(),
      };

    },
    methods: {
      filterData(){

        // Destructuring select fields
        const { value: selectedCountry } = this.filterStore.countrySelected || {};
        const { label: selectedCityName } = this.filterStore.citySelected || {};
        const { label: selectedServiceName } = this.filterStore.serviceSelected || {};

        this.advertsStore.filteredList = this.advertsStore.list.filter((advertItem) => {
          let isShowItem = true;

          // Remove item from the list if {country} is not the same as selected
          if (selectedCountry !== undefined && advertItem.city.country !== selectedCountry) {
            isShowItem = false;
          }

          // Remove item from the list if {city} is not the same as selected
          if (selectedCityName !== undefined && advertItem.city.name !== selectedCityName) {
            isShowItem = false;
          }

          // Remove item from the list if {serviceType} is not the same as selected
          if (selectedServiceName !== undefined && advertItem.serviceType !== selectedServiceName) {
            isShowItem = false;
          }

          return isShowItem;
        });

      },
      getCountryList(){

        // Get country list
        const countryList = Object.values(Country).filter((v) => isNaN(Number(v)));

        // Convert country list to select options
        return countryList.map((countryName, countryIndex) => ({
          label: countryName.charAt(0).toUpperCase() + countryName.slice(1),
          value: countryIndex
        }));

      },
      citySelectChange(){
        // Reset selected service
        this.filterStore.serviceSelected = null;
      },
      countrySelectChange(item){

        // Reset selected city and service
        this.filterStore.citySelected = null;
        this.filterStore.serviceSelected = null;

        // Update city list
        this.filterStore.cityOptions = this.filterStore.cityList.reduce((acc, city, cityIndex) => {
          city.country === item.value && acc.push({ label: city.name, value: cityIndex });
          return acc;
        }, []);

      },
      getServicesList(){

        // Get services list
        const servicesList = Object.values(AdvertServiceType);

        // Convert services list to select options
        return servicesList.map((countryName, countryIndex) => ({
          label: countryName,
          value: countryIndex
        }));

      }
    },
    data(){
      return {};
    }
  }
</script>

<style lang="scss">
  .filter-form {

    &__item {
      padding: 5px;
    }

    &__btn {
      height: 100%;
      width: 100%;
    }

  }
</style>