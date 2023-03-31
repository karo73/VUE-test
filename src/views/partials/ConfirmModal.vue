<template>
  <q-dialog>
    <q-card class="confirm-modal q-pa-md text-center">
      <p class="confirm-modal__text q-mb-lg">
        <slot></slot>
      </p>
      <div class="confirm-modal__btn-group">
        <q-btn
            class="confirm-modal__btn q-ml-sm q-mr-sm"
            color="red"
            label="yes"
            @click="confirmDeleteCB"
        />
        <q-btn
            class="confirm-modal__btn q-ml-sm q-mr-sm"
            color="primary"
            label="no"
            @click="cancelDeleteCB"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>

  export default {
    props: ['confirmDeleteCB', 'cancelDeleteCB']
  }

</script>

<style lang="scss">
  .confirm-modal {
    width: 350px;
  }
</style>