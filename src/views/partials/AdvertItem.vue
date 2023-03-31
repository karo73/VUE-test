<template>
  <div class="adv-item bg-white q-mb-md">
    <router-link
        class="adv-item__link text-blue text-h5 q-mb-sm"
        :to="{
          path: `/adverts/${advert.id}`
        }"
    >{{ advert.header }}</router-link>
    <p class="adv-item__keywords text-weight-light">{{ advert.serviceType }}</p>
    <span class="adv-item__author text-blue q-mr-sm">{{ advert.user.name }}</span>
    <span class="adv-item__date text-grey">{{ dateConverter(advert.date) }}</span>
    <div v-if="showButtonGroup" class="adv-item__btn-group q-pt-lg">
      <q-btn
          color="primary"
          class="adv-item__btn q-mr-md"
          icon="edit"
          label="Edit"
          @click="editButtonCB"
      />
      <q-btn
          color="red"
          class="adv-item__btn"
          icon="delete"
          label="Delete"
          @click="deleteButtonCB"
      />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['advert', 'showButtonGroup', 'editButtonCB', 'deleteButtonCB'],
    methods: {
      zeroSetter: d => d < 10 ? '0'+d : d,
      dateConverter( d ){
        const newDate = new Date(d);
        const fullYear = newDate.getFullYear();
        const month = this.zeroSetter(newDate.getMonth());
        const day = this.zeroSetter(newDate.getDate());
        const hours = this.zeroSetter(newDate.getHours());
        const minutes = this.zeroSetter(newDate.getMinutes());

        return `${day}.${month}.${fullYear}, ${hours}:${minutes}`;
      }
    }
  }
</script>

<style lang="scss">
  .adv-item {
    border: 1px solid #D5D5D6;
    border-radius: 4px;
    padding: 15px;

    &__link {
      display: block;

      &:hover {
        background-color: transparent;
        text-decoration: underline;
      }
    }

    &__author,
    &__date {
      font-size: 14px;
    }
  }
</style>