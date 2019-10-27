describe("Prototype", () => {
  it("Should use Function constructor without prototype", () => {
    //DONE
    // TODO: implement
    function User(name) {
      this.name = name;
      this.sayHello = function() {
        return `Hello, ${this.name}`;
      };
    }

    const user1 = new User("user1");
    const user2 = new User("user2");

    expect(user1.name).toBe("user1");
    expect(user2.name).toBe("user2");
    expect(user1.sayHello()).toBe("Hello, user1");
    expect(user2.sayHello()).toBe("Hello, user2");
    expect(user1.sayHello !== user2.sayHello).toBe(true);
  });

  it("Should use prototype", () => {
    //DONE
    // TODO: implement
    function User(name) {
      this.name = name;
    }
    User.prototype.sayHello = function() {
      return `Hello, ${this.name}`;
    };
    const user1 = new User("user1");
    const user2 = new User("user2");
    user1.prototype = User;
    expect(user1.name).toBe("user1");
    expect(user2.name).toBe("user2");
    expect(user1.sayHello()).toBe("Hello, user1");
    expect(user2.sayHello()).toBe("Hello, user2");
    expect(user1.sayHello === user2.sayHello).toBe(true);
  });

  it("Create class ArticleList with 2 methods add and articleCount", () => {
    //DONE
    // TODO: implement
    function ArticleList() {
      this.list = [];
    }

    ArticleList.prototype.add = function() {
      this.list.push(this.text);
    };

    const list1 = new ArticleList();
    const list2 = new ArticleList();
    list1.add("aaaa");
    list2.add("bbb");
    expect(list1.list.length).toBe(1);
  });

  it("Extend using prototype", () => {
    /*
      Component should has following methods:
      render -  returns empty string
      getData - return data
      constructor - accept object width property data, that should be returned from getData
    */

    function Component({ data }) {
      this.data = data;
    }
    Component.prototype.render = function() {
      return "";
    };
    Component.prototype.getData = function() {
      return this.data;
    };
    Component.prototype.setData = function(prop) {
      this.data[Object.keys(prop).toString()] =
        prop[Object.keys(prop).toString()];
    };

    // TODO: implement

    // {
    //   msg: this.msg,
    //   name: this.name
    // };

    /*
       UserComponent should extends Component
       override render method
       add 2 following methods:
       login - set data.name
       logout - set data.name undefined
     */

    // TODO: implement
    function UserComponent({ data }) {
      this.data = data;
    }
    UserComponent.prototype = Object.create(Component.prototype);

    UserComponent.prototype.render = function() {
      if (this.data.name !== undefined) {
        return `${this.data.msg}, ${this.data.name}!`;
      } else {
        return `${this.data.msg}, guest!`;
      }
    };
    UserComponent.prototype.logout = function() {
      this.data.name = undefined;
    };
    UserComponent.prototype.login = function(name) {
      this.data.name = name;
    };
    const component = new Component({
      data: {
        name: "Tom",
        msg: "Hello"
      }
    });

    expect(component.render()).toBe("");
    expect(component.getData()).toEqual({
      name: "Tom",
      msg: "Hello"
    });
    component.setData({
      name: "Bob"
    });
    expect(component.render()).toBe("");
    expect(component.getData()).toEqual({
      name: "Bob",
      msg: "Hello"
    });

    const userComponent = new UserComponent({
      data: {
        name: "Tom",
        msg: "Hello"
      }
    });

    expect(userComponent.render()).toBe("Hello, Tom!");
    userComponent.logout();
    expect(userComponent.render()).toBe("Hello, guest!");
    userComponent.login("Tom");
    userComponent.setData({ msg: "Greetings" });
    expect(userComponent.render()).toBe("Greetings, Tom!");
  });

  it("Should extend Child class from Parent ", () => {
    // Component and  UserComponent has requirement from previous test

    // TODO: implement
    function extend(Child, Parent) {
      Child.prototype = Object.create(Parent.prototype);
    }

    // TODO: implement
    function Component({ data }) {
      this.data = data;
    }
    Component.prototype.render = function() {
      return "";
    };
    Component.prototype.getData = function() {
      return this.data;
    };
    Component.prototype.setData = function(prop) {
      this.data[Object.keys(prop).toString()] =
        prop[Object.keys(prop).toString()];
    };

    // TODO: implement
    // NOTE: for inheritance should be used extend method
    function UserComponent({ data }) {
      this.data = data;
    }

    extend(UserComponent, Component);

    UserComponent.prototype.render = function() {
      if (this.data.name !== undefined) {
        return `${this.data.msg}, ${this.data.name}!`;
      } else {
        return `${this.data.msg}, guest!`;
      }
    };
    UserComponent.prototype.logout = function() {
      this.data.name = undefined;
    };
    UserComponent.prototype.login = function(name) {
      this.data.name = name;
    };

    const component = new Component({
      data: {
        name: "Tom",
        msg: "Hello"
      }
    });

    expect(component.render()).toBe("");
    expect(component.getData()).toEqual({
      name: "Tom",
      msg: "Hello"
    });
    component.setData({
      name: "Bob"
    });
    expect(component.render()).toBe("");
    expect(component.getData()).toEqual({
      name: "Bob",
      msg: "Hello"
    });

    const userComponent = new UserComponent({
      data: {
        name: "Tom",
        msg: "Hello"
      }
    });

    expect(userComponent.render()).toBe("Hello, Tom!");
    userComponent.logout();
    expect(userComponent.render()).toBe("Hello, guest!");
    userComponent.login("Tom");
    userComponent.setData({ msg: "Greetings" });
    expect(userComponent.render()).toBe("Greetings, Tom!");
  });

  it("Should use Class declaration for Component and UserComponent", () => {
    // TODO implement Component and UserComponent from previous tasks using Class declaration
    class Component {
      constructor({ data }) {
        this.data = data;
      }
      render() {
        return "";
      }
      getData() {
        return this.data;
      }
      setData(prop) {
        this.data[Object.keys(prop).toString()] =
          prop[Object.keys(prop).toString()];
      }
    }

    const component = new Component({
      data: {
        name: "Tom",
        msg: "Hello"
      }
    });

    expect(component.render()).toBe("");
    expect(component.getData()).toEqual({
      name: "Tom",
      msg: "Hello"
    });
    component.setData({
      name: "Bob"
    });
    expect(component.render()).toBe("");
    expect(component.getData()).toEqual({
      name: "Bob",
      msg: "Hello"
    });

    class UserComponent extends Component {
      constructor({ data }) {
        super({ data });
      }
      render() {
        if (this.data.name !== undefined) {
          return `${this.data.msg}, ${this.data.name}!`;
        } else {
          return `${this.data.msg}, guest!`;
        }
      }
      logout() {
        this.data.name = undefined;
      }
      login(name) {
        this.data.name = name;
      }
    }

    const userComponent = new UserComponent({
      data: {
        name: "Tom",
        msg: "Hello"
      }
    });

    expect(userComponent.render()).toBe("Hello, Tom!");
    userComponent.logout();
    expect(userComponent.render()).toBe("Hello, guest!");
    userComponent.login("Tom");
    userComponent.setData({ msg: "Greetings" });
    expect(userComponent.render()).toBe("Greetings, Tom!");
  });

  it("Should use Object.create for extending one object from another", () => {
    //DONE
    // DON'T CHANGE
    const greetings = {
      msg: "Hello",
      name: "guest",

      greetings: function() {
        return `${this.msg}, ${this.name}!`;
      }
    };

    let helloTom = Object.create(greetings);
    helloTom.name = "Tom";
    let greetingsBob = Object.create(greetings);
    greetingsBob.name = "Bob";
    greetingsBob.msg = "Greetings";

    expect(helloTom.greetings()).toBe("Hello, Tom!");
    expect(greetingsBob.greetings()).toBe("Greetings, Bob!");
    expect(greetings.greetings()).toBe("Hello, guest!");
  });
});
