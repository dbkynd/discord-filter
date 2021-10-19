<template>
  <div id="app">
    <div>
      <button @click="refresh">Refresh</button>
    </div>
    <div>Count: {{ count }}</div>
    <div v-for="member in displayMembers" :key="member.userId">
      <Member :member="member" :roles="orderedRoles" />
    </div>
  </div>
</template>

<script>
import Member from "@/components/Member";

export default {
  name: "App",
  components: {
    Member,
  },
  data() {
    return {
      roles: [],
      members: [],
      loading: true,
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
    async refresh() {
      this.loading = true;
      await this.getRoles();
      await this.getMembers();
      this.loading = false;
    },
    async getRoles() {
      await this.$axios.get("/roles").then(({ data }) => (this.roles = data));
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
