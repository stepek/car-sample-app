import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import Select, {Options} from "../../../../components/Select"
import {initAction} from "../../reduxDuck/actions"
import {getMakers} from "../../reduxDuck/selectors"

export function CarInfoPage() {
  const dispatch = useDispatch()
  const makers = useSelector(getMakers())

  useEffect(() => {
    dispatch(initAction())
  }, [])

  return (
    <>
      <Select
        placeholder={"Select Car Maker"}
        options={makers?.reduce((result: Options, maker) => {
          result[maker] = maker

          return result
        }, {})}
      />
    </>
  )
}

export default CarInfoPage
