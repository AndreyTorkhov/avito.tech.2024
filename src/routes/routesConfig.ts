import OrdersPage from "../containers/OrdersPage";
import StartPage from "../containers/StartPage";
import AdvertisementsPage from "../containers/AdvertisementsPage";

const routesConfig = [
  {
    path: "/",
    component: StartPage, // Главная страница со всеми объявлениями
  },
  {
    path: "/:id",
    component: AdvertisementsPage, // Страница отдельного объявлени
  },
  {
    path: "/orders",
    component: OrdersPage,
  },
];

export default routesConfig;
