<template>
  <v-app>
    <v-app-bar app>
      <v-avatar>
        <img src="@/assets/logo.png" alt="icon" />
      </v-avatar>
      <v-toolbar-title class="ml-3">Armory Member Filter</v-toolbar-title>
      <v-spacer />
      <div class="count" v-if="!loading">Results: {{ count }}</div>
      <v-spacer></v-spacer>
      <v-btn @click="refresh" color="primary" class="mx-3">
        Refresh
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="mt-3" v-if="!loading">
      <v-row class="mt-4">
        <v-col cols="1"></v-col>
        <v-col cols="6">
          <v-text-field
            v-model="search"
            label="Search"
            clearable
            append-icon="mdi-magnify"
           />
          <virtual-list style="height: 900px; overflow-y: auto;"
          :data-key="'userId'"
          :data-sources="searchFilter"
          :data-component="itemComponent"
          />
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="3">
          <RoleSelection />
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </v-main>
    <LoadingOverlay :loading="loading" :error="error" @on:refresh="refresh" />
  </v-app>
</template>

<script>
import Member from "@/components/Member";
import LoadingOverlay from "@/components/LoadingOverlay";
import RoleSelection from "@/components/RoleSelection";
import VirtualList from 'vue-virtual-scroll-list'
import { mapGetters } from'vuex'

export default {
  name: "App",
  components: {
    LoadingOverlay,
    RoleSelection,
    'virtual-list': VirtualList
  },
  data() {
    return {
      itemComponent: Member,
      members: [],
      loading: true,
      error: false,
      search: '',
    };
  },
  computed: {
    ...mapGetters(['roles', 'yesRoles', 'noRoles']),
    searchFilter() {
      if (!this.search) return this.filteredMembers
      return this.filteredMembers.filter(member => {
        const lowerName = member.displayName.toLowerCase()
        const lowerTag = member.tag.toLowerCase()
        const lowerSearch = this.search.toLowerCase()
        return lowerName.includes(lowerSearch) || lowerTag.includes(lowerSearch)
      })
    },
    filteredMembers() {
      if (!this.yesRoles.length && !this.noRoles.length)
        return this.sortedMembers;
      return this.sortedMembers.filter((member) => {
        return (
          this.yesRoles.every((x) => member.roles.includes(x)) &&
          this.noRoles.every((x) => !member.roles.includes(x))
        );
      });
    },
    sortedMembers() {
      return [...this.members].sort((a, b) => {
        const c = a.displayName.toLowerCase();
        const d = b.displayName.toLowerCase();
        if (c < d) return -1;
        if (d > c) return 1;
        return 0;
      });
    },
    count() {
      return this.filteredMembers.length;
    },
  },
  mounted() {
    this.refresh();
  },
  watch: {
    searchFilter() {
      const roleCounts = this.roles.map(role => {
        return this.searchFilter.reduce((a, b) => {
          if (b.roles.includes(role.id)) a++
          return a
        }, 0)
      })
      this.$store.commit('setRoleCounts', roleCounts)
    },
  },
  methods: {
    refresh() {
      this.members = [];
      this.error = false;
      this.loading = true;
      Promise.all([this.getRoles(), this.getMembers()])
        .then(() => {
          this.loading = false;
        })
        .catch(() => (this.error = true));
    },
    async getRoles() {
      await this.$axios.get("/roles").then(({ data }) => {
        this.$store.commit('setRoles', data)
      });
    },
    async getMembers() {
      await this.$axios.get("/members").then(
        ({ data }) =>
          (this.members = data.map((x) => {
            return {
              ...x.member,
              tag: x.tag,
            };
          }))
      );
    },
  },
};
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
}

.hide {
  display: none;
}

.scroller {
  height: 100%;
}

</style>
