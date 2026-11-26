import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { formatKs, SPICE_LEVELS } from "../data/menu";
import { useOrder } from "../context/OrderContext";

export default function CustomizeModal() {
  const { customizeItem, setCustomizeItem, addToCart } = useOrder();
  const [spice, setSpice] = useState("medium");
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (customizeItem) {
      setSpice(customizeItem.spiceable ? "medium" : null);
      setNote("");
      setQty(1);
    }
  }, [customizeItem]);

  if (!customizeItem) return null;

  const item = customizeItem;
  const close = () => setCustomizeItem(null);

  const confirm = () => {
    addToCart(item, { spice, note, qty });
    close();
  };

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-forest-900/40">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close customization"
        onClick={close}
      />
      <div className="relative max-h-[88%] w-full overflow-y-auto rounded-t-3xl bg-cream-50 pb-6 shadow-2xl">
        <div className="relative h-44">
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={close}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/95 text-forest-800"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pt-4">
          <h2 className="font-display text-2xl text-forest-900">{item.name}</h2>
          <p className="mt-1 text-sm leading-relaxed text-forest-800/70">
            {item.description}
          </p>
          <p className="mt-2 text-base font-semibold text-forest-800">
            {formatKs(item.price)}
          </p>

          {item.spiceable && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest-700">
                Spice level
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {SPICE_LEVELS.map((level) => {
                  const active = spice === level.id;
                  return (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setSpice(level.id)}
                      className={`rounded-2xl border px-2 py-3 text-center ${active
                          ? "border-forest-800 bg-forest-800 text-cream-50"
                          : "border-cream-300 bg-white text-forest-800"
                        }`}
                    >
                      <span className="block text-sm font-semibold">{level.label}</span>
                      <span className={`mt-0.5 block text-[10px] ${active ? "text-cream-200" : "text-forest-700/60"}`}>
                        {level.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <label className="mt-5 block">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-700">
              Special note
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="No onion, extra lime, allergy notes…"
              className="mt-2 w-full resize-none rounded-2xl border border-cream-300 bg-white px-3 py-3 text-sm text-forest-900 outline-none placeholder:text-forest-800/35 focus:border-forest-600"
            />
          </label>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex items-center rounded-full bg-cream-200 p-1">
              <button
                type="button"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-forest-800"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-forest-900">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((n) => n + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 text-cream-50"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              type="button"
              onClick={confirm}
              className="flex-1 rounded-full bg-forest-800 py-3 text-sm font-semibold text-cream-50"
            >
              Add to cart · {formatKs(item.price * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
