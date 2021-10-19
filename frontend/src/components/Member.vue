<template>
  <div>
    <span v-if="member.displayAvatarURL">
      <img :src="member.displayAvatarURL" alt="avatar" />
    </span>
    <span class="name" :style="`color:#${getColor(member)};`">
      {{ member.displayName }} {{ member.tag }}
    </span>
    <span>
      <MemberRoles :roles="roleFilter(member.roles)" />
    </span>
  </div>
</template>

<script>
import MemberRoles from "@/components/MemberRoles";

export default {
  name: "Member",
  props: ["member", "roles"],
  components: {
    MemberRoles,
  },
  methods: {
    getColor(member) {
      for (let i = 0; i < this.roles.length; i++) {
        if (i === this.roles.length - 1) return "000";
        if (member.roles.includes(this.roles[i].id)) {
          return parseInt(this.roles[i].color).toString(16);
        }
      }
    },
    roleFilter(roleIds) {
      const r = [];
      roleIds.forEach((x) => {
        const y = this.roles.find((z) => z.id === x);
        if (y) r.push(y);
      });
      return r;
    },
  },
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.name {
  font-size: 20px;
  font-weight: 600;
}
</style>
