const PUT_ANSWER_HERE = Symbol();

describe("Objects", () => {
  it("Should get the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.", () => {
    //DONE
    function get(obj, path) {
      path = Array.from(path.replace(/\./g, ""));
      for (let el in path) {
        obj = obj[path[el]];
      }
      return obj;
    }

    expect(get({ a: { b: { c: 3 } } }, "a")).toStrictEqual({ b: { c: 3 } });
    expect(get({ a: { b: { c: 3 } } }, "a.b.c")).toBe(3);
    expect(get({ a: { b: { c: 1, d: 2 } } }, "a.b")).toStrictEqual({
      c: 1,
      d: 2
    });
  });

  it("Creates an object composed of the picked object properties.", () => {
    //DONE
    function pick(obj, props) {
      return props.reduce((a, e) => ((a[e] = obj[e]), a), {});
    }
    const object = { a: 1, b: "2", c: 3 };

    expect(pick(object, ["a", "c"])).toStrictEqual({ a: 1, c: 3 });
    expect(pick(object, ["c"])).toStrictEqual({ c: 3 });
  });

  it("Should clone object", () => {
    const person1 = {
      firstName: "Ivan",
      secondName: "Ivanov"
    };

    const person2 = {};
    person2.__proto__ = person1;
    person2.firstName += " Jr.";

    expect(person1.firstName).toBe("Ivan");
    expect(person2.firstName).toBe("Ivan Jr.");
    expect(person2.secondName).toBe("Ivanov");
  });

  it("Performs a shallow comparison between two values to determine if they are equivalent.", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const obj3 = { a: 1, b: 4 };
    const obj4 = { a: 1, b: 4, c: 5 };

    function compare(obj1, obj2) {
      for (let key in obj1) {
        if (obj1[key].lenght != obj2[key].lenght) return false;
        else if (obj1[key] != obj2[key]) {
          return false;
        }
      }
      return true;
    }

    expect(compare(obj1, obj2)).toBe(true);
    expect(compare(obj1, obj3)).toBe(false);
    expect(compare(obj1, obj4)).toBe(false);
  });

  it("Performs a deep comparison between two values to determine if they are equivalent.", () => {
    const obj1 = { a: 1, b: { a: 2 } };
    const obj2 = { a: 1, b: { a: 2 } };
    const obj3 = { a: 2, b: { a: 2 } };
    function compare(obj1, obj2) {
      for (let key in obj1) {
        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
          compare(obj1[key], obj2[key]);
          return obj1[key] === obj2[key];
        } else {
          return obj1[key] === obj2[key];
        }
      }
    }
    expect(compare(obj1, obj2)).toBe(true);
    expect(compare(obj1, obj3)).toBe(false);
  });

  it("Fix me", () => {
    function hasAccess(role) {
      if (role.type == "admin") {
        return true;
      } else {
        return false;
      }
    }

    expect(hasAccess({ type: "admin" })).toBe(true);
    expect(hasAccess({ type: "anonymous" })).toBe(false);
  });
});
