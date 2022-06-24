
const substringMatches = (substring, regexStr) => {
    for (var i = 1; i <= regexStr.length; i++) {
        if (i < regexStr.length && (regexStr.substring(i - 1, i) == "+" || regexStr.substring(i - 1, i) == "*" || regexStr.substring(i - 1, i) == "}")) { continue; }
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

export const validSubstrLength = (puzzle, solution) => {
    try {
        for (var i = puzzle.length; i >= 0; i--) {
            if (substringMatches(puzzle.substring(0, i), solution)) {
                console.log("Checked", puzzle, solution, i);
                return i;
            }
        }
        return 0;
    } catch {
        return -1;
    }
};
