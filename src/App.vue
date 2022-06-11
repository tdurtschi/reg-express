<template>
  <RegexFrog
    id="1"
    puzzle="abcde"
    :availableTiles="['a', 'b', 'c', 'd', 'e']"
  />
  <RegexFrog id="2" puzzle="aabb" :availableTiles="['a', 'b', '*', '*']" />
  <RegexFrog
    id="3"
    puzzle="aabab"
    :availableTiles="['a', 'b', 'a', '(', ')', '*']"
  />
</template>

<script>
import RegexFrog from "./components/RegexFrog.vue";

export default {
  name: "App",
  components: {
    RegexFrog,
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
  font-size: 32px;
}
</style>
