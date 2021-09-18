<template>
  <h1>List of GoT-Families</h1>

  <ol class="got-family">
    <got-family
      v-for="(fam, i) in gotFamilies"
      v-bind:key="i"
      :name="fam.name"
      :index="(this.page - 1) * 15 + i + 1"
      class="family-element"
    />
  </ol>
  <button class="button" @click="prevPage">PREV</button>
  <button class="button" @click="nextPage">NEXT</button>
</template>

<script>
import GotFamily from "@/components/GotFamily.vue";

export default {
  name: "HomeGot",
  components: {
    GotFamily,
  },
  data() {
    return {
      gotFamilies: [],
      page: 1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    nextPage() {
      if (this.gotFamilies.length === 15) {
        this.page++;
        this.getData();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.getData();
      }
    },
    async getData() {
      const apiUrl =
        "https://anapioficeandfire.com/api/houses/?pageSize=15&page=" +
        this.page;
      const httpElement = await fetch(apiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const jsonData = await httpElement.json();
      this.gotFamilies = jsonData;
    },
  },
};
</script>

<style scoped>
.got-family {
  margin: 0 auto;
  padding: 0;
}

.family-element {
  display: block;

  background-color: blue;
}

ol > .family-element:nth-child(1n + 1) {
  background-color: rgb(240, 240, 240);
  padding: 0.5rem 0rem;
}
ol > .family-element:nth-child(2n + 2) {
  background-color: white;
  padding: 0.5rem 0rem;
}

.family-element:active {
  transform: scale(1.1);
}

.button {
  background-color: white;
  margin: 1.25rem 0.5rem;
  border: 1px solid black;
}
</style>
