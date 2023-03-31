<template>
  <div class="admin-panel">
    <h5
        v-if="currentUser"
        class="q-mt-lg q-mb-lg"
    >Welcome: <span class="text-weight-bold text-blue">{{ currentUser.name }}</span></h5>

    <h6 class="admin-panel__sub-title text-weight-bold q-mb-md">
      Posts
      <q-btn
          color="green"
          label="Add new post"
          @click="addAdvertAction"
      />
    </h6>

    <div v-if="advertsFilteredList.length">
      <AdvertItem
          v-for="advert in advertsFilteredList"
          v-bind:key="advert.id"
          :advert="advert"
          showButtonGroup="true"
          :editButtonCB="() => editButtonCB(advert.id)"
          :deleteButtonCB="() => deleteButtonCB(advert.id)"
      />
    </div>
    <EmptyMessage
        v-else
        message="No posts."
    />

    <AdvertModal
        v-model="addAdvertModal"
        title="Add new advert"
        btnLabel="Add"
        :onSubmit="resetData"
    />

    <AdvertModal
        v-model="editAdvertModal"
        title="Edit advert"
        btnLabel="Edit post"
        :editMode="true"
        :currentAdvert="currentAdvert"
        :onSubmit="resetData"
    />

    <ConfirmModal
        v-model="showDeleteModal"
        :confirmDeleteCB="confirmDelete"
        :cancelDeleteCB="cancelDelete"
    >
      Are you sure that you want to delete <span class="text-weight-bold">{{ currentAdvert.header }}</span> advert?
    </ConfirmModal>

  </div>
</template>

<script>
  import { useAdminStore } from "@/stores/admin";
  import { useAdvertsStore } from "@/stores/adverts";

  import userApi from "@/api/userApi";
  import advApi from "@/api/advApi";
  import citiesApi from "@/api/geoApi";

  import { ADMIN_URL } from "@/constants/backUrl";

  import AdvertItem from "@/views/partials/AdvertItem.vue";
  import ConfirmModal from "@/views/partials/ConfirmModal.vue";
  import EmptyMessage from "@/views/partials/EmptyMessage.vue";
  import AdvertModal from "@/views/partials/AdvertModal.vue";

  export default {
    components: {
      AdvertModal,
      EmptyMessage,
      ConfirmModal,
      AdvertItem
    },
    created(){
      // Set back url
      this.advertsStore.backRoute = ADMIN_URL;

      // Get users list
      userApi.getUsers().then((userList) => {
        const [currentUserIndex] = userList.filter(user => user.id === this.adminStore.currentUserId);
        this.currentUser = currentUserIndex;
      });

      // Get adverts list
      this.getAdverts();

      // Get city list
      citiesApi.getCities().then(cities => this.adminStore.cityOptions = cities);

    },
    methods: {
      getAdverts(){
        advApi.getAdverts().then((advList) => {
          this.advertsFilteredList = advList.filter(advItem => advItem.user.id === this.adminStore.currentUserId);
        });
      },
      resetData(){
        this.addAdvertModal = false;
        this.editAdvertModal = false;
        this.advertsStore.list = [];
        this.advertsStore.filteredList = [];
        this.getAdverts();
      },
      getCurrentAdvertAndSetToData(id){
        const [currentAdvert] = this.advertsFilteredList.filter(advertItem => advertItem.id === id);
        this.currentAdvert = currentAdvert;
      },
      addAdvertAction(){
        this.addAdvertModal = true;
      },
      editButtonCB(id){
        this.getCurrentAdvertAndSetToData(id);
        this.editAdvertModal = true;
      },
      deleteButtonCB(id){
        this.getCurrentAdvertAndSetToData(id);
        this.showDeleteModal = true;
      },
      confirmDelete(){
        advApi.removeAdvert(this.currentAdvert.id);
        this.resetData();
        this.showDeleteModal = false;
      },
      cancelDelete(){
        this.showDeleteModal = false;
      }
    },
    setup(){
      return {
        adminStore: useAdminStore(),
      };
    },
    data() {
      return {
        currentUserData: [],
        currentUser: null,
        advertsStore: useAdvertsStore(),
        advertsFilteredList: [],
        addAdvertModal: false,
        editAdvertModal: false,
        showDeleteModal: false,
        currentAdvert: ''
      }
    }
  }
</script>

<style lang="scss">
  .admin-panel {

    &__sub-title {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

  }
</style>