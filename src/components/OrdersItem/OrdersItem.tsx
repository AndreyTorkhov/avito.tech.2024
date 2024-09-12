import React from "react";
import { Order, OrderStatus, OrderStatusType } from "../../types/interfaces";
import styles from "./OrdersItem.module.scss";

interface OrdersItemProps {
  order: Order;
  expandedOrder: string | null;
  toggleExpandOrder: (id: string) => void;
  navigate: (path: string) => void;
}

const OrdersItem: React.FC<OrdersItemProps> = ({
  order,
  expandedOrder,
  toggleExpandOrder,
  navigate,
}) => {
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
    <div key={order.id} className={styles.orderCard}>
      <div className={styles.orderCard__header}>
        <h3 className={styles.orderCard__title}>Номер заказа: {order.id}</h3>
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
        {expandedOrder === order.id ? "Скрыть товары" : "Показать все товары"}
      </button>
      {expandedOrder === order.id && (
        <div className={styles.orderCard__items}>
          {order.items.map((item) => (
            <div key={item.id} className={styles.orderCard__items__orderItem}>
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
  );
};

export default OrdersItem;
