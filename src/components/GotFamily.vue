<template>
  <li>
    <router-link
      class="got-family"
      :to="{ name: 'details', params: { index } }"
    >
      {{ name }}</router-link
    >
  </li>
</template>

<script>
export default {
  name: "GotFamily",
  data() {
    return {
      filteredName: this.name.substring(6),
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    region: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  methods: {},
};
</script>

<style scoped>
.family-element {
  cursor: pointer;
}

.got-family {
  text-decoration: none;
  margin: 2rem;
  color: #121212;
}
</style>
