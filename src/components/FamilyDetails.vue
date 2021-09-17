<template>
  <p>{{ "test " + index }}</p>
</template>

<script>
export default {
  name: "FamilyDetails",
  data() {
    return {
      family: [],
    };
  },
  params: {},

  beforeRouteUpdate() {
    this.index = this.$route.params.index;
  },

  async created() {
    this.index = this.$route.params.index;
    const apiUrl = "https://anapioficeandfire.com/api/houses/" + this.index;
    const httpElement = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const jsonData = await httpElement.json();
    this.family = jsonData;
  },
};
</script>
