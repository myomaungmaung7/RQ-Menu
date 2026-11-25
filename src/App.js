import { OrderProvider, useOrder } from "./context/OrderContext";
import Header from "./components/Header";
import MenuPage from "./components/MenuPage";
import CartModal from "./components/CartModal";
import CustomizeModal from "./components/CustomizeModal";
import OrderStatus from "./components/OrderStatus";
import BillRequestModal from "./components/BillRequestModal";
import BottomBar from "./components/BottomBar";

function PhoneShell({ children }) {
  return (
    <div className="flex min-h-dvh items-stretch justify-center bg-forest-900 sm:items-center sm:px-4 sm:py-8">
      <div className="hidden w-[280px] pr-10 text-cream-100 lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-500">
          QR table ordering
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight">
          Scan. Order. Track.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-cream-200/80">
          Customer demo for Table 14. No login — guests land on the menu after
          scanning the table QR. Try adding dishes, placing an order, then
          requesting the bill.
        </p>
        <p className="mt-6 text-xs text-cream-300/70">
          Open with <code className="text-forest-500">?table=14</code> to
          simulate another table.
        </p>
      </div>

      <div className="relative h-dvh w-full overflow-hidden bg-cream-100 sm:h-[844px] sm:max-w-[390px] sm:rounded-[2.4rem] sm:shadow-phone sm:ring-[10px] sm:ring-forest-800">
        <div className="pointer-events-none absolute left-1/2 top-2 z-50 hidden h-6 w-28 -translate-x-1/2 rounded-full bg-forest-900/90 sm:block" />
        {children}
      </div>
    </div>
  );
}

function AppShell() {
  const { view, toast } = useOrder();

  return (
    <PhoneShell>
      <div className="relative flex h-full flex-col bg-cream-100 font-sans text-forest-900">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto">
          {view === "menu" ? <MenuPage /> : <OrderStatus />}
        </main>
        <BottomBar />
        <CustomizeModal />
        <CartModal />
        <BillRequestModal />
        {toast && (
          <div className="absolute bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-full bg-forest-900 px-4 py-2 text-xs font-medium text-cream-50 shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </PhoneShell>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <AppShell />
    </OrderProvider>
  );
}
