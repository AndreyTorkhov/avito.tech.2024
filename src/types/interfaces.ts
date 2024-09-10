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

// const OrderStatus = {
//   Created: 0,
//   Paid: 1,
//   Transport: 2,
//   DeliveredToThePoint: 3,
//   Received: 4,
//   Archived: 5,
//   Refund: 6
// } as const;

// type OrderItem = Advertisment & { count: number; };

// type Order = {
//   /* Уникальный идентификатор. */
//   id: string;
//   /* Статус. */
//   status: typeof OrderStatus[keyof typeof OrderStatus];
//   /* Дата и время создания. */
//   createdAt: string;
//   /* Дата и время завершения. */
//   finishedAt?: string;
//   /* Товары в заказе. */
//   items: Array<OrderItem>;
//   /* Способ доставки(Почта, СДЭК...) */
//   deliveryWay: string;
//   /* Сумма заказа */
//   total: number;
// }

// type Image = {
//   /* Уникальный идентификатор. */
//   id: number;
//   /* Ссылка. */
//   url: string;
//   /* Название. */
//   name: string;
// }
