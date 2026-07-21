export default function DashboardLoading() {
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 bg-white/5 rounded-lg animate-pulse mb-2" />
        <div className="h-4 w-72 bg-white/5 rounded-lg animate-pulse mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card-bg border border-card-border">
              <div className="h-3 w-16 bg-white/5 rounded animate-pulse mb-3" />
              <div className="h-7 w-12 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-5 rounded-2xl bg-card-bg border border-card-border h-48 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
