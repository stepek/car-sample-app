import {FSA} from "redux-duck"

import {Dispatch} from "react"

import {get, retryWhenFail} from "../../../api"

import {INIT_DONE, SELECT_MAKER_DONE, SELECT_MODEL_DONE} from "./actionTypes"
import duck from "./duck"
import {Vehicle} from "./types"

const initSuccess = duck.createAction<string[]>(INIT_DONE)
const initFailure = duck.createAction<string>(INIT_DONE, true)

export function initAction() {
  return async (dispatch: Dispatch<FSA<string[] | string>>) => {
    try {
      const data = await retryWhenFail<string[]>(() =>
        get<string[]>("/api/makes"),
      )

      dispatch(initSuccess(data))
    } catch (e) {
      dispatch(initFailure("error"))
    }
  }
}

const selectMakerSuccess = duck.createAction<string[]>(SELECT_MAKER_DONE)
const selectMakerFailure = duck.createAction<string>(SELECT_MAKER_DONE, true)

export function selectMakerAction(maker: string) {
  return async (dispatch: Dispatch<FSA<string[] | string>>) => {
    try {
      const data = await retryWhenFail<string[]>(() =>
        get<string[]>("/api/models", {make: maker}),
      )

      dispatch(selectMakerSuccess(data))
    } catch (e) {
      dispatch(selectMakerFailure("error"))
    }
  }
}

const selectModelSuccess = duck.createAction<Vehicle[]>(SELECT_MODEL_DONE)
const selectModelFailure = duck.createAction<string>(SELECT_MODEL_DONE, true)

export function selectModelAction(maker?: string, model?: string) {
  return async (dispatch: Dispatch<FSA<string[] | string>>) => {
    try {
      const data = await retryWhenFail<Vehicle[]>(() =>
        get<Vehicle[]>("/api/vehicles", {
          make: maker,
          model: model,
        }),
      )

      dispatch(selectModelSuccess(data))
    } catch (e) {
      dispatch(selectModelFailure("error"))
    }
  }
}
