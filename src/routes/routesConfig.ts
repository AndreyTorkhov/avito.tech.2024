import OrdersPage from "../containers/OrdersPage";
import StartPage from "../containers/StartPage";
import AdvertisementsPage from "../containers/AdvertisementsPage";

const routesConfig = [
  {
    path: "/",
    component: StartPage,
  },
  {
    path: "/advertisement/:id",
    component: AdvertisementsPage,
  },
  {
    path: "/orders",
    component: OrdersPage,
  },
];

export default routesConfig;
