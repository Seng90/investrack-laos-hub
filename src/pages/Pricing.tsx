import { motion } from "framer-motion";
import { Check, Sparkles, Lock, Zap, Crown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState } from "react";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "yearly";

const FEATURES = {
  free: [
    "Browse all Lao company profiles",
    "Basic company info (sector, location, size)",
    "Industry & sector navigation",
    "Limited search filters",
  ],
  pro: [
    "Everything in Free",
    "Full funding rounds & investor history",
    "Side-by-side company comparison (up to 4)",
    "CSV data exports",
    "Advanced search & saved filters",
    "Team & leadership details",
    "Email alerts for tracked companies",
    "Priority support",
  ],
};

const GATED_AREAS = [
  { icon: Zap, label: "Funding Rounds", desc: "Round size, valuations, lead investors, dates." },
  { icon: Sparkles, label: "Team & Leadership", desc: "Full leadership details and key personnel per company." },
  { icon: Crown, label: "Compare Tool", desc: "Radar charts and head-to-head metric comparison." },
  { icon: Lock, label: "Data Exports", desc: "Download filtered company lists as CSV." },
];

const FAQ = [
  { q: "Can I cancel anytime?", a: "Yes — your Pro access remains active until the end of your billing period, no questions asked." },
  { q: "Is there a refund policy?", a: "We offer a 7-day money-back guarantee on your first subscription, monthly or yearly." },
  { q: "Do you offer team or enterprise plans?", a: "Yes. For 5+ seats, API access, or custom data feeds, contact us for a tailored quote." },
  { q: "How does the yearly discount work?", a: "Pay annually and save ~17% — equivalent to getting 2 months free compared to monthly billing." },
];

const Pricing = () => {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");

  const proMonthly = 19;
  const proYearly = 190; // 19 * 10 ≈ 17% off
  const yearlyEffective = (proYearly / 12).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(hsl(var(--accent)/0.15)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumbs items={[{ label: "Membership" }]} />
        </div>
        <div className="container mx-auto px-4 py-16 text-center md:py-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Membership
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Unlock the full Lao <span className="text-accent">investment ecosystem</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Go deeper into funding rounds, investor networks, and exclusive insights. Support our independent platform and get the data edge you need.
            </p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center rounded-full border border-border bg-card p-1">
              <button
                onClick={() => setCycle("monthly")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  cycle === "monthly" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setCycle("yearly")}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  cycle === "yearly" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Yearly
                <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Save 17%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Free */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-display text-2xl font-semibold text-foreground">Free</h3>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">Starter</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Explore the basics of the Lao startup scene.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold text-foreground">$0</span>
              <span className="text-sm text-muted-foreground">/forever</span>
            </div>
            <button
              disabled
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg border border-border bg-secondary/50 text-sm font-medium text-muted-foreground"
            >
              Current plan
            </button>
            <ul className="mt-8 space-y-3">
              {FEATURES.free.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative rounded-2xl border-2 border-accent bg-gradient-to-b from-accent/5 to-card p-8 shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.4)]"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                <Crown className="h-3 w-3" />
                Most Popular
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-2xl font-semibold text-foreground">Pro</h3>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">For analysts & investors</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Full access to every data point and insight on the platform.</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold text-foreground">
                ${cycle === "monthly" ? proMonthly : yearlyEffective}
              </span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {cycle === "monthly"
                ? `Billed monthly · $${proMonthly}/mo`
                : `Billed annually · $${proYearly}/year`}
            </p>

            <Link
              to="/sign-up"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Upgrade to Pro
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-2 text-center text-xs text-muted-foreground">7-day money-back guarantee</p>

            <ul className="mt-8 space-y-3">
              {FEATURES.pro.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* What you unlock */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">What Pro unlocks</h2>
            <p className="mt-3 text-muted-foreground">
              Free shows you what exists. Pro shows you why it matters.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GATED_AREAS.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-3xl font-bold text-foreground md:text-4xl">
            Compare plans
          </h2>
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">Feature</th>
                  <th className="px-6 py-4 text-center font-medium text-muted-foreground">Free</th>
                  <th className="px-6 py-4 text-center font-medium text-accent">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Company directory browsing", true, true],
                  ["Basic company profile", true, true],
                  ["Funding rounds & valuations", false, true],
                  ["Investor & cap table details", false, true],
                  
                  ["Compare companies (up to 4)", false, true],
                  ["CSV exports", false, true],
                  ["Email alerts", false, true],
                  ["Priority support", false, true],
                ].map(([label, free, pro], i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 text-foreground">{label as string}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof free === "boolean" ? (
                        free ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : <span className="text-muted-foreground">—</span>
                      ) : <span className="text-foreground">{free}</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof pro === "boolean" ? (
                        pro ? <Check className="mx-auto h-4 w-4 text-accent" /> : <span className="text-muted-foreground">—</span>
                      ) : <span className="font-medium text-accent">{pro}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card p-10 text-center md:p-14">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Ready to go deeper?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Join the analysts, founders, and investors using InvesTrack Pro to navigate the Lao market.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/sign-up"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Start your Pro membership
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/companies"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Keep exploring free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Pricing;
