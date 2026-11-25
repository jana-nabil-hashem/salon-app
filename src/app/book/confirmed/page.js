import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

export const dynamic = "force-dynamic";

const TZ = "Asia/Beirut";

export default async function ConfirmedPage({ searchParams }) {
  const { service, staff, time } = await searchParams;

  const [serviceRes, staffRes] = await Promise.all([
    supabase
      .from("services")
      .select("name, duration_minutes, price")
      .eq("id", service)
      .maybeSingle(),
    supabase.from("staff").select("name").eq("id", staff).maybeSingle(),
  ]);

  const s = serviceRes.data;
  const m = staffRes.data;
  const when = time ? new Date(time) : null;

  return (
    <main className="mx-auto max-w-md px-6 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush font-display text-3xl text-rose-dark">
        ✓
      </div>
      <h1 className="font-display mt-6 text-4xl text-rose-dark">
        Booking confirmed
      </h1>

      {s && m && when ? (
        <div className="mt-8 rounded-2xl bg-sand p-6 text-left">
          <p className="font-semibold">{s.name}</p>
          <p className="text-sm text-ink/60">
            {s.duration_minutes} min | ${s.price}
          </p>
          <p className="mt-4">With {m.name}</p>
          <p>
            {when.toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              timeZone: TZ,
            })}
            {" at "}
            {when.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: TZ,
            })}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-ink/60">Your booking was saved.</p>
      )}

      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-rose px-8 py-3 text-white hover:bg-rose-dark"
      >
        Back to home
      </Link>
    </main>
  );
}