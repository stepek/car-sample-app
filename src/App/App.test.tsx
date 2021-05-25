import React from "react"
import renderer from "react-test-renderer"

import App from "./App"

test("<App>", () => {
  const component = renderer.create(<App />)

  expect(component.toJSON()).toMatchSnapshot()
})
