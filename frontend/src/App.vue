<template>
  <v-app>
    <v-app-bar app>
      <v-avatar>
        <img src="@/assets/logo.png" alt="icon" />
      </v-avatar>
      <v-toolbar-title class="ml-3">Member Filter</v-toolbar-title>
      <v-spacer />
      <div v-if="!loading" class="count">
        {{ count }}
      </div>
      <v-spacer></v-spacer>
      <v-btn class="mr-3" color="green" @click="list">
        Generate List
        <v-icon class="ml-1">mdi-view-list-outline</v-icon>
      </v-btn>
      <v-btn color="primary" @click="refresh">
        Refresh
        <v-icon class="ml-1">mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main v-if="!loading" class="mt-6">
      <v-row class="mt-4">
        <v-col cols="1"></v-col>
        <v-col cols="6">
          <v-text-field
            v-model="search"
            label="Search"
            clearable
            append-icon="mdi-magnify"
          />
          <VirtualList
            style="height: 900px; overflow-y: auto"
            :data-key="'userId'"
            :data-sources="searchFilter"
            :data-component="MemberComponent"
          />
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="3">
          <RoleSelection />
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-main>
    <LoadingOverlay :loading="loading" :error="error" @refresh="refresh" />
  </v-app>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import { mapGetters } from 'vuex'
import LoadingOverlay from '@/components/LoadingOverlay'
import Member from '@/components/Member'
import RoleSelection from '@/components/RoleSelection'

export default {
  name: 'App',
  components: {
    LoadingOverlay,
    RoleSelection,
    VirtualList,
  },
  data() {
    return {
      MemberComponent: Member,
      members: [],
      loading: true,
      error: false,
      search: '',
    }
  },
  computed: {
    ...mapGetters(['roles', 'yesRoles', 'noRoles']),
    searchFilter() {
      if (!this.search) return this.roleFilter
      return this.roleFilter.filter((member) => {
        const lowerName = member.displayName.toLowerCase()
        const lowerTag = member.tag.toLowerCase()
        const lowerSearch = this.search.toLowerCase()
        return lowerName.includes(lowerSearch) || lowerTag.includes(lowerSearch)
      })
    },
    roleFilter() {
      if (!this.yesRoles.length && !this.noRoles.length) return this.members
      return [...this.members].filter((member) => {
        return (
          this.yesRoles.every((x) => member.roles.includes(x)) &&
          this.noRoles.every((x) => !member.roles.includes(x))
        )
      })
    },
    count() {
      return this.searchFilter.length
    },
  },
  mounted() {
    this.refresh()
  },
  watch: {
    searchFilter() {
      const roleCounts = this.roles.map((role) => {
        return this.searchFilter.reduce((a, b) => {
          if (b.roles.includes(role.id)) a++
          return a
        }, 0)
      })
      this.$store.commit('setRoleCounts', roleCounts)
    },
  },
  methods: {
    list() {
      const tags = this.searchFilter.map((x) => `${x.tag}</br>`).join('')
      const tab = window.open('about:blank', '_blank')
      tab.document.write(
        `<html lang="en"><head><title>Filtered Member List</title></head><body>${tags}</body></html>`,
      )
      tab.document.close()
    },
    refresh() {
      this.members = []
      this.error = false
      this.loading = true
      Promise.all([this.getRoles(), this.getMembers()])
        .then(() => {
          this.loading = false
        })
        .catch(() => (this.error = true))
    },
    async getRoles() {
      await this.$axios.get('/roles').then(({ data }) => {
        this.$store.commit('setRoles', data)
      })
    },
    async getMembers() {
      await this.$axios.get('/members').then(({ data }) => {
        this.members = data
          .map((x) => {
            return {
              ...x.member,
              tag: x.tag,
            }
          })
          .sort((a, b) => {
            const c = a.displayName.toLowerCase()
            const d = b.displayName.toLowerCase()
            if (c < d) return -1
            if (d > c) return 1
            return 0
          })
      })
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.count {
  color: #fff;
  font-size: 28px;
}
</style>
