<template>
  <div class="role-container">
    <div>
      <span class="flex-grow">Has Role:</span>
      <span>Y&nbsp;&nbsp;|&nbsp;&nbsp;N</span>
    </div>
    <v-divider class="mb-2"></v-divider>
    <div v-for="(role, index) in roles" :key="role.id">
      <span class="flex-grow">
        <Role :role="role" :count="roleCounts[index]" />
      </span>
      <span>
        <input
          type="checkbox"
          name="has"
          :checked="role.selected === 'Y'"
          @click="checked($event, role, 'Y')"
        />
        <input
          type="checkbox"
          name="not"
          :checked="role.selected === 'N'"
          @click="checked($event, role, 'N')"
        />
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Role from '@/components/Role'

export default {
  name: 'RoleSelection',
  components: {
    Role,
  },
  computed: {
    ...mapGetters(['roles']),
    ...mapState(['roleCounts']),
  },
  methods: {
    checked(event, role, value) {
      if (event.target.checked) this.updateRole(role, value)
      else this.updateRole(role, null)
    },
    updateRole(role, value) {
      this.$store.commit('updateRole', { role, value })
    },
  },
}
</script>

<style scoped>
.role-container {
  background-color: #36393f;
  padding: 8px 16px;
  border-radius: 6px;
  color: #f6f6f7;
}

.role-container > div {
  display: flex;
}

.flex-grow {
  flex-grow: 1;
}

input {
  margin-left: 18px;
}
</style>
