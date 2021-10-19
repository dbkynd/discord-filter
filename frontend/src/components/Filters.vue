<template>
  <div>
    <v-chip v-for="filter in filters" :key="filter.uuid" close label>
      {{ text(filter) }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: ["filters"],
  methods: {
    text(filter) {
      if (filter.key === "has") return `has role: ${filter.name}`;
      if (filter.key === "not") return `does not have role: ${filter.name}`;
    },
  },
};
</script>

<style scoped></style>
