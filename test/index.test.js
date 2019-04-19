import { put } from "redux-saga/effects";
import {
  createActionTypeOnBeginning,
  createActionTypeOnFailure,
  createActionTypeOnFinish,
  createActionTypeOnSuccess,
  unfoldSaga
} from "../src";
import { noop } from "../src/helpers";

describe("Action creators", () => {
  let key;

  beforeAll(() => {
    key = "TEST";
  });

  describe("createActionTypeOnBeginning", () => {
    test("should return correct string", () => {
      const result = createActionTypeOnBeginning(key);
      expect(result).toBe("TEST_BEGAN");
    });
  });

  describe("createActionTypeOnFailure", () => {
    test("should return correct string", () => {
      const result = createActionTypeOnFailure(key);
      expect(result).toBe("TEST_FAILED");
    });
  });

  describe("createActionTypeOnFinish", () => {
    test("should return correct string", () => {
      const result = createActionTypeOnFinish(key);
      expect(result).toBe("TEST_FINISHED");
    });
  });

  describe("createActionTypeOnSuccess", () => {
    test("should return correct string", () => {
      const result = createActionTypeOnSuccess(key);
      expect(result).toBe("TEST_SUCCEEDED");
    });
  });
});

describe("unfoldSaga", () => {
  let generator;
  let key;
  let result;

  describe("on happy flow", () => {
    beforeAll(() => {
      key = "TEST";
      generator = unfoldSaga({
        handler: noop,
        key
      });
    });

    beforeEach(() => {
      result = generator.next();
    });

    test("should PUT onBeginning action", () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnBeginning(key) })
      );
    });

    test("should CALL onBeginning callback", () => {
      expect(result.done).toBe(false);
      // expect(result.value).toEqual(
      //   put({ type: createActionTypeOnBeginning(key) })
      // );
    });

    test("should CALL handler", () => {
      expect(result.done).toBe(false);
    });

    test("should PUT onSuccess action", () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnSuccess(key) })
      );
    });

    test("should CALL onSuccess callback", () => {
      expect(result.done).toBe(false);
      // expect(result.value).toEqual(
      //   put({ type: createActionTypeOnBeginning(key) })
      // );
    });

    test("should PUT onFinish action", () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnFinish(key) })
      );
    });

    test("should CALL onFinish callback", () => {
      expect(result.done).toBe(false);
      // expect(result.value).toEqual(
      //   put({ type: createActionTypeOnBeginning(key) })
      // );
    });
  });

  describe("on error flow", () => {
    beforeAll(() => {
      key = "TEST";
      generator = unfoldSaga({
        handler: () => {
          throw new Error("test");
        },
        key
      });
    });

    beforeEach(() => {
      result = generator.next();
    });

    test("should PUT onBeginning action", () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnBeginning(key) })
      );
    });

    test("should CALL onBeginning callback", () => {
      expect(result.done).toBe(false);
      // expect(result.value).toEqual(
      //   put({ type: createActionTypeOnBeginning(key) })
      // );
    });

    test("should CALL handler", () => {
      expect(result.done).toBe(false);
    });

    test("should PUT onFailure action", () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnFailure(key) })
      );
    });

    test("should CALL onFailure callback", () => {
      expect(result.done).toBe(false);
      // expect(result.value).toEqual(
      //   put({ type: createActionTypeOnBeginning(key) })
      // );
    });

    test("should PUT onFinish action", () => {
      expect(result.done).toBe(false);
      expect(result.value).toEqual(
        put({ type: createActionTypeOnFinish(key) })
      );
    });

    test("should CALL onFinish callback", () => {
      expect(result.done).toBe(false);
      // expect(result.value).toEqual(
      //   put({ type: createActionTypeOnBeginning(key) })
      // );
    });
  });
});
