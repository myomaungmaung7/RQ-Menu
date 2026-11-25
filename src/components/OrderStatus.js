import { Check, ChefHat, Receipt, Soup, Utensils } from "lucide-react";
import { formatKs } from "../data/menu";
import { useOrder } from "../context/OrderContext";

const STEPS = [
  {
    id: "sent",
    title: "Sent to kitchen",
    detail: "Your order reached the kitchen ticket.",
    icon: Soup,
  },
  {
    id: "preparing",
    title: "Preparing",
    detail: "Chefs are cooking your dishes.",
    icon: ChefHat,
  },
  {
    id: "served",
    title: "Food served",
    detail: "Your meal is at the table. Enjoy.",
    icon: Utensils,
  },
];

function stepIndex(status) {
  return STEPS.findIndex((s) => s.id === status);
}

export default function OrderStatus() {
  const {
    orders,
    orderedItems,
    orderedTotal,
    orderStatus,
    requestBill,
    billRequested,
    tableNumber,
  } = useOrder();

  const current = stepIndex(orderStatus);
  const latest = orders[orders.length - 1];

  if (!orders.length) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="font-display text-xl text-forest-800">No active order</p>
        <p className="mt-2 text-sm text-forest-700/70">
          Place an order from the menu to track kitchen status here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-28 pt-4">
      <section className="rounded-3xl bg-forest-800 px-5 py-5 text-cream-50">
        <p className="text-xs font-medium uppercase tracking-wider text-cream-300">
          Table {tableNumber} · {latest.id}
        </p>
        <h2 className="mt-1 font-display text-2xl">Live order tracking</h2>
        <p className="mt-1 text-sm text-cream-200">
          Status updates simulate kitchen and service flow.
        </p>
      </section>

      <ol className="rounded-3xl bg-white/80 p-4 ring-1 ring-cream-300/70">
        {STEPS.map((step, index) => {
          const done = current > index;
          const active = current === index;
          const Icon = step.icon;
          return (
            <li key={step.id} className="flex gap-3 py-3">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    done
                      ? "bg-forest-600 text-white"
                      : active
                        ? "bg-forest-800 text-cream-50"
                        : "bg-cream-200 text-forest-700/50"
                  }`}
                >
                  {done ? <Check size={18} /> : <Icon size={18} />}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`mt-1 w-0.5 flex-1 min-h-6 ${
                      done ? "bg-forest-600" : "bg-cream-300"
                    }`}
                  />
                )}
              </div>
              <div className="pb-2">
                <p className={`text-sm font-semibold ${active ? "text-forest-800" : "text-forest-900"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-forest-700/70">{step.detail}</p>
                {active && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-forest-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-forest-600" />
                    In progress
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <section className="rounded-3xl bg-white/80 p-4 ring-1 ring-cream-300/70">
        <h3 className="font-display text-lg text-forest-900">Active ordered items</h3>
        <ul className="mt-3 divide-y divide-cream-200">
          {orderedItems.map((line, idx) => (
            <li key={`${line.key}-${idx}`} className="flex items-center justify-between py-2.5">
              <div className="min-w-0 pr-3">
                <p className="truncate text-sm font-medium text-forest-900">
                  {line.qty}× {line.name}
                </p>
                <p className="text-[11px] capitalize text-forest-700/65">
                  {line.spice ? `${line.spice}` : "As served"}
                  {line.note ? ` · ${line.note}` : ""}
                </p>
              </div>
              <p className="text-sm font-semibold text-forest-800">
                {formatKs(line.price * line.qty)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between border-t border-cream-300 pt-3">
          <span className="text-sm text-forest-700">Order total</span>
          <span className="font-display text-lg text-forest-800">{formatKs(orderedTotal)}</span>
        </div>
      </section>

      <button
        type="button"
        onClick={requestBill}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-cream-200 py-3.5 text-sm font-semibold text-forest-900 ring-1 ring-cream-400/80"
      >
        <Receipt size={18} />
        {billRequested ? "Bill already requested" : "Request bill"}
      </button>
    </div>
  );
}
