import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiOrders } from "../../utils/network";
import { Order, OrderStatus, OrderStatusType } from "../../types/interfaces";
import styles from "./OrdersPage.module.scss";
import Filter from "../../components/Filter";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatusType | "">(""); // Фильтр по статусу
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Порядок сортировки
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      // Преобразуем значения в строки
      const statusString = statusFilter ? statusFilter.toString() : undefined;
      const sortString = sortOrder === "asc" ? "price" : "price_desc";

      // Передаем параметры фильтрации и сортировки в запрос
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
    // Фильтрация и сортировка заказов
    let updatedOrders = [...orders];

    // Фильтрация по статусу
    if (statusFilter !== "") {
      updatedOrders = updatedOrders.filter(
        (order) => order.status === statusFilter
      );
    }

    // Сортировка по сумме
    updatedOrders.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.total - b.total;
      } else {
        return b.total - a.total;
      }
    });

    setFilteredOrders(updatedOrders);
  }, [orders, statusFilter, sortOrder]);

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getOrderStatusText = (status: OrderStatusType) => {
    switch (status) {
      case OrderStatus.Created:
        return "Создан";
      case OrderStatus.Paid:
        return "Оплачен";
      case OrderStatus.Transport:
        return "В пути";
      case OrderStatus.DeliveredToThePoint:
        return "Доставлен в пункт";
      case OrderStatus.Received:
        return "Получен";
      case OrderStatus.Archived:
        return "Архивирован";
      case OrderStatus.Refund:
        return "Возврат";
      default:
        return "Неизвестный статус";
    }
  };

  return (
    <div>
      <div className={styles.toolsContainer}>
        <Link to="/" className={styles.advertisementButton}>
          Перейти к объявлениям
        </Link>
      </div>

      {/* Подключаем фильтр */}
      <Filter onFilterChange={setStatusFilter} onSortChange={setSortOrder} />

      {/* Отображаем заказы */}
      {filteredOrders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderCard__header}>
            <h3 className={styles.orderCard__title}>
              Номер заказа: {order.id}
            </h3>
            <p className={styles.orderCard__status}>
              Статус: {getOrderStatusText(order.status)}
            </p>
          </div>
          <div className={styles.orderCard__details}>
            <div className={styles.orderCard__details__line}>
              <span className={styles.orderCard__details__line__label}>
                Дата создания:
              </span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles.orderCard__details__line}>
              <span className={styles.orderCard__details__line__label}>
                Стоимость:
              </span>
              <span>{order.total} руб.</span>
            </div>
            <div className={styles.orderCard__details__line}>
              <span className={styles.orderCard__details__line__label}>
                Количество товаров:
              </span>
              <span>{order.items.length}</span>
            </div>
          </div>
          <button
            className={styles.orderCard__button}
            onClick={() => toggleExpandOrder(order.id)}
          >
            {expandedOrder === order.id
              ? "Скрыть товары"
              : "Показать все товары"}
          </button>
          {expandedOrder === order.id && (
            <div className={styles.orderCard__items}>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className={styles.orderCard__items__orderItem}
                >
                  <span className={styles.orderCard__items__orderItem__name}>
                    {item.name}
                  </span>
                  <span className={styles.orderCard__items__orderItem__details}>
                    Цена: {item.price} руб.
                  </span>
                  <span className={styles.orderCard__items__orderItem__details}>
                    Количество: {item.count}
                  </span>
                  <button
                    className={styles.orderCard__items__orderItem__button}
                    onClick={() => navigate(`/advertisement/${item.id}`)}
                  >
                    Перейти к объявлению
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
