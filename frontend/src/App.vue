<template>
  <v-app>
    <v-app-bar app>
      <v-avatar>
        <img src="@/assets/logo.png" alt="icon" />
      </v-avatar>
      <v-toolbar-title class="ml-3">Armory Member Filter</v-toolbar-title>
    </v-app-bar>
    <v-main class="mt-3" v-if="!loading">
      <v-row>
        <v-col cols="12">
          <v-spacer />
          <v-btn @click="refresh" color="primary" class="mx-3">
            Refresh
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <Filters :filters="filters" />
          <v-container>
            <v-row class="count">
              Results: {{ count }}
              <v-spacer />
              <FilterDialog :enabled="filterDialog" />
            </v-row>
          </v-container>
          <div v-for="member in displayMembers" :key="member.userId">
            <Member :member="member" :roles="orderedRoles" />
          </div>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-main>
    <LoadingOverlay :loading="loading" :error="error" @on:refresh="refresh" />
  </v-app>
</template>

<script>
import Member from "@/components/Member";
import LoadingOverlay from "@/components/LoadingOverlay";
import FilterDialog from "@/components/FilterDialog";
import Filters from "@/components/Filters";

export default {
  name: "App",
  components: {
    Member,
    LoadingOverlay,
    FilterDialog,
    Filters,
  },
  data() {
    return {
      roles: [],
      members: [],
      loading: true,
      error: false,
      sorted: [],
      filterDialog: false,
      filters: [
        {
          key: "has",
          value: "1234",
          name: "Moderators",
        },
      ],
    };
  },
  computed: {
    displayMembers() {
      return [...this.members].sort((a, b) => {
        const c = a.displayName.toLowerCase();
        const d = b.displayName.toLowerCase();
        if (c < d) return -1;
        if (d > c) return 1;
        return 0;
      });
    },
    count() {
      return this.displayMembers.length;
    },
    orderedRoles() {
      return [...this.roles]
        .sort((a, b) => b.rawPosition - a.rawPosition)
        .slice(0, -1);
    },
  },
  mounted() {
    this.refresh();
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
        this.roles = data.map((x) => {
          const color = parseInt(x.color);
          const hex = `#${color.toString(16)}`;
          return {
            ...x,
            hex: color === 0 ? "#b9bbbe" : hex,
          };
        });
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
</style>
