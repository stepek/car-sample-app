import {retryWhenFail} from "../../../api"

import {INIT_DONE} from "./actionTypes"
import {initAction} from "./actions"

jest.mock("../../../api")

afterEach(() => {
  retryWhenFail.mockClear()
})
test("initAction return success action", async () => {
  retryWhenFail.mockImplementationOnce(() => Promise.resolve(["foo", "bar"]))

  const dispatch = jest.fn()

  await initAction()(dispatch)

  expect(dispatch).toBeCalledTimes(1)
  expect(dispatch).toBeCalledWith({
    error: false,
    meta: undefined,
    payload: ["foo", "bar"],
    type: INIT_DONE,
  })
})
