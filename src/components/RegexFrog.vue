<template>
  <main class="main">
    <h1>Regex Froggy - Level {{ id }}</h1>
    Choose from the symbols below to craft your solution:
    <section class="symbols">
      <div
        class="puzzle-tile"
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
    <button type="button" @click="doPuzzle">Go</button>
    <div class="border puzzle">
      <div :class="`${currentIndex < 0 ? 'froggy' : 'placeholder'}`"></div>
      <div
        :class="`puzzle-tile ${currentIndex == tile.id ? 'froggy' : ''} ${
          tile.highlight ? `highlight-${tile.highlight}` : ''
        }`"
        v-for="tile in puzzleTiles"
        v-bind:key="tile.id"
      >
        {{ tile.id == currentIndex ? "" : tile.char }}
      </div>
      <div
        :class="`${currentIndex >= puzzleTiles.length ? 'froggy' : 'finish'}`"
      ></div>
    </div>

    <section class="result">{{ result }}</section>
  </main>
</template>

<script>
import { ref, computed, toRefs } from "vue";

export default {
  name: "RegexFrog",
  props: {
    puzzle: String,
    availableTiles: Array,
    id: String,
  },
  setup: (props) => {
    const result = ref("");
    const solution = ref("");
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

    const validSubstringLength = computed(() => {
      try {
        for (var i = puzzle.value.length; i >= 0; i--) {
          const regex = new RegExp(`^${solution.value}$`);
          const testSubstring = regex.test(puzzle.value.substring(0, i));
          if (testSubstring) {
            return i;
          }
        }
        return 0;
      } catch {
        return 0;
      }
    });

    const solutionTiles = computed(() => {
      return solution.value.split("").map((char, id) => ({
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
        ? "You won!"
        : validSubstringLength.value == 0
        ? "🚨 Invalid Solution!"
        : "🚫 You lose! Fuck you!";
    }

    function add(tile) {
      console.log("Add", tile);
      const indexOfItemToRemove = remainingTiles.value.findIndex(
        (remaining) => remaining == tile
      );
      remainingTiles.value = remainingTiles.value.filter(
        (_, i) => i != indexOfItemToRemove
      );
      solution.value = solution.value + tile;
    }

    return {
      add,
      doPuzzle,
      solutionTiles,
      result,
      puzzleTiles,
      currentIndex,
      validSubstringLength,
      remainingTiles,
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
  margin: 1rem;
  padding: 1rem;
  min-width: 10px;
  min-height: 10px;

  display: flex;
}

.puzzle {
  margin: 1rem;
  padding: 1rem;
  min-width: 10px;
  min-height: 10px;
  display: flex;
}

.puzzle-tile {
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  min-width: 24px;
}

section div {
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
}
.staging-area {
  min-height: 90px;
}

.froggy,
.finish {
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
}
.finish:before {
  content: "🌱";
}
.froggy:before {
  content: "🐸";
}
.placeholder {
  padding: 1rem;
  margin: 1rem;
  min-width: 24px;
}

.highlight-green {
  background-color: #ddffdd;
}
.highlight-red {
  background-color: #ffdddd;
}
</style>
