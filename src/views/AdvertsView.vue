<template>
  <FilterForm />
  <AdvertItem
      v-for="advert in advertsStore.filteredList"
      v-bind:key="advert.id"
      :advert="advert"
  />
  <EmptyMessage
      v-if="advertsStore.filteredList.length === 0"
      message="There isn't any relevant data."
  />
</template>

<script>
  import { useQuasar } from 'quasar';
  import { useAdvertsStore } from '@/stores/adverts';

  import { ADVERTS_URL } from "@/constants/backUrl";

  import FilterForm from "@/views/partials/FilterForm.vue";
  import AdvertItem from "@/views/partials/AdvertItem.vue";
  import AdvertsApi from "@/api/advApi";
  import EmptyMessage from "@/views/partials/EmptyMessage.vue";

  export default {
    components: {
      EmptyMessage,
      AdvertItem,
      FilterForm
    },
    created(){
      // Set back url
      this.advertsStore.backRoute = ADVERTS_URL;

      if (!this.advertsStore.filteredList.length) {
        // Decoration as async request happened
        this.showLoading(() => {
          // Get adverts list
          AdvertsApi.getAdverts().then((res) => {
            this.advertsStore.list = res;
            this.advertsStore.filteredList = res;
          });
        });
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
        },
        advertsStore: useAdvertsStore()
      }
    },
    data() {
      return {};
    }
  }
</script>