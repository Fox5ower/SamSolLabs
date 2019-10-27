import { type } from "os";

describe("Data types", () => {
  describe("Boolean", () => {
    it("Should define False and True boolean variables", () => {
      let a = false;
      let b = true;

      expect(a).toBeFalsy();
      expect(typeof a).toBe("boolean");
      expect(b).toBeTruthy();
      expect(typeof b).toBe("boolean");
    });

    it("Should use different logical operators with 2 boolean operands", () => {
      const FALSE = false;
      const TRUE = true;

      let useLogicalAnd = FALSE && TRUE;
      let useLogicalOr = FALSE || TRUE;
      let useLogicalNot = !FALSE;
      let useDoubleLogicalNot = !!TRUE;

      expect(useLogicalAnd).toBe(false);
      expect(useLogicalOr).toBe(true);
      expect(useLogicalNot).toBe(true);
      expect(useDoubleLogicalNot).toBe(true);
    });

    it("Should use different logical operators with at least 3 boolean operands", () => {
      const a = false;
      const b = false;
      const c = true;
      const d = true;

      let cond1 = (a || c) && d;
      let cond2 = !a && c && !!d;
      let cond3 = a || (b && !d);
      let cond4 = (b && c) || !d;

      expect(cond1).toBe(true);
      expect(cond2).toBe(true);
      expect(cond3).toBe(false);
      expect(cond4).toBe(false);
    });
  });

  describe("Number", () => {
    it("Should define different numbers", () => {
      let a = 10;
      let b = 1 / 0; //Infinity
      let c = 20.1;
      let d = Number.MIN_SAFE_INTEGER;
      let nan = NaN;

      expect(a).toBe(10);
      expect(!Number.isFinite(b)).toBe(true);
      expect(c).toBeGreaterThan(20);
      expect(c).toBeLessThan(21);
      expect(d).toBeLessThan(0);
      expect(nan).toBeNaN();
    });

    it("Should use base operators", () => {
      const a = 10;
      const b = 30;

      expect(a + b).toBe(40);
      expect(a - b).toBe(-20);
      expect(b - a).toBe(20);
      expect(b * a).toBe(300);
      expect(b / a).toBe(3);
      expect(a / b).toBeCloseTo(0.333);
    });

    it("Should combine base operators", () => {
      const a = 10;
      const b = 30;
      const c = 100;

      expect(a + b + c).toBe(140);
      expect((a + b) * a).toBe(400);
      expect(b * c - a * c).toBe(2000);
      expect(b * c + a * b).toBe(3300);
      expect((a * b) / (a * c - c)).toBeCloseTo(0.333);
      expect(((a / c) * b) / c).toBeCloseTo(0.03);
    });

    it("Should convert to number", () => {
      expect(Number("123")).toBe(123);
      expect(Number("12.3")).toBe(12.3);

      expect(Number("0012")).toBe(12);
      expect(Number(12 + ".3")).toBe(12.3);
      expect(Number(false)).toBe(0);
      expect(Number("")).toBe(0);
      expect(Number("0b11")).toBe(0b11);
      expect(Number("foo")).toBe(NaN);
      expect(1 / "why me?").toBe(NaN);
      expect(Number(-1 / 0)).toBe(Number.NEGATIVE_INFINITY);
    });
  });

  describe("String, object, null, undefined and symbols", () => {
    it("String", () => {
      let str1 = "string"; // Use single quote
      let str2 = String("string"); // Use String(???)
      let str3 = new String("string"); // Use new String(???)
      let str4 = `${str1}`; // Use template string and str1 variable

      expect(str1).toBe("string");
      expect(str1 === str2).toBeTruthy();
      expect(str1 === str3).toBeFalsy();
      expect(str1 === str4).toBeTruthy();
      expect(typeof str3).toBe("object");
    });

    it("Should define object with 2 props", () => {
      let obj = {
        userName: "Allen",
        userNick: "Alien146"
      }; // Define object with 2 props

      expect(typeof obj).toBe("object");
      expect(Object.keys(obj).length).toBe(2);
      expect(obj.userName).toBe("Allen");
      expect(typeof obj.userName).toBe("string");

      // TODO: write 2 own tests
    });

    it("Should define variable with Null and undefined values", () => {
      let nullVar = null; // Set null
      let undefinedVar = undefined; // Set undefined
      let someVar; // Do not define it!!!

      expect(nullVar).toBeNull();
      expect(undefinedVar).toBe(undefinedVar);
      expect(someVar).toBe(undefined);
      expect(typeof nullVar).toBe("object");
      expect(typeof undefinedVar).toBe("undefined");
    });

    it("Should define 2 Symbol variable with the same description", () => {
      const smbl1 = Symbol("test");
      const smbl2 = Symbol("test");

      expect(typeof smbl1).toBe("symbol");
      expect(typeof smbl2).toBe("symbol");
      expect(smbl1 === smbl2).toBeFalsy();
    });
  });
});
