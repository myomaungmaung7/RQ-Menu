import { BellRing, CheckCircle2, X } from "lucide-react";
import { useOrder } from "../context/OrderContext";

export default function BillRequestModal() {
  const { billModalOpen, setBillModalOpen, tableNumber } = useOrder();

  if (!billModalOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-forest-900/45 px-6">
      <div className="w-full rounded-3xl bg-cream-50 p-5 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-100 text-forest-800">
            <BellRing size={22} />
          </div>
          <button
            type="button"
            onClick={() => setBillModalOpen(false)}
            className="text-forest-700/60"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <h2 className="mt-4 font-display text-2xl text-forest-900">
          Bill requested
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-forest-800/75">
          Reception & kitchen notified for Table {tableNumber}. Staff will bring
          the check shortly.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-forest-800">
          <li className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-forest-600" />
            Kitchen notified to close the table ticket
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-forest-600" />
            Reception preparing the bill
          </li>
        </ul>
        <button
          type="button"
          onClick={() => setBillModalOpen(false)}
          className="mt-6 w-full rounded-full bg-forest-800 py-3 text-sm font-semibold text-cream-50"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
