import { ClipboardList, Receipt, UtensilsCrossed } from "lucide-react";
import { formatKs } from "../data/menu";
import { useOrder } from "../context/OrderContext";

export default function BottomBar() {
  const {
    view,
    setView,
    cartCount,
    cartTotal,
    setCartOpen,
    hasActiveDining,
    requestBill,
    billRequested,
  } = useOrder();

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-cream-300/80 bg-cream-50/95 px-3 pb-3 pt-2 backdrop-blur">
      {cartCount > 0 && view === "menu" && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="mb-2 flex w-full items-center justify-between rounded-full bg-forest-800 px-5 py-3 text-cream-50"
        >
          <span className="text-sm font-semibold">
            View cart · {cartCount} item{cartCount > 1 ? "s" : ""}
          </span>
          <span className="text-sm font-semibold">{formatKs(cartTotal)}</span>
        </button>
      )}

      <nav className="grid grid-cols-3 gap-1">
        <TabButton
          active={view === "menu"}
          onClick={() => setView("menu")}
          icon={UtensilsCrossed}
          label="Menu"
        />
        <TabButton
          active={view === "status"}
          onClick={() => setView("status")}
          icon={ClipboardList}
          label="Order"
        />
        <button
          type="button"
          onClick={() => {
            if (hasActiveDining) requestBill();
            else setView("status");
          }}
          className={`flex flex-col items-center rounded-xl py-1.5 text-[11px] font-medium ${
            billRequested ? "text-forest-600" : "text-forest-800/70"
          }`}
        >
          <Receipt size={18} />
          Bill
        </button>
      </nav>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center rounded-xl py-1.5 text-[11px] font-medium ${
        active ? "bg-cream-200 text-forest-900" : "text-forest-800/70"
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}
