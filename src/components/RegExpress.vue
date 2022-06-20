<template>
  <main class="main">
    <h1>Reg Express - Level {{ id }}</h1>
    {{ id == "1" ? "Choose from the tiles below to craft your solution:" : "" }}
    <section class="puzzle-tiles-section">
      <div
        class="available puzzle-tile"
        v-for="(symbol, index) in remainingTiles"
        v-bind:key="index"
        @click="add(symbol)"
      >
        {{ symbol }}
      </div>
    </section>
    <section class="staging-area border">
      <div
        class="puzzle-tile"
        v-for="tile in solutionTiles"
        v-bind:key="tile.id"
      >
        {{ tile.char }}
      </div>
    </section>
    <section class="actions">
      <button
        type="button"
        class="go"
        @click="doPuzzle"
        :disabled="currentIndex > -1"
      >
        Go
      </button>
      <button
        type="button"
        class="reset"
        @click="restart"
        :disabled="currentIndex > -1"
      >
        Reset
      </button>
    </section>
    <div class="border puzzle">
      <div :class="`${currentIndex < 0 ? 'train' : 'placeholder'}`"></div>
      <div
        :class="`puzzle-tile ${currentIndex == tile.id ? 'train' : ''} ${
          tile.highlight ? `highlight-${tile.highlight}` : ''
        }`"
        v-for="tile in puzzleTiles"
        v-bind:key="tile.id"
      >
        {{ tile.id == currentIndex ? "" : tile.char }}
      </div>
      <div
        :class="`${currentIndex >= puzzleTiles.length ? 'train' : 'finish'}`"
      ></div>
    </div>

    <section class="result" v-if="result">{{ result }}</section>
    <section class="actions" v-if="result">
      <button type="button" @click="restart">Restart</button>
      <button type="button" v-if="hasNextLevel" @click="$emit('nextLevel')">
        Next Level
      </button>
    </section>
  </main>
</template>

<script>
import { ref, computed, toRefs, watch } from "vue";

export default {
  name: "RegExpress",
  props: {
    puzzle: String,
    availableTiles: Array,
    id: String,
    hasNextLevel: Boolean,
  },
  setup: (props) => {
    const result = ref("");
    const chosenTiles = ref([]);
    const solution = computed(() => {
      return chosenTiles.value.reduce((prev, curr) => prev + curr, "");
    });
    let { puzzle, availableTiles } = toRefs(props);
    const currentIndex = ref(-1);
    const remainingTiles = ref(availableTiles.value.map((tile) => tile));

    const didWin = computed(() => {
      try {
        const regex = new RegExp(`^${solution.value}$`);
        return regex.test(puzzle.value);
      } catch {
        return false;
      }
    });

    const substringMatches = (substring, regexStr) => {
      for (var i = 1; i <= regexStr.length; i++) {
        try {
          const regex = new RegExp(`^${regexStr.substring(0, i)}$`);
          const result = regex.test(substring);

          if (result) {
            return true;
          }
        } catch (e) {
          //
        }
      }
      return false;
    };

    const validSubstringLength = computed(() => {
      try {
        for (var i = puzzle.value.length; i >= 0; i--) {
          if (substringMatches(puzzle.value.substring(0, i), solution.value)) {
            return i;
          }
        }
        return 0;
      } catch {
        return -1;
      }
    });

    const solutionTiles = computed(() => {
      return chosenTiles.value.map((char, id) => ({
        char,
        id,
      }));
    });

    const puzzleTiles = computed(() => {
      return puzzle.value.split("").map((char, id) => ({
        char,
        id,
        highlight:
          currentIndex.value > id
            ? "green"
            : currentIndex.value == id
            ? id > validSubstringLength.value - 1
              ? "red"
              : "green"
            : "",
      }));
    });

    async function doPuzzle() {
      for (var i = 0; i <= validSubstringLength.value; i++) {
        await new Promise((res) => setTimeout(res, 300));
        currentIndex.value = i;
      }

      result.value = didWin.value
        ? "🎉 You won!"
        : validSubstringLength.value < 0
        ? "🚨 Invalid Solution!"
        : "🚫 You lose!";
    }

    function add(tile) {
      const indexOfItemToRemove = remainingTiles.value.findIndex(
        (remaining) => remaining == tile
      );
      remainingTiles.value = remainingTiles.value.filter(
        (_, i) => i != indexOfItemToRemove
      );
      chosenTiles.value.push(tile);
    }

    function restart() {
      remainingTiles.value = availableTiles.value;
      currentIndex.value = -1;
      chosenTiles.value = [];
      result.value = "";
    }

    watch(puzzle, restart);

    return {
      add,
      doPuzzle,
      solutionTiles,
      result,
      puzzleTiles,
      currentIndex,
      validSubstringLength,
      remainingTiles,
      restart,
    };
  },
  methods: {},
};
</script>

<style scoped>
.border {
  border: 1px solid black;
  border-radius: 5px;
}

main {
  display: flex;
  flex-direction: column;
}

section {
  margin-bottom: 1rem;
  min-width: 10px;
  min-height: 10px;

  display: flex;
  flex-wrap: wrap;
}

@media screen and (min-width: 768px) {
  .staging-area {
    height: 75px;
  }
}

.puzzle {
  margin-top: 2rem;
  min-width: 10px;
  min-height: 10px;
  display: flex;
  flex-wrap: wrap;
}

.available {
  cursor: pointer;
}
.available:active {
  position: relative;
  top: 4px;
}

.available.puzzle-tile {
  font-size: 32px;
  padding: 0.5rem;
  margin: 0.5rem;
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

section div {
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
}
.staging-area {
  min-height: 45px;
}
.puzzle-tiles-section {
  min-height: 45px;
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

.highlight-green {
  background-color: #ddffdd;
}
.highlight-red {
  background-color: #ffdddd;
}
.actions {
  display: flex;
}

.actions button:active {
  position: relative;
  top: 4px;
}

.reset {
  background-color: #d6d078;
}

.go {
  background-color: #b9d678;
}
</style>
