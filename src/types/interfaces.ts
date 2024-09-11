export type Advertisement = {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
  views: number;
  likes: number;
  imageUrl?: string;
};

export const OrderStatus = {
  Created: 0,
  Paid: 1,
  Transport: 2,
  DeliveredToThePoint: 3,
  Received: 4,
  Archived: 5,
  Refund: 6,
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export type Image = {
  id: number;
  url: string;
  name: string;
};

export type OrderItem = Advertisement & {
  count: number;
};

export const getOrderStatusText = (status: string) => {
  const orderStatus = status as unknown as OrderStatusType;

  switch (orderStatus) {
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

export type Order = {
  id: string;
  status: OrderStatusType;
  createdAt: string;
  finishedAt?: string;
  items: Array<OrderItem>;
  deliveryWay: string;
  total: number;
};
