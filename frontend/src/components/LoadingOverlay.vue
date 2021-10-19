<template>
  <v-overlay class="overlay" :value="loading" z-index="10">
    <div v-if="!error">
      <div class="mb-3">Fetching Armory Members</div>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>
    <div v-else>
      <img src="@/assets/NotLikeThis.png" width="500px" alt="NotLikeThis" />
      <div class="mt-3">Error fetching members. Please try again.</div>
      <v-btn color="primary" @click="refresh">Retry</v-btn>
    </div>
  </v-overlay>
</template>

<script>
export default {
  name: "LoadingOverlay",
  props: ["loading", "error"],
  methods: {
    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>

<style scoped>
.overlay {
  text-align: center;
  font-size: 28px;
}
</style>
