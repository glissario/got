<template>
  <div class="wrapper">
    <h2>{{ family.name + " - from: " + family.region }}</h2>
    <h3 v-show="validateWappon" class="wappon">
      {{ "CoatOfArms : " + family.coatOfArms }}
    </h3>
    <div
      @click="forceUpdate"
      v-show="this.validateOverlord"
      class="got-overlord-wrapper"
    >
      <router-link
        class="got-overlord"
        :to="{ name: 'details', params: { index: indexOverlord } }"
      >
        <strong>Overload:</strong>
        {{ this.overlord.name }}</router-link
      >
    </div>
    <h3 v-show="this.validateLength">Follower:</h3>
    <div class="followers">
      <label class="follower" v-for="(follower, i) in follower" v-bind:key="i">
        {{ follower }}
      </label>
    </div>
    <button class="button" @click="backToOverview">BACK</button>
  </div>
</template>

<script>
export default {
  name: "Family",
  data() {
    return {
      family: [],
      indexOverlord: Number,
      overlord: [],
      follower: [],
      loadedFollower: [],
      validateLength: false,
      validateOverlord: false,
      validateWappon: false,
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

    if (this.family.wappon !== "") {
      this.validateWappon = true;
    }

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
    if (this.family.swornMembers.length > 0) {
      this.validateLength = true;
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
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.got-overlord {
  text-decoration: none;
  padding-top: 1rem;
  color: #121212;
}

.got-overlord-wrapper:hover {
  transform: scale(1.05);
  transition: 0.5s;
}

h2 {
  font-size: 2rem;
  max-width: 45rem;
  margin: 0;
}

.wappon {
  max-width: 40rem;
  padding: 2rem 0.5rem;
}
li {
  list-style: none;
}
.followers {
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5rem 0.5rem;
}
.follower {
  text-align: center;
}
.follower:hover {
  color: brown;
}
.button {
  background-color: white;
  margin: 1.25rem;
  border: 1px solid black;
}

@media only screen and (max-width: 814px) {
  h2 {
    font-size: 1.75rem;
  }
  .wappon {
    font-size: 0.9rem;
  }
  .follower {
    font-size: 0.9rem;
  }
}
</style>
