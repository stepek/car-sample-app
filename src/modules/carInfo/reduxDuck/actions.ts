import {FSA} from "redux-duck"

import {Dispatch} from "react"

import {get} from "../../../api"

import {INIT_DONE} from "./actionTypes"
import duck from "./duck"

const initSuccess = duck.createAction<string[]>(INIT_DONE)
const initFailure = duck.createAction<string>(INIT_DONE, true)

export function initAction() {
  return async (dispatch: Dispatch<FSA<string[] | string>>) => {
    try {
      const data = await get<string[]>("/api/makes")

      dispatch(initSuccess(data))
    } catch (e) {
      dispatch(initFailure("error"))
      setTimeout(async () => {
        await initAction()(dispatch)
      }, 500) // TODO increase time every call
    }
  }
}
