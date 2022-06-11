<template>
  <RegexFrog
    v-for="(level, index) in levels"
    v-bind:key="index"
    :id="level.id"
    :puzzle="level.puzzle"
    :availableTiles="level.availableTiles"
  />
</template>

<script>
import RegexFrog from "./components/RegexFrog.vue";

export default {
  name: "App",
  components: {
    RegexFrog,
  },
  data() {
    return {
      levels: [
        {
          id: "1",
          puzzle: "froggy",
          availableTiles: [
            "f",
            "r",
            "o",
            "g",
            "g",
            "y",
            ".",

            "[a-z]",
            "[a-z]",
            "{2}",
          ],
        },
        {
          id: "1.2",
          puzzle: "froggy",
          availableTiles: ["f", "r", "o", "y", ".", "[a-z]", "[a-z]", "{2}"],
        },
        {
          id: "1.3",
          puzzle: "forgery",
          availableTiles: ["f", "r", "o", "y", ".", "[a-z]", "[a-z]", "{2}"],
        },
        {
          id: "1.4",
          puzzle: "fourgery",
          availableTiles: ["f", "r", "o", "y", ".", "[a-z]", "[a-z]", "{4}"],
        },
        {
          id: "1.5",
          puzzle: "fivegery",
          availableTiles: ["f", "r", "o", "y", ".", "[a-z]", "[a-z]", "{4}"],
        },
        {
          id: "1.6",
          puzzle: "froyo rosy",
          availableTiles: [
            "f",
            "r",
            "o",
            "y",
            ".",
            "[a-z]",
            "[a-z]",
            "{2}",
            "{4}",
          ],
        },
        {
          id: "2",
          puzzle: "banana",
          availableTiles: ["b", "a", "a", "n", "(", ")", "{2}"],
        },
        { id: "3", puzzle: "   ", availableTiles: [".", "a", " ", " "] },
        { id: "4", puzzle: " a a", availableTiles: [".", "a", " ", " "] },
        {
          id: "5",
          puzzle: "vetted",
          availableTiles: ["v", "et", "ted", "|", "(", ")", "{2}"],
        },
      ],
    };
  },
};

// const otherLevels = [
//   { id: "1", puzzle: "abcde", availableTiles: "['a', 'b', 'c', 'd', 'e']" },
//   { id: "2", puzzle: "aabb", availableTiles: "['a', 'b', '*', '*']" },
//   {
//     id: "3",
//     puzzle: "aabab",
//     availableTiles: "['a', 'b', 'a', '(', ')', '*']",
//   },
// ];
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
