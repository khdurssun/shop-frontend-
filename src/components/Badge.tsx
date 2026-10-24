const colors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  shipped: "bg-sky-100 text-sky-800",
  cancelled: "bg-rose-100 text-rose-800",
  new: "bg-brand-100 text-brand-800",
};

export default function Badge({ kind, children }: { kind: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${colors[kind] ?? "bg-slate-100 text-slate-700"}`}>
      {children}
    </span>
  );
}