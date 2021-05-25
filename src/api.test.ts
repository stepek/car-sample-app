import fetchMock from "fetch-mock"

import {get, getRetryTime, parseQuery, retryWhenFail} from "./api"

test("API > parseQuery", () => {
  expect(parseQuery({})).toEqual("")
  expect(parseQuery({foo: "FOO"})).toEqual("foo=FOO")
  expect(parseQuery({foo: "FOO", bar: "BAR"})).toEqual("foo=FOO&bar=BAR")
})

afterEach(() => {
  fetchMock.restore()
})

test("API > get", async () => {
  fetchMock.getOnce("path:/models", {
    body: {
      someData: "foo_bar_baz_bas",
    },
  })

  expect(await get("/models")).toEqual({
    someData: "foo_bar_baz_bas",
  })
})

test("API > get witch query", async () => {
  const mock = fetchMock.getOnce("path:/models", {
    body: {
      someData: "foo_bar_baz_bas",
    },
  })

  expect(await get("/models", {foo: "FOO"})).toEqual({
    someData: "foo_bar_baz_bas",
  })

  expect(mock.lastUrl()).toEqual("http://localhost:8080/models?foo=FOO")
})

test("API > get error", () => {
  fetchMock.getOnce("path:/models", {
    throws: "ERROR",
    status: 503,
  })

  get("/models").catch(e => {
    expect(e).toEqual("ERROR")
  })
})

test("API > getRetryTime", () => {
  expect(getRetryTime(0)).toEqual(500)
  expect(getRetryTime(5)).toEqual(4000)
  expect(getRetryTime(20)).toEqual(5473000)
})

test("API > retryWhenFail success", async () => {
  const mock = jest.fn(() => Promise.resolve(1))

  expect(await retryWhenFail(mock, 10)).toEqual(1)
})

test("API > retryWhenFail retry with success", async () => {
  let callMockCounter = 0
  const mock = jest.fn(() => {
    callMockCounter += 1
    if (callMockCounter === 2) {
      return Promise.resolve(1)
    }

    return Promise.reject("error")
  })
  expect(await retryWhenFail(mock)).toEqual(1)
  expect(mock).toBeCalledTimes(2)
})

test("API > retryWhenFail retry with fail", async () => {
  expect.assertions(2)
  const mock = jest.fn(() => {
    return Promise.reject("error")
  })

  try {
    await retryWhenFail(mock, 3)
  } catch (e) {
    expect(e).toEqual("error")
    expect(mock).toBeCalledTimes(3)
  }
})
