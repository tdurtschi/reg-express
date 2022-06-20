<template>
  <RegExpress
    :id="currentLevel.id"
    :puzzle="currentLevel.puzzle"
    :availableTiles="currentLevel.availableTiles"
    :hasNextLevel="hasNextLevel"
    @nextLevel="nextLevel"
  />
</template>

<script>
import RegExpress from "./components/RegExpress.vue";
import { allLevels } from "./allLevels";
import { ref, computed } from "vue";

function getLevelFromQuery(allLevels) {
  const levelUrl = document.location.href.split("level=")[1];
  const level = allLevels.find((level) => level.id == levelUrl);
  return level ?? allLevels[0];
}

export default {
  name: "App",
  components: {
    RegExpress,
  },
  data() {
    return {};
  },
  setup() {
    const currentLevel = ref(getLevelFromQuery(allLevels));
    return {
      currentLevel,
      hasNextLevel: computed(() => {
        return (
          allLevels.findIndex((level) => level.id == currentLevel.value.id) <
          allLevels.length - 1
        );
      }),
      nextLevel() {
        const nextLevelId =
          allLevels[
            allLevels.findIndex((level) => level.id == currentLevel.value.id) +
              1
          ].id;
        document.location.search = `?level=${nextLevelId}`;
      },
    };
  },
};
</script>

<style>
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 768px;
  margin: 0 auto;
}

button {
  font-size: 16px;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 16px;
  padding: 0.5rem;
}

button:disabled {
  border-color: #666;
  color: #666;
}

h1 {
  font-size: 24px;
}

@media screen and (min-width: 768px) {
  #app {
    font-size: 24px;
  }
  h1 {
    font-size: 32px;
  }
}
</style>
