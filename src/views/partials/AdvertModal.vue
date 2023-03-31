<template>
  <q-dialog>
    <q-card class="advert-modal q-pa-md">
      <form
          action="#"
          class="advert-modal__form"
          method="get"
          @submit.prevent="formSubmit"
      >
        <h5 class="q-mb-lg text-weight-bold">{{ title }}</h5>
        <q-input
            class="q-mb-md"
            v-model="header"
            outlined
            label="Header"
            required
        />
        <q-input
            class="advert-modal__textarea q-mb-md"
            v-model="post"
            outlined
            label="Post"
            type="textarea"
            required
        />
        <q-select
            class="q-mb-md"
            v-model="citySelected"
            :options="cityOptions"
            label="Город"
            outlined
            transition-show="scale"
            transition-hide="scale"
        />
        <q-select
            class="q-mb-md"
            v-model="serviceSelected"
            :options="serviceOptions"
            label="Рубрика"
            outlined
            transition-show="scale"
            transition-hide="scale"
        />
        <q-btn
            class="advert-modal__btn text-weight-bold full-width"
            color="green"
            :label="btnLabel"
            type="submit"
        />
      </form>
    </q-card>
  </q-dialog>
</template>

<script>
  import citiesApi from "@/api/geoApi";
  import advApi from "@/api/advApi";
  import userApi from "@/api/userApi";

  import { AdvertServiceType } from "@/enums/advertServiceType";
  import { useAdminStore } from "@/stores/admin";

  export default {
    props: ['title', 'btnLabel', 'editMode', 'onSubmit', 'currentAdvert'],
    updated(){
      if ( this.editMode ) {

        const [currentCity] = this.cityOptions.filter(city => city.label === this.currentAdvert.city.name);
        const [currentService] = this.serviceOptions.filter(service => service.label === this.currentAdvert.serviceType);

        this.header = this.currentAdvert.header;
        this.post = this.currentAdvert.post;
        this.citySelected = {
          label: currentCity.label,
          country: currentCity.country,
          value: currentCity.value
        };
        this.serviceSelected = {
          label: currentService.label,
          value: currentService.value
        };

      }
    },
    created(){

      // Get adverts list
      advApi.getAdverts().then(advList => this.advertsList = advList);

      // Get users list
      userApi.getUsers().then(usersList => {
        const [currentUser] = usersList.filter(user => user.id === this.adminStore.currentUserId);
        this.currentUser = currentUser;
      });

      // Get city list
      citiesApi.getCities().then(cities => this.cityOptions = cities.map( (city, cityIndex) => ({ label: city.name, value: cityIndex, country: city.country }) ));

      // Get services list
      this.serviceOptions = this.getServicesList();

    },
    methods: {
      getServicesList(){

        // Get services list
        const servicesList = Object.values(AdvertServiceType);

        // Convert services list to select options
        return servicesList.map((countryName, countryIndex) => ({
          label: countryName,
          value: countryIndex
        }));

      },
      formSubmit(){

        if (this.citySelected && this.serviceSelected) {

          const newPost = {
            user: {
              id: this.currentUser.id,
              name: this.currentUser.name
            },
            city: {
              country: this.citySelected.country,
              name: this.citySelected.label
            },
            date: new Date(),
            serviceType: this.serviceSelected.label,
            header: this.header,
            post: this.post
          };

          if (this.editMode) {
            newPost.id = this.currentAdvert.id;
            advApi.editAdvert(newPost);
          } else {
            // Set new id for the new post
            newPost.id = Math.max.apply(null, this.advertsList.map(advert => advert.id)) + 1;
            advApi.addAdvert(newPost);
          }

          this.onSubmit();

        }

      }
    },
    data(){
      return {
        header: '',
        adminStore: useAdminStore(),
        currentUser: null,
        advertsList: [],
        post: null,
        cityOptions: [],
        citySelected: null,
        serviceOptions: [],
        serviceSelected: null
      };
    }
  }
</script>

<style lang="scss">
  .advert-modal {
    width: 560px;

    &__textarea {
      overflow: hidden;
    }

    &__btn {
      font-size: 16px;
      height: 44px;
      text-transform: none;

      span {
        font-weight: bold;
      }
    }
  }
</style>