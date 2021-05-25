import React from "react"
import renderer from "react-test-renderer"

import Select from "./Select"

test("<Select> render correctly", () => {
  const component = renderer.create(<Select placeholder={"Foo Bar Baz"} />)

  expect(component.toJSON()).toMatchSnapshot()
})

test("<Select> render correctly with options", () => {
  const component = renderer.create(
    <Select options={{foo: "FOO", bar: "BAR"}} />,
  )
  expect(component.toJSON()).toMatchSnapshot()
})
