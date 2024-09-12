import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiOrders } from "../../utils/network";
import { Order, OrderStatusType } from "../../types/interfaces";
import styles from "./OrdersPage.module.scss";
import Filter from "../../components/Filter";
import OrdersItem from "../../components/OrdersItem/OrdersItem"; // Импортируем компонент

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatusType | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const statusString = statusFilter ? statusFilter.toString() : undefined;
      const sortString = sortOrder === "asc" ? "price" : "price_desc";
      const data = await getApiOrders(
        "http://localhost:3000/orders",
        statusString,
        sortString
      );
      setOrders(data);
    };
    fetchOrders();
  }, [statusFilter, sortOrder]);

  useEffect(() => {
    let updatedOrders = [...orders];

    if (statusFilter !== "") {
      updatedOrders = updatedOrders.filter(
        (order) => order.status === Number(statusFilter)
      );
    }

    updatedOrders.sort((a, b) => {
      return sortOrder === "asc" ? a.total - b.total : b.total - a.total;
    });

    setFilteredOrders(updatedOrders);
  }, [orders, statusFilter, sortOrder]);

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div>
      <div className={styles.toolsContainer}>
        <Link to="/" className={styles.advertisementButton}>
          Перейти к объявлениям
        </Link>
      </div>

      <Filter onFilterChange={setStatusFilter} onSortChange={setSortOrder} />

      {filteredOrders.map((order) => (
        <OrdersItem
          key={order.id}
          order={order}
          expandedOrder={expandedOrder}
          toggleExpandOrder={toggleExpandOrder}
          navigate={navigate}
        />
      ))}
    </div>
  );
};

export default OrdersPage;
