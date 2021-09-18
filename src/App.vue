<template>
  <header>
    <img src="@/assets/gotlogo.png" />
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #121212;
  font-size: 18px;
}

img {
  max-width: 95%;
  background-color: #fafafa;
}

body {
  background-color: rgb(240, 240, 240);
}

main {
  background-color: #fafafa;
  max-width: 60rem;
  margin: 0 auto;
}
header {
  max-width: 60rem;
  margin: 0 auto;
  padding: 1rem 0;
  background-color: #fafafa;
}

h1 {
  margin: 0;
  padding: 0.75rem 0rem;
}
</style>
