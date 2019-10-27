describe("THIS", () => {
  it("Should invoke function with specific this", () => {
    //DONE
    const a = { msg: "aaa" };
    const b = { msg: "bbb" };

    // DON'T CHANGE
    function example() {
      return this.msg + " " + this.msg;
    }

    expect(example.call(a)).toBe("aaa aaa");
    expect(example.call(b)).toBe("bbb bbb");
  });

  it("Should create function  connected with specific this", () => {
    function fn() {
      return this.name;
    }
    const tom = { name: "Tom", age: 22 };
    const bob = { name: "Bob", get: 50 };

    // TODO: fix
    const getTomName = fn.bind(tom);
    const getBobName = fn.bind(bob);

    expect(getTomName()).toBe("Tom");
    expect(getBobName()).toBe("Bob");
  });

  test("Function from object method. Fix me", () => {
    //DONE

    const person = {
      firstName: "Ivan",
      secondName: "Ivanov",
      age: 20,

      sayHello: function() {
        return `Hi, ${this.firstName}!`;
      }
    };

    const sayHello = function() {
      return person.sayHello();
    };

    expect(sayHello()).toBe(person.sayHello());
  });
});
