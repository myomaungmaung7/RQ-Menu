import { Plus } from "lucide-react";
import { formatKs } from "../data/menu";

export default function MenuItemCard({ item, onOpen }) {
  return (
    <article className="flex gap-3 rounded-2xl bg-white/80 p-3 shadow-sm ring-1 ring-cream-300/60">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-200"
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </button>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-[15px] text-forest-900">{item.name}</h3>
            {item.popular && (
              <span className="mt-0.5 inline-block rounded-full bg-forest-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-forest-700">
                Popular
              </span>
            )}
          </div>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-forest-800/65">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-sm font-semibold text-forest-800">{formatKs(item.price)}</p>
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="inline-flex items-center gap-1 rounded-full bg-forest-800 px-3 py-1.5 text-xs font-semibold text-cream-50"
          >
            <Plus size={14} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
