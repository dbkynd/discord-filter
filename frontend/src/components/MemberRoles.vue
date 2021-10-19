<template>
  <div class="chips">
    <div v-for="role in orderedRoles" :key="role.id">
      <Role :role="role" />
    </div>
  </div>
</template>

<script>
import Role from '@/components/Role'

export default {
  name: 'MemberRoles',
  props: ['roles'],
  components: {
    Role,
  },
  computed: {
    orderedRoles() {
      return [...this.roles].sort((a, b) => b.rawPosition - a.rawPosition)
    },
  },
}
</script>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
}
</style>
