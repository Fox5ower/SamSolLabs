describe("Numbers", () => {
  it("Should use remainder operator '%' ", () => {
    const a = 15;
    const b = 10;

    expect(a % b).toBe(5);
    expect(b % b).toBe(0);
  });

  test("Should get average of 3 numbers", () => {
    function avg(...args) {
      let sum = 0;
      for (let i = 0; i <= args[i]; i++) {
        sum += args[i];
      }
      return sum / args.length;
    }
    expect(avg(2, 4, 6)).toBe(4);
    expect(avg(-5, 12, -7)).toBe(0);
  });

  test("Should get a last digit of the number", () => {
    function last(a) {
      return a % 10;
    }
    expect(last(123)).toBe(3);
    expect(last(3982)).toBe(2);
  });

  test("Should sum the digits of a given number", () => {
    function sumDigits(a) {
      let sum = 0;
      while (a) {
        sum += a % 10;
        a = Math.floor(a / 10);
      }
      return sum;
    }
    expect(sumDigits(123)).toBe(6);
    expect(sumDigits(53)).toBe(8);
  });

  test("Should return true if specified number is prime", () => {
    function isPrime(a) {
      for (let i = 2; i <= a; i++) {
        if (a % i == 0) {
          return false;
        } else {
          return true;
        }
      }
    }
    expect(isPrime(7)).toBe(true);
    expect(isPrime(4)).toBe(false);

    // TODO: Write additional tests
  });

  test("Should convert string to number", () => {
    function convert(str) {
      str = +str;
      return str;
    }
    expect(convert("234")).toBe(234);
  });

  test("Should find highest value", () => {
    // TODO: Write 2 functions max and max2. Only one of them should use Math
    function max(...args) {
      return Math.max.apply(null, args);
    }
    function max2(...args) {
      let max = 0;
      for (let i = 0; i <= args.length; i++) {
        max < args[i] ? (max = args[i]) : max;
      }
      return max;
    }
    expect(max(1, 2)).toBe(2);
    expect(max2(1, 7, 2, 8, 5)).toBe(8);
  });

  test("Should find lowest value", () => {
    function min(...args) {
      return Math.min.apply(null, args);
    }

    function min2(...args) {
      let min = Number.MAX_SAFE_INTEGER;
      for (let i = 0; i <= args.length; i++) {
        min >= args[i] ? (min = args[i]) : min;
      }
      return min;
    }
    expect(min(2, 3, 9, 4, 1, 5)).toBe(1);
    expect(min2(2, 3, 9, 4, 1, 5)).toBe(1);
    expect(min2(13046546, 675676343, 2435436, 2356)).toBe(2356);
  });

  test("Should round up a value to the nearest integer", () => {
    expect(Math.round(1)).toBe(1);
    expect(Math.round(1.8)).toBe(2);
    expect(Number((1.2).toFixed(0))).toBe(1);
    expect(Math.round(-1.2)).toBe(-1);
  });

  test("Should get the largest integer less than or equal to a given number.  ", () => {
    expect(Math.floor(1)).toBe(1);
    expect(Math.floor(1.2)).toBe(1);
    expect(Math.floor(1.8)).toBe(1);
    expect(Math.floor(-1.9)).toBe(-2);
    // TODO: Write additional tests
  });

  test("Should return the base10 representation of a binary string", function() {
    function baseDec(a) {
      return parseInt(a, 2);
    }
    expect(baseDec(11000000)).toBe(192);
  });

  test("Should convert an eight-bit string number to a binary string", function() {
    expect(parseInt(127, 8).toString(2)).toBe("1010111");
    expect(parseInt(65, 8).toString(2)).toBe("110101");
  });
});
