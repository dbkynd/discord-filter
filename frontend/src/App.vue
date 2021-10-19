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
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="6" style="padding-bottom: 0"> </v-col>
      </v-row>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="6">
          <div v-for="member in filteredMembers" :key="member.userId">
            <Member :member="member" :roles="orderedRoles" />
          </div>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="3">
          <RoleSelection :roles="orderedRoles" />
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

export default {
  name: "App",
  components: {
    Member,
    LoadingOverlay,
    RoleSelection,
  },
  data() {
    return {
      roles: [],
      members: [],
      loading: true,
      error: false,
      sorted: [],
    };
  },
  computed: {
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
    orderedRoles() {
      return [...this.roles]
        .sort((a, b) => b.rawPosition - a.rawPosition)
        .slice(0, -1);
    },
    yesRoles() {
      return this.orderedRoles
        .filter((x) => x.selected === "Y")
        .map((x) => x.id);
    },
    noRoles() {
      return this.orderedRoles
        .filter((x) => x.selected === "N")
        .map((x) => x.id);
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
            selected: null,
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
