import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 z-30 h-full w-56 border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center border-b border-slate-200 px-4">
          <Link href="/admin" className="font-semibold text-slate-900">
            Admin
          </Link>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <Link
            href="/admin"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/services"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Services
          </Link>
          <Link
            href="/admin/locations"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Locations
          </Link>
          <Link
            href="/admin/leads"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Leads
          </Link>
          <Link
            href="/admin/blog"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Blog
          </Link>
          <Link
            href="/"
            className="mt-4 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100"
          >
            ← Back to site
          </Link>
        </nav>
      </aside>
      <main className="pl-56">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
