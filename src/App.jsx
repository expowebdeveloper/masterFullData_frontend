import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { route } from "./router";
import PublicLayout from './layout/PublicLayout';

function App() {
  return (
    <>
     <Suspense fallback={<p>Loading....</p>}>
        <Router>
          <Routes>
            {route?.map((item, index) =>
              !item.private && (
                <Route key={index} element={<PublicLayout />}>
                  <Route path={item.path} element={item.element} />
                </Route>
              ) 
            )}
          </Routes>
        </Router>
      </Suspense>
    </>
  )
}

export default App
