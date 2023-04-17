export default class CutService {
  //TODO: optimize, currently working with smaller data e.g. materialSize = 6000, {3500:2, 500: 5}
  getPieces(materialSize, pipes, cutSize = 5) {
    let bestComination;
    pipes = Object.entries(pipes).flatMap(([key, value]) =>
      Array(value).fill(Number(key))
    );
    let neededPipes = Math.ceil(
      (pipes.reduce((a, b) => a + b, 0) + (pipes.length - 1) * cutSize) /
        materialSize
    );

    let allCombinations = this.getCombinations(
      neededPipes,
      pipes,
      materialSize,
      cutSize
    );

    for (let i = 0; i < allCombinations.length; i++) {
      let currentCombination = allCombinations[i];
      let isBestCombination = this.isBestCombination(
        bestComination,
        currentCombination,
        materialSize
      );
      if (isBestCombination == true) {
        bestComination = currentCombination;
      }
    }

    return this.fixCombination(bestComination, cutSize, materialSize);
  }

  fixCombination(combination, cutSize, capacity) {
    let processedCombination = [];
    for (let i = 0; i < combination.length; i++) {
      let pipe = combination[i];
      let sum = pipe.reduce((a, b) => a + b, 0);

      if (sum == capacity) continue;
      pipe = pipe.map((el) => {
        if (el === cutSize) {
          return { type: "cut", value: cutSize };
        }
        return { type: "piece", value: el };
      });

      pipe.push({ type: "cut", value: cutSize });
      pipe.push({ type: "residuе", value: capacity - sum - cutSize });
      processedCombination.push(pipe);
    }
    return processedCombination;
  }

  isBestCombination(bestComination, possibleBestCombination, capacity) {
    if (bestComination == undefined) {
      return true;
    }
    let currBestArraysCount = this.countArrays(bestComination);
    let possibleBestArraysCount = this.countArrays(possibleBestCombination);

    if (currBestArraysCount > possibleBestArraysCount) {
      console.log("Here");
      return true;
    }
    //////
    let currBestSumCapacityArraysCount = this.countArraysSumToCapacity(
      bestComination,
      capacity
    );
    let possibleBestSumCapacityArraysCount = this.countArraysSumToCapacity(
      possibleBestCombination,
      capacity
    );

    if (possibleBestSumCapacityArraysCount > currBestSumCapacityArraysCount) {
      return true;
    }

    return false;
  }

  countArrays(matrix) {
    return matrix.length;
  }

  countArraysSumToCapacity(matrix, capacity) {
    return matrix.filter(
      (arr) => arr.reduce((acc, curr) => acc + curr, 0) === capacity
    ).length;
  }

  getCombinations(neededPipes, numArrays, materialSize, cutSize) {
    let result = [];
    let permutations = this.permuteArray(numArrays);

    for (let i = 0; i < permutations.length; i++) {
      const permutation = permutations[i];
      var permutationSplit = this.splitArray(
        neededPipes,
        permutation,
        materialSize,
        cutSize
      );
      result.push(permutationSplit);
    }
    return result;
  }

  splitArray(arrayCount, array, capacity, cutSize) {
    const result = [];
    let currentSum = 0;
    let currentArray = [];

    for (let i = 0; i < array.length; i++) {
      const num = array[i];
      if (
        currentSum + num + (currentArray.length > 0 ? cutSize : 0) <=
        capacity
      ) {
        if (currentArray.length > 0) {
          currentArray.push(cutSize);
          currentSum += cutSize;
        }
        currentArray.push(num);
        currentSum += num;
      } else {
        result.push(currentArray);
        currentArray = [num];
        currentSum = num;
      }
    }

    result.push(currentArray);

    while (result.length < arrayCount) {
      result.push([]);
    }

    return result;
  }

  permuteArray(arr) {
    const results = [];

    function recurse(current, remaining) {
      if (remaining.length === 0) {
        results.push(current);
        return;
      }

      for (let i = 0; i < remaining.length; i++) {
        const head = remaining[i];
        const tail = remaining.slice(0, i).concat(remaining.slice(i + 1));
        recurse([...current, head], tail);
      }
    }

    recurse([], arr);

    return results;
  }
}
