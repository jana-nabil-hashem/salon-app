import { supabase } from "@/app/lib/supabase";

export const dynamic = "force-dynamic";

const SALON_NAME = "Rose & Sand";

export default async function Home() {
  const [servicesRes, staffRes] = await Promise.all([
    supabase
      .from("services")
      .select("id, name, duration_minutes, price")
      .order("id"),
    supabase
      .from("staff")
      .select("id, name, role")
      .eq("active", true)
      .order("id"),
  ]);

  const error = servicesRes.error || staffRes.error;
  if (error) {
    return <main className="p-10">Error: {error.message}</main>;
  }

  const services = servicesRes.data;
  const team = staffRes.data;

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <span className="font-display text-2xl text-rose-dark">
          {SALON_NAME}
        </span>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#services" className="hover:text-rose">Services</a>
          <a href="#team" className="hover:text-rose">Team</a>
          <a
            href="#"
            className="rounded-full bg-rose px-5 py-2 text-white hover:bg-rose-dark"
          >
            Book now
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blush to-sand px-6 py-24 text-center md:py-32">
        <p className="text-sm uppercase tracking-widest text-rose-dark">
          Hair, nails and beauty
        </p>
        <h1 className="font-display mt-4 text-5xl text-ink md:text-6xl">
          Beauty that feels like you
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg">
          Book your appointment online in under a minute.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-full bg-rose px-8 py-3 text-white hover:bg-rose-dark"
        >
          Book now
        </a>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="font-display text-center text-3xl text-rose-dark">
          Our services
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-2xl bg-sand p-5"
            >
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-ink/60">{s.duration_minutes} min</p>
              </div>
              <p className="font-display text-xl text-rose-dark">${s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-sand px-6 py-20">
        <h2 className="font-display text-center text-3xl text-rose-dark">
          Meet the team
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-10">
          {team.map((m) => (
            <div key={m.id} className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blush font-display text-3xl text-rose-dark">
                {m.name[0]}
              </div>
              <p className="mt-3 font-semibold">{m.name}</p>
              <p className="text-sm text-ink/60">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-center text-sm text-ink/60">
        {SALON_NAME} | Mon-Sat 9:00-17:00
      </footer>
    </div>
  );
}