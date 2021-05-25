import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"

import Select, {Options} from "../../../../components/Select"
import {
  initAction,
  selectMakerAction,
  selectModelAction,
} from "../../reduxDuck/actions"
import {getMakers, getModels, getVehicles} from "../../reduxDuck/selectors"
import {Vehicle} from "../../reduxDuck/types"

function optionsArrayToOptions(value: string[]): Options {
  return value.reduce((result: Options, maker) => {
    result[maker] = maker

    return result
  }, {})
}

function vehicleArrayToOptions(value: Vehicle[]): Options {
  return value.reduce((result: Options, vehicle) => {
    const key = `${vehicle.model}-${vehicle.model}-${vehicle.enginePowerPS}-${vehicle.bodyType}-${vehicle.fuelType}`
    const label = `${vehicle.bodyType} / ${vehicle.fuelType} / ${vehicle.enginePowerPS}PS (${vehicle.enginePowerKW}KW)`
    result[key] = label

    return result
  }, {})
}

export function CarInfoPage() {
  const dispatch = useDispatch()
  const makers = useSelector(getMakers())
  const models = useSelector(getModels())
  const vehicles = useSelector(getVehicles)

  const [selectedMaker, setSelectedMaker] = useState<string>()
  const [selectedModel, setSelectedModel] = useState<string>()
  const [selectedVehicle, setSelectedVehicle] = useState<string>()

  useEffect(() => {
    dispatch(initAction())
  }, [dispatch])

  return (
    <>
      {makers !== null && (
        <Select
          value={selectedMaker}
          placeholder={"Select Car Maker"}
          options={optionsArrayToOptions(makers)}
          onSelect={value => {
            setSelectedMaker(value)
            setSelectedModel(undefined)
            setSelectedVehicle(undefined)
            dispatch(selectMakerAction(value))
          }}
        />
      )}
      {models !== null && (
        <Select
          value={selectedModel}
          placeholder={"Select Model"}
          options={optionsArrayToOptions(models)}
          onSelect={value => {
            setSelectedModel(value)
            setSelectedVehicle(undefined)
            dispatch(selectModelAction(selectedMaker, value))
          }}
        />
      )}
      {vehicles !== null && (
        <Select
          value={selectedVehicle}
          placeholder={"Select vehicle"}
          options={vehicleArrayToOptions(vehicles)}
          onSelect={value => {
            setSelectedVehicle(value)
          }}
        />
      )}
    </>
  )
}

export default CarInfoPage
