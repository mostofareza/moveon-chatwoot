// USE REAL COLOR CODES HERE PLEASE

// import { ContainsEnum } from "src/enums/shared";

const primary = "border-[#00B650] text-[#00B650] bg-[#DFFFED]"; // approved or success
const secondary = "border-[#0098B9] text-[#0098B9] bg-[#F6FEFC]"; // everything except others
const pending = "border-[#FEB600] text-[#FEB600] bg-[#FFF8EA]"; // pending
const warning = "border-[#FF8300] text-[#FF8300] bg-[#FFF8EA]"; // processing or warning
const error = "border-[#FF5A54] text-[#FF5A54] bg-[#FFEFEE]"; // error

const badgeStyles: { [key: string]: string } = {
  active: primary,
  inactive: warning,
  paid: primary,
  available: primary,
  settled: primary,
  unpaid: error,
  unsettled: error,
  "partial-paid": secondary,
  released: primary,

  // buy statuses
  "buy-pending": pending,
  "buy-approved": secondary,
  "buy-processing": warning,
  "buy-refund-processing": warning,
  "buy-refunded": warning,
  "buy-reject": error,
  "buy-not-purchased": warning,

  // Shipment statuses
  "shipment-pending": pending,
  "shipment-approved": secondary,
  "shipment-assigned-agent": secondary,
  "shipment-shipping-started": secondary,
  "shipment-arrived-at-warehouse": secondary,
  "shipment-handover-to-travel-agent": secondary,
  "shipment-handover-to-moveon": secondary,
  "shipment-preparing-for-transport": secondary,
  "shipment-handover-to-ship": secondary,
  "shipment-handover-to-airline": secondary,
  "shipment-arrived-at-destination-port": secondary,
  "shipment-arrived-at-destination-airport": secondary,
  "shipment-customs-released": secondary,
  "shipping-started": secondary,
  "shipment-not-arrived": warning,
  "shipment-rejected": error,
  "shipment-shipping-cancelled": error,
  "shipment-received-by-moveon": primary,

  // Delivery statuses
  "delivery-pending": pending,
  "delivered-to-customer": primary,
  "received-by-moveon": primary,
  delivered: primary,
  "delivery-ready": secondary,
  "delivery-shipped": secondary,
  "buy-handover-to-shipping": primary,
  "buy-purchased": secondary,
  "buy-refund-initiated": secondary,
  "delivery-failed": error,
  "delivery-returned": primary,
  "delivery-processing": warning,

  // delivery attempt statuses
  "delivery-attempt-pending": pending,
  "delivery-attempt-processing": warning,
  "delivery-attempt-picked-up": secondary,
  "delivery-attempt-conditional": secondary,
  "delivery-attempt-way-to-delivery": secondary,
  "delivery-attempt-delivered": secondary,
  "delivery-attempt-failed": error,
  "delivery-attempt-returned": error,

  shipped: secondary,
  pending: pending,
  open: pending,
  approved: primary,
  interested: warning,
  accepted: primary,
  processing: warning,
  "shipment-processing": warning,
  "top-rated": warning,
  rejected: error,
  declined: error,
  purchased: secondary,
  "not-purchased": secondary,
  "buy-cancelled": error,
  cancelled: error,
  "preparing-for-shipment": secondary,
  "handover-to-airline": secondary,
  "refund-initiated": warning,
  "refund-processing": warning,
  refunded: warning,
  "arrived-at-destination": secondary,
  "custom-released": secondary,
  "awaiting-delivery": secondary,
  "ready-for-ship": secondary,
  "handover-to-courier": secondary,
  upcoming: secondary,

  // [ContainsEnum.BATTERY]: "!bg-contains-danger !border-[#FF5A54] text-white",
  // [ContainsEnum.LIQUID]: "!bg-contains-danger !border-[#FF5A54] text-white",
  // [ContainsEnum.COPY]: "!bg-contains-danger !border-[#ff9100] text-white",
  // [ContainsEnum.REGULAR]: "!bg-contains-noContains text-white",
};

export default badgeStyles;
