<template>
  <div class="role">
    <div class="color-dot" :style="`background-color:${role.hex}`"></div>
    <img
      v-if="role.icon"
      class="role-icon"
      :src="`https://cdn.discordapp.com/role-icons/${role.id}/${role.icon}.png?size=20`"
      alt="role icon"
    />
    <div class="role-name">
      {{ role.name }}
      <span v-if="count" class="count">{{ count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Role",
  props: ["role", 'count'],
};
</script>

<style scoped>
.role {
  position: relative;
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

.count {
  font-size: 12px;
  margin-left: auto;
  position: absolute;
  right: 4px;
  color: #8f8f91;
}
</style>
