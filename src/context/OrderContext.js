import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MENU_ITEMS, RESTAURANT } from "../data/menu";

const OrderContext = createContext(null);

const STATUS_FLOW = [
  { id: "sent", label: "Order sent to kitchen", delay: 0 },
  { id: "preparing", label: "Preparing", delay: 3500 },
  { id: "served", label: "Food served", delay: 10000 },
];

function getTableFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const queryTable = params.get("table");
  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const pathTable = pathSegments[pathSegments.length - 1];

  const rawTable = queryTable || pathTable;
  const table = Number(rawTable);

  return Number.isFinite(table) && table > 0 ? table : RESTAURANT.defaultTable;
}

function lineKey(itemId, spice, note) {
  return `${itemId}__${spice || "none"}__${(note || "").trim().toLowerCase()}`;
}

export function OrderProvider({ children }) {
  const [tableNumber] = useState(getTableFromUrl);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [billRequested, setBillRequested] = useState(false);
  const [view, setView] = useState("menu");
  const [cartOpen, setCartOpen] = useState(false);
  const [customizeItem, setCustomizeItem] = useState(null);
  const [billModalOpen, setBillModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback((item, extras = {}) => {
    const spice = extras.spice || (item.spiceable ? "medium" : null);
    const note = extras.note?.trim() || "";
    const qty = extras.qty || 1;
    const key = lineKey(item.id, spice, note);

    setCart((prev) => {
      const existing = prev.find((line) => line.key === key);
      if (existing) {
        return prev.map((line) =>
          line.key === key ? { ...line, qty: line.qty + qty } : line
        );
      }
      return [
        ...prev,
        {
          key,
          itemId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          spice,
          note,
          qty,
        },
      ];
    });
    showToast(`${item.name} added to cart`);
  }, [showToast]);

  const updateQty = useCallback((key, delta) => {
    setCart((prev) =>
      prev
        .map((line) =>
          line.key === key ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    );
  }, []);

  const removeLine = useCallback((key) => {
    setCart((prev) => prev.filter((line) => line.key !== key));
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, line) => sum + line.qty, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.price * line.qty, 0),
    [cart]
  );

  const orderedItems = useMemo(
    () => orders.flatMap((order) => order.items),
    [orders]
  );

  const orderedTotal = useMemo(
    () =>
      orderedItems.reduce((sum, line) => sum + line.price * line.qty, 0),
    [orderedItems]
  );

  const placeOrder = useCallback(() => {
    if (!cart.length) return;
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      placedAt: new Date().toISOString(),
      items: cart,
      total: cartTotal,
    };
    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    setCartOpen(false);
    setBillRequested(false);
    setOrderStatus("sent");
    setView("status");
  }, [cart, cartTotal]);

  useEffect(() => {
    if (!orders.length) return undefined;
    setOrderStatus("sent");
    const timers = STATUS_FLOW.filter((step) => step.delay > 0).map((step) =>
      window.setTimeout(() => setOrderStatus(step.id), step.delay)
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [orders.length]);

  const requestBill = useCallback(() => {
    setBillRequested(true);
    setBillModalOpen(true);
  }, []);

  const value = {
    restaurant: RESTAURANT,
    tableNumber,
    menuItems: MENU_ITEMS,
    cart,
    cartCount,
    cartTotal,
    orders,
    orderedItems,
    orderedTotal,
    orderStatus,
    billRequested,
    view,
    setView,
    cartOpen,
    setCartOpen,
    customizeItem,
    setCustomizeItem,
    billModalOpen,
    setBillModalOpen,
    toast,
    addToCart,
    updateQty,
    removeLine,
    placeOrder,
    requestBill,
    hasActiveDining: orders.length > 0,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return ctx;
}
