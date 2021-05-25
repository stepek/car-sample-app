import {FSA} from "redux-duck"

import {INIT_DONE} from "./actionTypes"
import {reducer} from "./reducer"

test("returns initial state", () => {
  expect(reducer()).toEqual({makers: null, models: null, vehicles: null})
})

test("handle INIT_DONE action", () => {
  const initAction: FSA<string[], undefined> = {
    type: INIT_DONE,
    error: false,
    payload: ["foo", " bar", "baz"],
  }

  expect(
    reducer({makers: null, models: null, vehicles: null}, initAction),
  ).toEqual({makers: ["foo", " bar", "baz"], models: null, vehicles: null})
})
