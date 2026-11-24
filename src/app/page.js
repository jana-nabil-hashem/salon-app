import { supabase } from "@/app/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: services, error } = await supabase
    .from("services")
    .select("id, name, duration_minutes, price")
    .order("id");

  if (error) {
    return <main className="p-10">Error: {error.message}</main>;
  }

  return (
    <main className="mx-auto max-w-2xl p-10">
      <h1 className="text-4xl font-bold">Our services</h1>
      <ul className="mt-6 space-y-3">
        {services.map((s) => (
          <li key={s.id} className="flex justify-between rounded border p-4">
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-gray-500">{s.duration_minutes} min</p>
            </div>
            <p className="font-bold">${s.price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}