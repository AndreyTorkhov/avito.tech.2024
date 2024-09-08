import { BrowserRouter, Route, Routes } from "react-router-dom";
import routesConfig from "../../routes/routesConfig";
// import Navigation from "../../components/Navigation";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          {/* <Navigation /> */}
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
