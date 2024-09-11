import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApiOrders } from "../../utils/network";
import { Order, OrderStatus, OrderStatusType } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";
import styles from "./OrdersPage.module.scss";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getApiOrders("http://localhost:3000/orders");
      setOrders(data);
    };
    fetchOrders();
  }, []);

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

      {orders.map((order) => (
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
