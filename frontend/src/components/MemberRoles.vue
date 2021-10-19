<template>
  <div class="chips">
    <div class="chip" v-for="role in orderedRoles" :key="role.id">
      <div class="color-dot" :style="`background-color:${role.hex}`"></div>
      <img
        v-if="role.icon"
        class="role-icon"
        :src="`https://cdn.discordapp.com/role-icons/${role.id}/${role.icon}.png?size=20`"
        alt="role icon"
      />
      <div class="role-name">
        {{ role.name }}
      </div>
    </div>
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

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
}

.chip {
  color: #f6f6f7;
  display: flex;
  align-items: center;
  background: #292b2f;
  font-size: 12px;
  padding: 4px;
  margin: 0 4px 4px 0;
  font-weight: 500;
  border-radius: 4px;
  overflow-wrap: unset;
}

.color-dot {
  margin: 0 4px 0 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.role-name {
  margin-right: 4px;
}

.role-icon {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
</style>
