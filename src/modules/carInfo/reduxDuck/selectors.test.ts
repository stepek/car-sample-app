import {getMakers} from "./selectors"

test("getMakers return null value", () => {
  const mockState = {
    carInfo: {
      makers: null,
    },
  }
  expect(getMakers()(mockState)).toEqual(null)
})

test("getMakers return list", () => {
  const mockState = {
    carInfo: {
      makers: ["foo", "bar", "baz"],
    },
  }
  expect(getMakers()(mockState)).toEqual(["foo", "bar", "baz"])
})

test("getMakers return filtered list", () => {
  const mockState = {
    carInfo: {
      makers: ["foo", "bar", "baz"],
    },
  }
  expect(getMakers("a")(mockState)).toEqual(["bar", "baz"])
})
