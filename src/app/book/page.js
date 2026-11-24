import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

export const dynamic = "force-dynamic";

const SALON_NAME = "Rose & Sand";

export default async function BookPage({ searchParams }) {
  const { service: serviceId } = await searchParams;

  const { data: services, error } = await supabase
    .from("services")
    .select("id, name, duration_minutes, price")
    .order("id");

  if (error) {
    return <main className="p-10">Error: {error.message}</main>;
  }

  const selected = services.find((s) => String(s.id) === serviceId);

  let staff = [];
  if (selected) {
    const { data } = await supabase
      .from("staff_services")
      .select("staff(id, name, role)")
      .eq("service_id", selected.id);
    staff = (data ?? []).map((row) => row.staff).filter(Boolean);
  }

  return (
    <div>
      <header className="px-6 py-5 md:px-12">
        <Link href="/" className="font-display text-2xl text-rose-dark">
          {SALON_NAME}
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-20">
        <h1 className="font-display text-4xl text-rose-dark">
          Book an appointment
        </h1>

        {/* Step 1 */}
        <h2 className="mt-10 text-lg font-semibold">1. Choose a service</h2>
        <div className="mt-4 grid gap-3">
          {services.map((s) => {
            const active = selected && selected.id === s.id;
            return (
              <Link
                key={s.id}
                href={`/book?service=${s.id}`}
                className={`flex items-center justify-between rounded-2xl border-2 p-4 ${
                  active
                    ? "border-rose bg-blush"
                    : "border-transparent bg-sand hover:border-blush"
                }`}
              >
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-ink/60">{s.duration_minutes} min</p>
                </div>
                <p className="font-display text-xl text-rose-dark">${s.price}</p>
              </Link>
            );
          })}
        </div>

        {/* Step 2 */}
        {selected && (
          <div>
            <h2 className="mt-10 text-lg font-semibold">2. Choose a stylist</h2>
            {staff.length === 0 ? (
              <p className="mt-4 text-ink/60">
                No stylist is available for this service yet.
              </p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-4">
                {staff.map((m) => (
                  <Link
                    key={m.id}
                    href={`/book?service=${selected.id}&staff=${m.id}`}
                    className="w-40 rounded-2xl bg-sand p-5 text-center hover:bg-blush"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush font-display text-2xl text-rose-dark">
                      {m.name[0]}
                    </div>
                    <p className="mt-3 font-semibold">{m.name}</p>
                    <p className="text-sm text-ink/60">{m.role}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}