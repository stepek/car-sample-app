import fetchMock from "fetch-mock"

import {get, parseQuery} from "./api"

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

  expect(mock.lastUrl()).toEqual("http://localhost:8081/models?foo=FOO")
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
