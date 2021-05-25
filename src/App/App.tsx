import React from "react"
import {Provider} from "react-redux"

import CarInfoPage from "../modules/carInfo/components/CarInfoPage/CarInfoPage"
import {createStore} from "../modules/createStore"

export function App() {
  const store = createStore()

  return (
    <Provider store={store}>
      <CarInfoPage />
    </Provider>
  )
}

export default App
