<template>
  <div class="adv-current" v-if="currentItem">
    <div class="adv-current__row row q-pt-lg">
      <div class="adv-current__col col-8">
        <div class="adv-current__content bg-white q-pa-md q-mr-sm">
          <router-link
              class="adv-current__link text-blue text-h6 q-mb-lg"
              :to="{
                path: `/${advertsStore.backRoute}`
              }"
          >
            <q-icon name="arrow_back" size="xs" class="q-mr-sm" />Назад
          </router-link>
          <h5 class="adv-current__header text-h5 q-mb-lg">{{ currentItem.header }}</h5>
          <p class="adv-current__keywords text-weight-light text-grey q-mb-lg">
            <q-icon name="key" size="xs" class="q-mr-sm" />{{ currentItem.serviceType }}
          </p>
          <p class="adv-current__text">{{ currentItem.post }}</p>
        </div>
      </div>
      <div class="adv-current__col col-4">
        <div class="adv-current__content bg-white q-pa-md q-ml-sm">
          <h6 class="text-h6 q-mb-md">Контакт</h6>
          <p class="adv-current__param text-black text-weight-bold">
            <q-icon name="person" size="xs" class="q-mr-sm" />{{ currentItem.user.name }}
          </p>
          <p class="adv-current__param text-black">
            <q-icon name="map" size="sm" class="q-mr-sm" />{{ currentItem.city.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <EmptyMessage
      v-else
      message="No such data."
  />
</template>

<script>
  import { useQuasar } from "quasar";
  import { useAdvertsStore } from '@/stores/adverts';
  import AdvertsApi from "@/api/advApi";
  import EmptyMessage from "@/views/partials/EmptyMessage.vue";

  export default {
    components: { EmptyMessage },
    created() {
      if ( this.advertsStore.filteredList.length ) {
        this.currentItem = this.getCurrentItem(this.$route.params.id);
      } else {
        // Decoration as async request happened
        this.showLoading(() => {
          // Get adverts list
          AdvertsApi.getAdverts().then((res) => {
            this.advertsStore.list = res;
            this.advertsStore.filteredList = res;
            this.currentItem = this.getCurrentItem(this.$route.params.id);
          });
        });
      }
    },
    methods: {
      getCurrentItem( routeId ){
        if ( routeId ) {
          const [foundItem] = this.advertsStore.filteredList.filter( advert => advert.id === +routeId );

          if ( foundItem ) {
            return foundItem;
          }
        }

        return null;
      }
    },
    setup(){
      const $q = useQuasar();

      return {
        showLoading ( cb ) {
          $q.loading.show();

          setTimeout(() => {
            $q.loading.hide();
            cb();
          }, 250)
        }
      };
    },
    data(){
      return {
        currentItem: null,
        advertsStore: useAdvertsStore()
      };
    }
  };
</script>

<style lang="scss">
  .adv-current {

    &__content {
      border: 1px solid #D5D5D6;
      border-radius: 4px;
      height: 100%;
    }

    &__link,
    &__param {
      display: flex;
      align-items: center;
    }

    &__link:hover {
      background-color: transparent;
      color: #000000 !important;
    }

  }
</style>