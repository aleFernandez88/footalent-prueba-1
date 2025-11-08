import ClientGuard from "../guard/ClientGuard";

export const metadata = {
  title: "Dashboard",
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientGuard>
      <div className="min-h-screen">
        {children}
      </div>
    </ClientGuard>
  );
}
