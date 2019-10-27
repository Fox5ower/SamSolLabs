import { objectExpression, isLVal } from "@babel/types";

describe("Array", () => {
  it("Should find the position of the first occurrence", () => {
    //DONE
    const arr1 = [1, 5, 8, 3, 2];
    expect(arr1.indexOf(5)).toBe(1);
    expect(arr1.indexOf(3)).toBe(3);
    expect(arr1.indexOf(1)).toBe(0);
  });

  it("Should return the specified array twice", () => {
    //DONE
    function double(arr) {
      return arr.concat(arr);
    }
    expect(double([1, 2, 3])).toStrictEqual([1, 2, 3, 1, 2, 3]);
    expect(double([1, 2, "three", 5])).toStrictEqual([
      1,
      2,
      "three",
      5,
      1,
      2,
      "three",
      5
    ]);
  });

  it("Convert the number array to  the array of string values", () => {
    //DONE
    function convertToStringArr(arr) {
      return arr.map(String);
    }
    expect(convertToStringArr([1, 2, 3])).toStrictEqual(["1", "2", "3"]);
    expect(
      convertToStringArr([1, 2, 3, "three", 12345, "obj:1", [1, 3, 4]])
    ).toStrictEqual(["1", "2", "3", "three", "12345", "obj:1", "1,3,4"]);
    // TODO: Write additional its
  });

  it("Should return the number of all occurrences of specified item in an array", () => {
    //DONE
    function calculateOccurences(arr, el) {
      return (arr[el] = (arr[el] || 0) + 1);
    }
    expect(calculateOccurences([1, 2, 1, 4, 1], 1)).toBe(3);

    // TODO: Write additional its
  });

  it("Should convert strings from specified array to uppercase", () => {
    //DONE
    function toUppercase(arr) {
      return arr.map(x => x.toUpperCase());
    }
    expect(toUppercase(["aaaa", "abc"])).toStrictEqual(["AAAA", "ABC"]);
  });

  it("Insert an item at specified position", () => {
    //DONE
    function insert(arr, el, index) {
      arr.splice(index, 0, el);
      return arr;
    }
    expect(insert([1, 2, 4], 3, 2)).toStrictEqual([1, 2, 3, 4]);
  });

  it("Should return the n last items from the specified array", () => {
    //DONE
    function last(arr, count) {
      return arr.splice(-count, count);
    }
    expect(last([1, 2, 3, 4, 5, 6, 7], 3)).toStrictEqual([5, 6, 7]);
  });

  it("Return the 3 largest items from integer array", () => {
    function find3Largest(arr) {
      let tempArr = [];
      let max = 10;
      arr.forEach(el => {
        if (max < el) {
          let newMax = el;
          tempArr.push(newMax);
        }
      });
      return tempArr;
    }

    expect(find3Largest([1, 3, 8, 3, 29, 11, 2, 17, 9, 1])).toStrictEqual([
      29,
      11,
      17
    ]);
  });

  it("Sort numbers array by using array method", () => {
    //DONE
    function sort(arr) {
      function compose(a, b) {
        return a - b;
      }
      return arr.sort(compose).reverse();
    }
    function bubble(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if (arr[j] > arr[j + 1]) {
            let z = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = z;
          }
        }
      }
      return arr;
    }
    expect(sort([2, 3, 1, 8, 4, 5])).toStrictEqual([8, 5, 4, 3, 2, 1]);
    expect(bubble([26, 3, 12, 8, 48, 5])).toStrictEqual([3, 5, 8, 12, 26, 48]);
  });

  it("Should summarize of all items of numbers array", () => {
    //DONE
    function sum(arr) {
      return arr.reduce((a, b) => a + b, 0);
    }
    expect(sum([1, 5, 7, 9, 3])).toBe(25);
  });

  it("Should return the numbers of falsy value in the specified array", () => {
    //DONE
    function getNumberOfFalsy(arr) {
      let newarr = arr.filter(x => !x);
      return newarr.length;
    }
    expect(getNumberOfFalsy([1, 0, "", null, "hello", "0"])).toBe(3);
  });

  it("Should return an array of unique items from the specified array + use set", () => {
    //DONE
    function unique(arr) {
      return [...new Set(arr)];
    }
    expect(unique(["a", "b", "a", "c", "e", "b", "o"])).toStrictEqual([
      "a",
      "b",
      "c",
      "e",
      "o"
    ]);
  });

  it("Should return a map of grouped data by key and value selector", function() {
    //DONE
    let arr = [
      { country: "Belarus", city: "Brest" },
      { country: "Russia", city: "Omsk" },
      { country: "Russia", city: "Samara" },
      { country: "Belarus", city: "Grodno" },
      { country: "Belarus", city: "Minsk" },
      { country: "Poland", city: "Lodz" }
    ];
    function group(arr) {
      let groupTo = arr.reduce(function(obj, item) {
        obj[item.country] = obj[item.country] || [];
        obj[item.country].push(item.city);
        return obj;
      }, {});

      return Object.keys(groupTo).map(key => [key, groupTo[key]]);
    }
    expect(group(arr, "country")).toStrictEqual([
      ["Belarus", ["Brest", "Grodno", "Minsk"]],
      ["Russia", ["Omsk", "Samara"]],
      ["Poland", ["Lodz"]]
    ]);
  });

  it("Should creates an array with all falsy values removed.", () => {
    //DONE
    function compact(arr) {
      arr = arr.filter(Boolean);
      return arr;
    }
    expect(compact([1, 0, null, "a"])).toStrictEqual([1, "a"]);
  });

  it("Should flattens array a single level deep", () => {
    //DONE
    function flatten(arr) {
      return arr.flat(1);
    }
    expect(flatten([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, [3, [4]], 5]);
  });

  it("Should recursively flattens array.", () => {
    //DONE
    function flattenDeep([flatOne, ...flatX]) {
      return flatOne !== undefined
        ? [
            ...(Array.isArray(flatOne) ? flattenDeep(flatOne) : [flatOne]),
            ...flattenDeep(flatX)
          ]
        : [];
    }
    expect(flattenDeep([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("Should creates an array of unique values that are included in all given", () => {
    //DONE
    function intersection(arr1, arr2) {
      var newArr = [];
      newArr = arr1.filter(function(v) {
        return arr2.indexOf(v) >= 0;
      });
      newArr.concat(
        arr2.filter(function(v) {
          return newArr.indexOf(v) >= 0;
        })
      );

      return newArr;
    }
    expect(intersection([1, 2, 3, 4], [8, 3, 1, 0, 9])).toStrictEqual([1, 3]);
  });

  it("Should remove all elements from array that predicate returns truthy for and returns an array of the removed elements. The predicate is invoked with two arguments: (value, index).", () => {
    //DONE
    let arr = [1, 7, 5, 2, 8];
    const gt5 = v => v > 5;
    let removed = arr.filter(gt5);
    Array.prototype.remove = function(set) {
      return this.filter(function(el) {
        return set.indexOf(el) < 0;
      });
    };
    arr = arr.remove(removed);
    expect(arr).toStrictEqual([1, 5, 2]);
    expect(removed).toStrictEqual([7, 8]);
  });
});
