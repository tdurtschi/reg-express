<template>
  <div class="border puzzle">
    <div :class="`${currentIndex < 0 ? 'train' : 'placeholder'}`"></div>
    <div
      :class="`puzzle-tile ${indexHasTrain(tile.id) ? 'train' : ''} ${
        tile.highlight ? `highlight-${tile.highlight}` : ''
      }`"
      v-for="tile in puzzleTiles"
      v-bind:key="tile.id"
    >
      {{ indexHasTrain(tile.id) ? "" : tile.char }}
    </div>
    <div
      :class="`${currentIndex >= puzzleTiles.length ? 'train' : 'finish'}`"
    ></div>
  </div>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "RegExpress",
  props: {
    currentIndex: Number,
    validSubstringLength: Number,
    puzzle: String,
  },
  setup: (props) => {
    let { currentIndex, puzzle, validSubstringLength } = toRefs(props);

    const puzzleTiles = computed(() => {
      return puzzle.value.split("").map((char, id) => ({
        char,
        id,
        highlight: indexHasTrain(id)
          ? id == validSubstringLength.value
            ? "red"
            : "green"
          : currentIndex.value > id && validSubstringLength.value > id
          ? "green"
          : "",
      }));
    });

    function indexHasTrain(tileId) {
      if (currentIndex.value == tileId) {
        return currentIndex.value <= validSubstringLength.value;
      } else if (
        currentIndex.value >= validSubstringLength.value &&
        validSubstringLength.value > 0
      ) {
        return tileId == validSubstringLength.value;
      } else {
        return false;
      }
    }

    return {
      puzzleTiles,
      indexHasTrain,
    };
  },
  methods: {},
};
</script>

<style scoped>
.puzzle {
  margin-top: 2rem;
  min-width: 10px;
  min-height: 10px;
  display: flex;
  flex-wrap: wrap;
}

.train,
.finish {
  border-radius: 5px;
  padding: 0.3rem;
  margin: 0.3rem;
  min-width: 16px;
}

@media screen and (min-width: 768px) {
  .train,
  .finish {
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 32px;
  }
}

.finish:before {
  content: "🏛";
}
.train:before {
  content: "🚃";
}
.placeholder {
  padding: 0.3rem;
  margin: 0.3rem;
  min-width: 16px;
}

.puzzle-tile {
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.4rem;
  margin: 0.4rem;
  min-width: 12px;
}

@media screen and (min-width: 768px) {
  .puzzle-tile {
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 32px;
  }
}

.highlight-green {
  background-color: #ddffdd;
}
.highlight-red {
  background-color: #ffdddd;
}
</style>
