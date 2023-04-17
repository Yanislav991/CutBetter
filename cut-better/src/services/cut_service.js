export default class CutService {
  getPieces(materialSize, pipes, cutSize = 5) {
    let bestComination;

    let neededPipes = Math.ceil(
      (pipes.reduce((a, b) => a + b, 0) + (pipes.length - 1) * cutSize) /
        materialSize
    );

    let allCombinations = this.getCombinations(
      neededPipes,
      pipes,
      materialSize
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
    return bestComination;
  }

  isBestCombination(bestComination, possibleBestCombination, capacity) {
    if (bestComination == undefined) {
      return true;
    }
    let currBestEmptyArraysCount = this.countEmptyArrays(bestComination);
    let possibleBestEmptyArraysCount = this.countEmptyArrays(
      possibleBestCombination
    );

    if (possibleBestEmptyArraysCount > currBestEmptyArraysCount) {
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

  countEmptyArrays(matrix) {
    return matrix.filter((arr) => arr.length === 0).length;
  }

  countArraysSumToCapacity(matrix, capacity) {
    return matrix.filter(
      (arr) => arr.reduce((acc, curr) => acc + curr, 0) === capacity
    ).length;
  }

  getCombinations(neededPipes, numArrays, materialSize) {
    let result = [];
    let permutations = this.permuteArray(numArrays);

    for (let i = 0; i < permutations.length; i++) {
      const permutation = permutations[i];
      var permutationSplit = this.splitArray(
        neededPipes,
        permutation,
        materialSize
      );
      result.push(permutationSplit);
    }
    return result;
  }

  splitArray(arrayCount, array, capacity) {
    const result = [];
    let currentSum = 0;
    let currentArray = [];

    for (let i = 0; i < array.length; i++) {
      const num = array[i];
      if (currentSum + num <= capacity && currentArray.length < arrayCount) {
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
