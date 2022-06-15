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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 32px;
}
</style>
