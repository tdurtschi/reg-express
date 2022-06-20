export const allLevels = [
  {
    id: "1.1",
    puzzle: "train",
    availableTiles: ["t", "r", "a", "i", "n"],
  },
  {
    id: "1.2",
    puzzle: "train",
    availableTiles: ["t", "r", "a", "i", "[a-z]"],
  },
  {
    id: "1.3",
    puzzle: "terrain",
    availableTiles: ["t", "r", "a", "i", "[a-z]", "[a-z]", "[a-z]"],
  },
  {
    id: "1.4",
    puzzle: "forgery",
    availableTiles: ["f", "r", "o", "y", "[a-z]", "[a-z]", "{3}"],
  },
  {
    id: "1.5",
    puzzle: "froyo rosy",
    availableTiles: ["f", "r", "o", "y", ".", "[a-z]", "[a-z]", "{2}", "{4}"],
  },
  {
    id: "2",
    puzzle: "banana",
    availableTiles: ["b", "[an]", "a", "{4}"],
  },
];

// const otherLevels = [
//   { id: "1", puzzle: "abcde", availableTiles: "['a', 'b', 'c', 'd', 'e']" },
//   { id: "2", puzzle: "aabb", availableTiles: "['a', 'b', '*', '*']" },
//   {
//     id: "3",
//     puzzle: "aabab",
//     availableTiles: "['a', 'b', 'a', '(', ')', '*']",
//   },
// ];
