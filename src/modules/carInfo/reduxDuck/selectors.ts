import {createSelector} from "reselect"

import {AppState} from "../../createStore"

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
