import { Link } from "react-router-dom";
import Button from "./Button";

export default function EmptyState({
  title, description, ctaLabel = "В каталог", ctaTo = "/",
}: { title: string; description?: string; ctaLabel?: string; ctaTo?: string }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center animate-slide">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">🛍️</div>
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      <Link to={ctaTo} className="mt-6 inline-block"><Button>{ctaLabel}</Button></Link>
    </div>
  );
}