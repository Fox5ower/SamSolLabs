describe("Strings", () => {
  it("Should join two strings with a space.", () => {
    // TODO: write 2 function with different way for join string
    function combine1(a, b) {
      return `${a} ${b}`;
    }
    function combine2(a, b) {
      return a.concat(" ", b);
    }
    expect(combine1("hello", "world")).toBe("hello world");
    expect(combine2("hello", "world")).toBe("hello world");
  });

  it("Should get string length", () => {
    function getLength(str) {
      return str.length;
    }
    expect(getLength("")).toBe(0);
    expect(getLength("word")).toBe(4);
  });

  it("Should create greeting message from template", () => {
    function greeting(name) {
      return `Hello, ${name}!`;
    }
    expect(greeting("Ivan")).toBe("Hello, Ivan!");
  });

  it("Should strip leading and trailing spaces from a string", () => {
    expect(" aaaa bbb   ".trim()).toBe("aaaa bbb");
  });

  it("Replace all word occurence in the sentences", () => {
    expect(
      "aaa bbb ccc aaa  bb".replace(/aaa/g, "eeeee").replace(/  /, " ")
    ).toBe("eeeee bbb ccc eeeee bb");
  });

  it("Should validate string length", () => {
    function validateLength(str, min, max) {
      let result = str.length >= min && str.length <= max ? true : false;
      return result;
    }
    expect(validateLength("abcde", 1, 5)).toBe(true);
    expect(validateLength("a", 1, 5)).toBe(true);
    expect(validateLength("ab", 1, 5)).toBe(true);
    expect(validateLength("", 1, 5)).toBe(false);
    expect(validateLength("abcdef", 1, 5)).toBe(false);
  });

  it("Should do case insensitive strings comparison", () => {
    function compare(str, str2) {
      str = str.toUpperCase();
      str2 = str2.toUpperCase();
      return str === str2;
    }

    expect(compare("aBc", "ABC")).toBe(true);
    expect(compare("abc", "abc")).toBe(true);
  });

  it("Should trim string according symbols limit", () => {
    function trim(str, n) {
      return str.substr(0, n).trim();
    }
    expect(trim("Lorem ipsum dolor sit amet", 7)).toBe("Lorem i");
    expect(trim("Lorem ipsum dolor sit amet", 12)).toBe("Lorem ipsum");
    expect(trim("Lorem ipsum dolor sit amet", 11)).toBe("Lorem ipsum");
    expect(trim("Lorem ipsum dolor sit amet", 100)).toBe(
      "Lorem ipsum dolor sit amet"
    );
  });
});
