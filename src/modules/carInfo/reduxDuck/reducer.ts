import {INIT_DONE} from "./actionTypes"
import duck from "./duck"
import {Vehicle} from "./types"

export interface CarInfoStore {
  makers: string[] | null
  models: string[] | null
  vehicles: Vehicle[] | null
}

export const reducer = duck.createReducer<CarInfoStore>(
  {
    [INIT_DONE]: (state, action) => {
      if (action?.error === false && action?.payload) {
        return {
          ...state,
          makers: action.payload as unknown as string[],
        }
      }

      return state
    },
  },
  {makers: null, models: null, vehicles: null},
)
