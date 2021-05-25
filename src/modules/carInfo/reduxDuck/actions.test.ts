import {useSelector} from "react-redux"

import {get} from "../../../api"

import {INIT_DONE} from "./actionTypes"
import {initAction} from "./actions"

jest.mock("../../../api")

afterEach(() => {
  get.mockClear()
})
test("initAction return success action", async () => {
  get.mockImplementationOnce(() => Promise.resolve(["foo", "bar"]))

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

jest.useFakeTimers()
test("initAction retry and return success action", async () => {
  get.mockImplementation(() => {
    if (get.mock.calls.length > 2) {
      return Promise.resolve(["foo", "bar"])
    }

    return Promise.reject("error")
  })

  const dispatch = jest.fn()

  await initAction()(dispatch)
  jest.runAllTimers()
  expect(get).toBeCalledTimes(2)
  expect(get).lastCalledWith("/api/makes")
  expect(dispatch).toBeCalledWith({
    error: true,
    meta: undefined,
    payload: "error",
    type: INIT_DONE,
  })
})
