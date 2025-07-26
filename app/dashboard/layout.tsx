import Sidebar from "@/components/ui/sidebar"


// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex' }}>
      <aside><Sidebar/></aside>
      <section>{children}</section>
    </div>
  )
}
