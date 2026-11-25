import { Minus, Plus, Trash2, X } from "lucide-react";
import { formatKs } from "../data/menu";
import { useOrder } from "../context/OrderContext";

export default function CartModal() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    cartTotal,
    updateQty,
    removeLine,
    placeOrder,
  } = useOrder();

  if (!cartOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-forest-900/40">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close cart"
        onClick={() => setCartOpen(false)}
      />
      <div className="relative flex max-h-[90%] w-full flex-col rounded-t-3xl bg-cream-50 shadow-2xl">
        <div className="flex items-center justify-between px-5 pb-2 pt-4">
          <div>
            <h2 className="font-display text-2xl text-forest-900">Your cart</h2>
            <p className="text-xs text-forest-700/70">Review items before sending to the kitchen</p>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-200 text-forest-800"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-2">
          {cart.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cream-300 bg-white/60 px-4 py-10 text-center">
              <p className="font-display text-lg text-forest-800">Cart is empty</p>
              <p className="mt-1 text-sm text-forest-700/70">Add dishes from the menu to get started.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {cart.map((line) => (
                <li
                  key={line.key}
                  className="flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-cream-300/70"
                >
                  <img
                    src={line.image}
                    alt=""
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-forest-900">{line.name}</p>
                        {line.spice && (
                          <p className="text-[11px] capitalize text-forest-700/70">
                            Spice: {line.spice}
                          </p>
                        )}
                        {line.note && (
                          <p className="truncate text-[11px] italic text-forest-700/60">
                            “{line.note}”
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        className="text-forest-700/50 hover:text-red-700"
                        aria-label={`Remove ${line.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-forest-800">
                        {formatKs(line.price * line.qty)}
                      </p>
                      <div className="flex items-center gap-2 rounded-full bg-cream-200 px-1 py-1">
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white"
                          aria-label="Decrease"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-xs font-semibold">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-800 text-cream-50"
                          aria-label="Increase"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-cream-300/80 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-forest-700/80">Subtotal</span>
            <span className="font-semibold text-forest-900">{formatKs(cartTotal)}</span>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display text-lg text-forest-900">Total</span>
            <span className="font-display text-xl text-forest-800">{formatKs(cartTotal)}</span>
          </div>
          <button
            type="button"
            disabled={!cart.length}
            onClick={placeOrder}
            className="w-full rounded-full bg-forest-800 py-3.5 text-sm font-semibold text-cream-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
}
