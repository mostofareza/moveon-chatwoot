export type Companion = {
  contact?: CompanionContact;
  customer?: Customer;
  parcels?: Parcel[];
  orders?: Order[];
  [key: string]: any;
};

export type CompanionContact = {
  email: string | null;
  name: string;
  phone_number: string | null;
  [key: string]: any;
};

export type TimelineView = {
  id: number;
  status: string;
  message: string;
  created_at: string;
  causer?: {
    full_name: string;
  };
}

export type ShippingCategoryTag = {
  foreign_name: string;
  price: number;
  unit: string;
  type: string;
  created_at: string;
  slots?: Slot[];
  [key: string]: any;
}

export type Slot = {
  from: string;
  to: string;
  rate: number;
}

export type Charge = {
  id: number;
  amount: number;
  total_unit: number;
  type: string;
  description: string;
  created_at: string;
  order_item_id: number;
  shipping_category_tag: ShippingCategoryTag;
  [key: string]: any;
};

export type Issue = {
  id: number;
  status: string;
  type: string;
  customer_note: string;
  created_at: string;
  meta: [
    {
      key: string;
      value: string;
    },
    {
      action: string;
      action_at: string;
    }
  ]
  [key: string]: any;
};

export type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  status: string;
  gender: string;
  [key: string]: any;
};

export type Order = {
  id: number;
  total: number;
  paid: number;
  due: number;
  status: string;
  pay_type: string;
  verification: string;
  instruction: string|null;
  source: string | null;
  items: OrderItem[];
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  [key: string]: any;
};

export type OrderDetails = {
  id: number;
  total: number;
  paid: number;
  due: number;
  status: string;
  pay_type: string;
  customer: {
    id: number;
    billing_address: CustomerAddress;
  };
  packages: Package[];
  transactions: Transaction[];
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  [key: string]: any;
};

export type CustomerAddress = {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  phone: string;
  [key: string]: any;
};

export type Package = {
  id: number;
  order_id: number;
  seller_name: string;
  items: [{
    id: number;
    title: string;
    link: string;
    image: string;
    quantity: number;
    price: number;
    fxPrice: number;
    total: number;
    type: string;
    status: string;
    shop_id: number;
    attrs: Attrs[];
    meta_items: MetaItems[];
    [key: string]: any;
  }];
  created_at: string | null;
  [key: string]: any;
};

export type OrderItem = {
  id: number;
  title: string;
  link: string;
  image: string;
  quantity: number;
  price: number;
  fxPrice: number;
  total: number;
  type: string;
  status: string;
  shop_id: number;
  attrs: Attrs[];
  meta_items: MetaItems[];
  [key: string]: any;
};

export type Attrs = {
  key: string;
  value: string;
  valueId: number;
  [key: string]: any;
}

export type MetaItems = {
  id: number;
  attrs: Attrs[];
  fx: number;
  fxPrice: number;
  price: number;
  quantity: number;
  skuid: string;
  order_item_id: number;
  props: string;
  [key: string]: any;
}

export type Transaction = {
  id: number;
  key: string;
  gateway: {
    id: number;
    name: string;
  }
  payable_id: number;
  gateway_id: number;
  amount: number;
  fee: number;
  status: string;
  created_at: string | null;
  [key: string]: any;
}

export type Delivery = {
  id: number;
  created_at: string | null;
  courier: {
    id: number;
    name: string;
  }
  tracking_code: string;
  customer_address: CustomerAddress;
  items: DeliveryItemDetails[];
  [key: string]: any;
}

export type DeliveryItemDetails = {
  id: number;
  order_item_id: number;
  parcel_id: number;
  status: string;
  tracking_code: string;
  [key: string]: any;
};

export type Parcel = {
  id: number;
  status: string;
  type: string;
  tracking_code: null | string;
  address: string | null;
  deleted_at: string | null;
  due: number;
  [key: string]: any;
};

export type ParcelItemsOrder = {
  id: number;
  title: string;
  image: string;
  tracking_code: string;
  price: number;
  status: string;
  [key: string]: any;
};

export type Cart = {
  id: number;
  status: string;
  type: string;
  shop: {
    id: number;
    name: string;
  }
  quantity: number;
  price: number;
  freight: string;
  skuid: string;
  attrs: Attrs[];
  created_at: string | null;
  [key: string]: any;
};

export type Request = {
  id: number;
  title: string;
  link: string;
  status: string;
  type: string;
  shop: {
    id: number;
    name: string;
  }
  quantity: number;
  price: number;
  freight: string;
  skuid: string;
  attrs: {[key: string]: any};
  created_at: string | null;
  [key: string]: any;
};

export type StatusWithColors = {
  cart?: StatusModel;
  order?: StatusModel;
  parcel?: StatusModel;
  transaction?: StatusModel;
}

export type StatusModel = {
  statuses?: Record<string, string>;
  statuses_color?: Record<string, string>;
  item_statuses?: Record<string, string>;
  item_statuses_color?: Record<string, string>;
  product_statuses?: Record<string, string>;
  product_statuses_color?: Record<string, string>;
}
