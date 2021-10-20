<template>
  <div class="member-container mr-3">
    <v-row>
      <v-col cols="5" class="center-items">
        <v-avatar class="mr-3">
          <img :src="source.displayAvatarURL" alt="avatar" />
        </v-avatar>
        <div class="name-container">
          <div class="name" :style="`color:${getColor(source)};`">
            {{ source.displayName }}
          </div>
          <div class="tag">@{{ source.tag }}</div>
        </div>
      </v-col>
      <v-col cols="7" class="center-items">
        <span>
          <MemberRoles :roles="roleFilter(source.roles)" />
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MemberRoles from '@/components/MemberRoles'

export default {
  name: 'Member',
  props: ['source'],
  components: {
    MemberRoles,
  },
  computed: {
    ...mapGetters(['roles']),
  },
  methods: {
    getColor(member) {
      for (let i = 0; i < this.roles.length; i++) {
        if (i === this.roles.length - 1) return '#f6f6f7'
        if (this.roles[i].color === 0) return '#f6f6f7'
        if (member.roles.includes(this.roles[i].id)) {
          return this.roles[i].hex
        }
      }
    },
    roleFilter(roleIds) {
      const r = []
      roleIds.forEach((x) => {
        const y = this.roles.find((z) => z.id === x)
        if (y) r.push(y)
      })
      return r
    },
  },
}
</script>

<style scoped>
.member-container {
  background-color: #36393f;
  padding: 8px 16px;
  margin-bottom: 10px;
  border-radius: 6px;
}

.center-items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.name-container {
  line-height: 1.25em;
}

.name {
  font-size: 16px;
  font-weight: 500;
}

.tag {
  color: #72767d;
  font-size: 14px;
  font-weight: 400;
}
</style>
