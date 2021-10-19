<template>
  <v-app>
    <LoadingOverlay :loading="loading" :error="error" @on:refresh="refresh" />
    <v-app-bar app>
      <v-avatar>
        <img src="@/assets/logo.png" alt="icon" />
      </v-avatar>
      <v-app-bar-title class="ml-3">Member Filter</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-row v-if="!loading">
        <v-col cols="12">
          <div class="refresh">
            <v-btn @click="refresh" color="primary">Refresh</v-btn>
          </div>
          <div>Count: {{ count }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="6">
          <div v-for="member in displayMembers" :key="member.userId">
            <Member :member="member" :roles="orderedRoles" />
          </div>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Member from "@/components/Member";
import LoadingOverlay from "@/components/LoadingOverlay";

export default {
  name: "App",
  components: {
    Member,
    LoadingOverlay,
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
          return {
            ...x,
            hex: `#${parseInt(x.color).toString(16)}`,
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

.refresh {
  z-index: 100;
}
</style>
