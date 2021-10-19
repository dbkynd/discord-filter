<template>
  <div class="role-container">
    <div>
      <span class="flex-grow">Has Role:</span>
      <span>Y&nbsp;&nbsp;|&nbsp;&nbsp;N</span>
    </div>
    <v-divider class="mb-2"></v-divider>
    <div v-for="role in roles" :key="role.id">
      <span class="flex-grow">
        <Role :role="role" />
      </span>
      <span>
        <input
          type="checkbox"
          name="has"
          :checked="role.selected === 'Y'"
          @click="checkedYes($event, role)"
        />
        <input
          type="checkbox"
          name="not"
          :checked="role.selected === 'N'"
          @click="checkedNo($event, role)"
        />
      </span>
    </div>
  </div>
</template>

<script>
import Role from "@/components/Role";

export default {
  name: "RoleSelection",
  props: ["roles"],
  components: {
    Role,
  },
  methods: {
    checkedYes(event, role) {
      if (event.target.checked) role.selected = "Y";
      else role.selected = null;
    },
    checkedNo(event, role) {
      if (event.target.checked) role.selected = "N";
      else role.selected = null;
    },
  },
};
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
