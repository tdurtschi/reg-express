<template>
  <main class="main">
    <h1>Reg Express - Level {{ id }}</h1>
    {{ id == "1" ? "Choose from the tiles below to craft your solution:" : "" }}
    <section class="">
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
      <button type="button" class="go" @click="doPuzzle">Go</button>
      <button type="button" @click="restart">Reset</button>
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

.available {
  cursor: pointer;
}
.available:active {
  position: relative;
  top: 4px;
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

.train,
.finish {
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
}
.finish:before {
  content: "🏛";
}
.train:before {
  content: "🚃";
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
.actions {
  display: flex;
}
.actions button {
  font-size: 24px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 16px;
}

.actions button:active {
  position: relative;
  top: 4px;
}

.go {
  padding: 24px;
  font-size: 32px !important;
}
</style>
