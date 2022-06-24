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
    <Puzzle
      v-for="puzzleSegment in puzzleSegments"
      v-bind:key="puzzleSegment.id"
      :puzzle="puzzleSegment.text"
      :currentIndex="currentIndex"
      :validSubstringLength="puzzleSegment.validSubstringLength"
    />
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
import Puzzle from "./Puzzle.vue";
import { validSubstrLength } from "../puzzleChecker";

export default {
  name: "RegExpress",
  components: {
    Puzzle,
  },
  props: {
    puzzle: [String, Array],
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

    const puzzleSegments = computed(() => {
      return puzzle.value[0].text
        ? puzzle.value.map((puzzleSegment, id) => ({
            ...puzzleSegment,
            id,
            validSubstringLength: validSubstrLength(
              puzzleSegment.text,
              solution.value
            ),
          }))
        : [
            {
              id: 1,
              text: puzzle.value,
              shouldMatch: true,
              validSubstringLength: validSubstrLength(
                puzzle.value,
                solution.value
              ),
            },
          ];
    });

    const didWin = computed(() => {
      try {
        return puzzleSegments.value.every((segment) => {
          const regex = new RegExp(`^${solution.value}$`);
          console.log("Did win? Checking", segment.text, regex);
          console.log("result was", regex.test(segment.text));
          return regex.test(segment.text);
        });
      } catch {
        return false;
      }
    });

    const longestValidSubstringLength = computed(() =>
      puzzleSegments.value.reduce((prev, curr) => {
        var validSubstringLength = validSubstrLength(curr.text, solution.value);
        return validSubstringLength > prev ? validSubstringLength : prev;
      }, 0)
    );

    const solutionTiles = computed(() => {
      return chosenTiles.value.map((char, id) => ({
        char,
        id,
      }));
    });

    async function doPuzzle() {
      console.log("longest was", longestValidSubstringLength.value);
      for (var i = 0; i <= longestValidSubstringLength.value; i++) {
        await new Promise((res) => setTimeout(res, 300));
        currentIndex.value = i;
      }

      result.value = didWin.value
        ? "🎉 You won!"
        : longestValidSubstringLength.value < 0
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
      currentIndex,
      remainingTiles,
      restart,
      puzzleSegments,
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
