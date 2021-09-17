<template>
  <h1>List of GoT-Families</h1>
  <div class="letter-selector">
    <div @click="findFamily">A</div>
    <div @click="findFamily">B</div>
    <div @click="findFamily">C</div>
    <div @click="findFamily">D</div>
    <div @click="findFamily">E</div>
    <div @click="findFamily">F</div>
    <div @click="findFamily">G</div>
    <div @click="findFamily">H</div>
    <div @click="findFamily">I</div>
    <div @click="findFamily">J</div>
    <div @click="findFamily">K</div>
    <div @click="findFamily">L</div>
    <div @click="findFamily">M</div>
    <div @click="findFamily">N</div>
    <div @click="findFamily">O</div>
    <div @click="findFamily">P</div>
    <div @click="findFamily">Q</div>
    <div @click="findFamily">R</div>
    <div @click="findFamily">S</div>
    <div @click="findFamily">T</div>
    <div @click="findFamily">U</div>
    <div @click="findFamily">V</div>
    <div @click="findFamily">W</div>
    <div @click="findFamily">Z</div>
    <div @click="findFamily">Y</div>
    <div @click="findFamily">Z</div>
  </div>
  <table class="got-family">
    <got-family
      v-for="(fam, i) in gotFamilies"
      v-bind:key="i"
      :name="fam.name"
      :index="(this.page - 1) * 15 + i + 1"
      class="family-element"
    />
  </table>
  <button @click="prevPage">prev page</button>
  <button @click="nextPage">next page</button>
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
}
.family-element {
  display: block;
  margin: 0.5rem 0rem;
}
.letter-selector {
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid red;
}
</style>
