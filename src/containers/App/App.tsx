import { BrowserRouter, Route, Routes } from "react-router-dom";
import routesConfig from "../../routes/routesConfig";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            {routesConfig.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
