import {createSelector} from "reselect"

import {AppState} from "../../createStore"

import {Vehicle} from "./types"

const getState = (state: AppState) => state.carInfo

export const getMakers = (query?: string) =>
  createSelector<AppState, string[] | null, string[] | null>(
    state => getState(state).makers,
    makers => {
      if (makers === null) {
        return makers
      }

      if (query) {
        return makers.filter(item =>
          item.toLowerCase().includes(query.toLowerCase()),
        )
      }

      return makers
    },
  )

export const getModels = (query?: string) =>
  createSelector<AppState, string[] | null, string[] | null>(
    state => getState(state).models,
    models => {
      if (models === null) {
        return models
      }

      if (query) {
        return models.filter(item =>
          item.toLowerCase().includes(query.toLowerCase()),
        )
      }

      return models
    },
  )

export const getVehicles = createSelector<
  AppState,
  Vehicle[] | null,
  Vehicle[] | null
>(
  state => getState(state).vehicles,
  vehicles => {
    if (vehicles === null) {
      return vehicles
    }

    return vehicles
  },
)
