import { Bell, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useOrder } from "../context/OrderContext";

export default function Header() {
  const {
    restaurant,
    tableNumber,
    cartCount,
    setCartOpen,
    hasActiveDining,
    orderStatus,
    setView,
  } = useOrder();

  return (
    <header className="sticky top-0 z-20 border-b border-cream-300/70 bg-cream-50/90 px-4 pb-3 pt-3 backdrop-blur-md sm:pt-10">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-800 text-cream-100 shadow-sm">
            <UtensilsCrossed size={20} strokeWidth={1.75} />
          </div>
          <div>
            <p className="font-display text-lg leading-tight text-forest-800">
              {restaurant.name}
            </p>
            <p className="text-xs font-medium tracking-wide text-forest-700/70">
              Table {tableNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => hasActiveDining && setView("status")}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-cream-200 text-forest-800"
            aria-label="Order notifications"
          >
            <Bell size={18} />
            {hasActiveDining && orderStatus !== "served" && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-forest-600 ring-2 ring-cream-50" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-forest-800 text-cream-50"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cream-300 px-1 text-[10px] font-semibold text-forest-900">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
