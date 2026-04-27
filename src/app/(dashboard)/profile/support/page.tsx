import Link from "next/link";
import {
  BookOpen,
  ChevronLeft,
  HeadphonesIcon,
  LifeBuoy,
  Mail,
  MessageCircle,
  Phone,
  Triangle,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { InfoCard } from "@/components/dashboard/info-card";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I review a new application?",
    a: "Go to Incoming students → New applicants and open any item. The review actions are at the bottom of the Application status tab.",
  },
  {
    q: "Where can I edit hosting capacity?",
    a: "My school → Hosting capacity management. You can adjust totals per program duration.",
  },
  {
    q: "How do emergencies work?",
    a: "Notifications appear in the Home page and at the top right. Open the Emergency workflows page to track mediation steps.",
  },
  {
    q: "Can I message a partner school directly?",
    a: "Yes — open Partner schools, select a school and use the Mobility coordinator tab to message their coordinator.",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader
        title="Support"
        subtitle="Reach the wego team or browse the knowledge base."
        action={
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-2 text-sm font-bold text-fg ring-1 ring-divider hover:bg-chip"
          >
            <ChevronLeft className="size-4" />
            Profile
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <InfoCard title="Quick contact" className="xl:col-span-1">
          <div className="space-y-3">
            <ContactRow
              icon={<MessageCircle className="size-4" />}
              label="Live chat"
              description="Available Mon–Fri, 9 AM – 6 PM CET"
              cta="Start chat"
            />
            <ContactRow
              icon={<Mail className="size-4" />}
              label="Email"
              description="support@wego.app · 24h response time"
              cta="Send email"
            />
            <ContactRow
              icon={<Phone className="size-4" />}
              label="Phone"
              description="+39 02 555 0100 · For emergencies only"
              cta="Call"
            />
          </div>
        </InfoCard>

        <InfoCard title="Knowledge base" className="xl:col-span-2">
          <div className="grid gap-3 sm:grid-cols-3">
            <KbCard
              title="Coordinator handbook"
              description="The full guide to running mobility programmes on wego."
              icon={<BookOpen className="size-4" />}
            />
            <KbCard
              title="Best practices"
              description="Templates, checklists and stories from other schools."
              icon={<LifeBuoy className="size-4" />}
            />
            <KbCard
              title="Emergency playbook"
              description="What to do in case of incidents abroad or in your school."
              icon={<Triangle className="size-4" />}
            />
          </div>

          <h4 className="mt-6 mb-3 text-xs font-bold uppercase tracking-wider text-fg-subtle">
            Frequently asked
          </h4>
          <ul className="space-y-2">
            {FAQS.map((f) => (
              <li
                key={f.q}
                className="rounded-input bg-bg p-4 ring-1 ring-divider"
              >
                <div className="text-sm font-bold text-fg">{f.q}</div>
                <p className="mt-1 text-sm text-fg-muted">{f.a}</p>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard
          title="Open a request"
          className="xl:col-span-3"
          action={
            <span className="inline-flex items-center gap-1 text-xs text-fg-muted">
              <HeadphonesIcon className="size-3.5" />
              Average reply time · 4h
            </span>
          }
        >
          <form className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-xs text-fg-muted">
              Subject
              <input
                type="text"
                placeholder="A short summary of your issue"
                className="h-10 rounded-input bg-bg px-3 text-sm text-fg outline-none ring-1 ring-divider focus:ring-2 focus:ring-school"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs text-fg-muted">
              Category
              <select className="h-10 rounded-input bg-bg px-3 text-sm text-fg outline-none ring-1 ring-divider focus:ring-2 focus:ring-school">
                <option>Technical</option>
                <option>Account</option>
                <option>Billing</option>
                <option>Feature request</option>
                <option>Other</option>
              </select>
            </label>
            <label className="sm:col-span-2 flex flex-col gap-1 text-xs text-fg-muted">
              Message
              <textarea
                rows={5}
                placeholder="Describe what's happening and what you expected to happen…"
                className="rounded-input bg-bg px-3 py-2 text-sm text-fg outline-none ring-1 ring-divider focus:ring-2 focus:ring-school"
              />
            </label>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="button"
                className="rounded-full bg-school px-5 py-2 text-sm font-bold text-white hover:bg-school-accent"
              >
                Send request
              </button>
            </div>
          </form>
        </InfoCard>
      </div>
    </>
  );
}

function ContactRow({
  icon,
  label,
  description,
  cta,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  cta: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-input bg-bg p-4 ring-1 ring-divider">
      <span className="grid size-10 place-items-center rounded-lg bg-school/15 text-school">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-fg">{label}</div>
        <p className="text-xs text-fg-muted">{description}</p>
      </div>
      <button className="rounded-full bg-chip px-3 py-1.5 text-xs font-bold text-fg hover:bg-chip/70">
        {cta}
      </button>
    </div>
  );
}

function KbCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="group flex flex-col items-start gap-2 rounded-input bg-bg p-4 text-left ring-1 ring-divider hover:bg-chip"
    >
      <span className="grid size-9 place-items-center rounded-lg bg-school/15 text-school">
        {icon}
      </span>
      <div className="text-sm font-bold text-fg">{title}</div>
      <p className="text-xs text-fg-muted">{description}</p>
    </button>
  );
}
