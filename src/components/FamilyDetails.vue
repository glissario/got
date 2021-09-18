<template>
  <h2>{{ family.name }}</h2>
  <h3>{{ family.region }}</h3>
  <div
    @click="forceUpdate"
    v-show="this.validateOverlord"
    class="got-overlord-wrapper"
  >
    <router-link
      class="got-overlord"
      :to="{ name: 'famdetails', params: { index: indexOverlord } }"
    >
      {{ "Overlord: " + this.overlord.name }}</router-link
    >
  </div>
  <h3 v-show="this.validateLength">Follower:</h3>
  <div class="followers">
    <label class="follower" v-for="(follower, i) in follower" v-bind:key="i">
      {{ follower }}
    </label>
  </div>
  <button class="button" @click="backToOverview">BACK</button>
</template>

<script>
export default {
  name: "FamilyDetails",
  data() {
    return {
      family: [],
      indexOverlord: Number,
      overlord: [],
      follower: [],
      validateLength: false,
      validateOverlord: false,
    };
  },
  params: {},

  beforeRouteUpdate() {
    this.index = this.$route.params.index;
  },
  methods: {
    forceUpdate() {
      this.$router.go(0);
    },
    backToOverview() {
      this.$router.go(-1);
    },
  },

  async created() {
    this.index = this.$route.params.index;
    const apiUrl = "https://anapioficeandfire.com/api/houses/" + this.index;
    let httpElement = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    let jsonData = await httpElement.json();
    this.family = jsonData;

    if (this.family.overlord !== "") {
      this.validateOverlord = true;
      this.indexOverlord = parseInt(this.family.overlord.replace(/\D/g, ""));

      const OlApiUrl =
        "https://anapioficeandfire.com/api/houses/" + this.indexOverlord;
      httpElement = await fetch(OlApiUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      jsonData = await httpElement.json();

      this.overlord = jsonData;
    }
    if (this.family.swornMembers !== "") {
      this.validateLength;
      for (let i = 0; i < this.family.swornMembers.length; i++) {
        const memberApiUrl =
          "https://anapioficeandfire.com/api/characters/" +
          this.family.swornMembers[i].replace(/\D/g, "");

        httpElement = await fetch(memberApiUrl, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        jsonData = await httpElement.json();
        this.follower.push(jsonData.name);
      }
      this.validateLength = this.follower.length > 0;
    }
  },
};
</script>

<style scoped>
.got-overlord {
  text-decoration: none;
  color: #121212;
}

.got-overlord-wrapper:hover {
  transform: scale(1.05);
  transition: 0.5s;
}

h2 {
  margin: 0;
}
li {
  list-style: none;
}
.followers {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.follower:hover {
  color: brown;
}
.button {
  background-color: white;
  margin: 1.25rem 0;
  border: 1px solid black;
}
</style>
