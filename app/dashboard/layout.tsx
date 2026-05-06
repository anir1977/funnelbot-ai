import Shell from "@/components/dashboard/Shell";

export const metadata = {
  title: "لوحة التحكم — FunnelsLibrary",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
