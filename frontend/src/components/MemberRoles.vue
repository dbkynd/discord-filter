<template>
  <div>
    <span
      v-for="role in orderedRoles"
      :style="`color:#${parseInt(role.color).toString(16)};`"
      :key="role.id"
    >
      <span v-if="role.icon">
        <img
          :src="`https://cdn.discordapp.com/role-icons/${role.id}/${role.icon}.png?size=20`"
          alt="role icon"
        />
      </span>
      {{ role.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "MemberRoles",
  props: ["roles"],
  computed: {
    orderedRoles() {
      return [...this.roles].sort((a, b) => b.rawPosition - a.rawPosition);
    },
  },
};
</script>

<style scoped></style>
