import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES } from "../data/menu";
import { useOrder } from "../context/OrderContext";
import MenuItemCard from "./MenuItemCard";

export default function MenuPage() {
    const { menuItems, setCustomizeItem, tableNumber } = useOrder(); // Access the order context
    const [ category, setCategory ] = useState("all"); // State to hold the selected category
    const [ query, setQuery ] = useState(""); // State to hold the search query

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return menuItems.filter((item) => {
        const matchesCategory =  category === "all" ||
          (category === "popular" && item.popular) ||
          item.category === category;
        const matchesQuery = !q || item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      });
    }, [menuItems, category, query]);

  return (
    <div className="pb-28">
      <div className="px-4 pt-4">
        {tableNumber && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800">
            <span>Table: {tableNumber}</span>
          </div>
        )}
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-700/70">
          Digital menu
        </p>
        <h1 className="mt-1 font-display text-[1.65rem] leading-tight text-forest-900">
          What would you like tonight?
        </h1>
        <label className="mt-4 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-cream-300">
          <Search size={18} className="text-forest-700/50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes, drinks…"
            className="w-full bg-transparent text-sm text-forest-900 outline-none placeholder:text-forest-800/40"
          />
        </label>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {CATEGORIES.map((cat) => {
          const active = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
                active
                  ? "bg-forest-800 text-cream-50"
                  : "bg-white text-forest-800 ring-1 ring-cream-300"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-3 px-4">
        {filtered.length === 0 ? (
          <p className="rounded-2xl bg-white/70 px-4 py-10 text-center text-sm text-forest-700/70">
            No dishes match that search.
          </p>
        ) : (
          filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} onOpen={setCustomizeItem} />
          ))
        )}
      </div>
    </div>
  );
}
