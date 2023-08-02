import { Routes, Route } from "react-router-dom";
import {FibInput} from "./views/FibInput";
import {FibOutput} from "./views/FibOutput";

function App() {

  return (

    <>
      <Routes>
        <Route path="/" element={<FibInput/>} />
        <Route path="/result/:n" element={<FibOutput/>} />
      </Routes>
    </>
  )
}

export default App
