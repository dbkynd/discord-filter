<template>
  <div class="member-container">
    <v-row>
      <v-col cols="5" class="center-items">
        <v-avatar class="mr-3">
          <img :src="member.displayAvatarURL" alt="avatar" />
        </v-avatar>
        <div style="display: block; line-height: 1.25em">
          <div class="name" :style="`color:${getColor(member)};`">
            {{ member.displayName }}
          </div>
          <div class="tag">@{{ member.tag }}</div>
        </div>
      </v-col>
      <v-col cols="7" class="center-items">
        <span>
          <MemberRoles :roles="roleFilter(member.roles)" />
        </span>
      </v-col>
    </v-row>
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
        if (i === this.roles.length - 1) return "#f6f6f7";
        if (this.roles[i].color === 0) return "#f6f6f7";
        if (member.roles.includes(this.roles[i].id)) {
          return this.roles[i].hex;
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

.center-items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.name {
  font-size: 16px;
  font-weight: 500;
}

.member-container {
  background-color: #36393f;
  padding: 8px 16px;
  margin-top: 10px;
  border-radius: 6px;
}

.tag {
  color: #72767d;
  font-size: 14px;
  font-weight: 400;
}
</style>
