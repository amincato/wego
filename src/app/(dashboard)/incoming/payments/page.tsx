import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  Clock,
  CreditCard,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { cn } from "@/lib/utils";

const FLAGS: Record<string, string> = {
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  gb: "🇬🇧",
};

type PayStatus = "paid" | "pending";

interface PayRow {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  city: string;
  months: number;
  photoUrl: string;
  amountEur: number;
  dueDate: string;
  status: PayStatus;
  paidDate?: string;
}

const FEE_BY_DURATION: Record<number, number> = {
  3: 2700,
  6: 2400,
  10: 2500,
};

const payments: PayRow[] = [
  {
    id: "pay_lily",
    firstName: "Lily Louise",
    lastName: "Jacob",
    nationality: "fr",
    city: "Lyon",
    months: 3,
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    amountEur: FEE_BY_DURATION[3],
    dueDate: "2026-06-15",
    status: "paid",
    paidDate: "2026-05-28",
  },
  {
    id: "pay_pablo",
    firstName: "Pablo",
    lastName: "García",
    nationality: "es",
    city: "Madrid",
    months: 3,
    photoUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    amountEur: FEE_BY_DURATION[3],
    dueDate: "2026-06-22",
    status: "pending",
  },
  {
    id: "pay_marco",
    firstName: "Marco",
    lastName: "Conti",
    nationality: "it",
    city: "Florence",
    months: 6,
    photoUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80",
    amountEur: FEE_BY_DURATION[6],
    dueDate: "2026-06-12",
    status: "pending",
  },
  {
    id: "pay_camille",
    firstName: "Camille",
    lastName: "Dubois",
    nationality: "fr",
    city: "Lille",
    months: 3,
    photoUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    amountEur: FEE_BY_DURATION[3],
    dueDate: "2026-06-09",
    status: "paid",
    paidDate: "2026-05-30",
  },
  {
    id: "pay_carlo",
    firstName: "Carlo",
    lastName: "Liberti",
    nationality: "it",
    city: "Milan",
    months: 6,
    photoUrl: "/carlo-liberti.png",
    amountEur: FEE_BY_DURATION[6],
    dueDate: "2025-12-15",
    status: "paid",
    paidDate: "2025-11-12",
  },
  {
    id: "pay_alessandro",
    firstName: "Alessandro",
    lastName: "Greco",
    nationality: "it",
    city: "Naples",
    months: 10,
    photoUrl:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&w=600&q=80",
    amountEur: FEE_BY_DURATION[10],
    dueDate: "2025-12-01",
    status: "paid",
    paidDate: "2025-11-08",
  },
  {
    id: "pay_sophie",
    firstName: "Sophie",
    lastName: "Laurent",
    nationality: "fr",
    city: "Nantes",
    months: 6,
    photoUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    amountEur: FEE_BY_DURATION[6],
    dueDate: "2025-12-22",
    status: "paid",
    paidDate: "2025-12-01",
  },
];

const STATUS_PILL: Record<PayStatus, { label: string; tone: string }> = {
  paid: {
    label: "Paid",
    tone: "bg-success-bg/50 text-success-fg",
  },
  pending: {
    label: "Pending payment",
    tone: "bg-family/15 text-family",
  },
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FeePaymentsPage() {
  const totalDue = payments.reduce((s, p) => s + p.amountEur, 0);
  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + p.amountEur, 0);
  const paidCount = payments.filter((p) => p.status === "paid").length;
  const pendingCount = payments.length - paidCount;

  return (
    <>
      <Link
        href="/incoming"
        aria-label="Back to incoming students"
        className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-surface text-fg ring-1 ring-divider hover:bg-chip"
      >
        <ChevronLeft className="size-5" />
      </Link>

      <PageHeader
        title="Fee payment status"
        subtitle="Track which matched students have settled the school fee."
      />

      {/* Summary strip */}
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <SummaryTile
          icon={<CreditCard className="size-4" />}
          tone="student"
          label="Total expected"
          value={`€ ${totalDue.toLocaleString()}`}
          sub={`${payments.length} students`}
        />
        <SummaryTile
          icon={<CheckCircle2 className="size-4" />}
          tone="success"
          label="Paid"
          value={`€ ${totalPaid.toLocaleString()}`}
          sub={`${paidCount} students`}
        />
        <SummaryTile
          icon={<Clock className="size-4" />}
          tone="family"
          label="Pending"
          value={`€ ${(totalDue - totalPaid).toLocaleString()}`}
          sub={`${pendingCount} students`}
        />
      </div>

      <ul className="flex flex-col gap-2">
        {payments.map((p) => (
          <li key={p.id}>
            <div className="flex items-center gap-4 rounded-input border border-divider bg-surface px-4 py-3.5">
              <span
                className="size-12 shrink-0 rounded-full bg-chip bg-cover bg-center"
                style={{ backgroundImage: `url(${p.photoUrl})` }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold text-fg">
                    {p.firstName} {p.lastName}
                  </span>
                  <span className="text-base leading-none">
                    {FLAGS[p.nationality]}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-fg-muted">
                  <span className="truncate">{p.city}</span>
                  <span>·</span>
                  <span>{p.months} months</span>
                  <span>·</span>
                  {p.status === "paid" && p.paidDate ? (
                    <span>Paid on {fmt(p.paidDate)}</span>
                  ) : (
                    <span>Due {fmt(p.dueDate)}</span>
                  )}
                </div>
              </div>
              <div className="hidden shrink-0 text-right md:block">
                <div className="text-sm font-bold text-fg">
                  € {p.amountEur.toLocaleString()}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-fg-subtle">
                  School fee
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-bold",
                  STATUS_PILL[p.status].tone,
                )}
              >
                {STATUS_PILL[p.status].label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function SummaryTile({
  icon,
  tone,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  tone: "student" | "family" | "success";
  label: string;
  value: string;
  sub: string;
}) {
  const TONE: Record<typeof tone, string> = {
    student: "bg-student/15 text-student",
    family: "bg-family/15 text-family",
    success: "bg-success-bg/50 text-success-fg",
  };
  return (
    <div className="rounded-card-lg bg-surface px-5 py-4 ring-1 ring-divider">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid size-9 place-items-center rounded-lg",
            TONE[tone],
          )}
        >
          {icon}
        </span>
        <div>
          <div className="text-xs uppercase tracking-wider text-fg-subtle">
            {label}
          </div>
          <div className="text-lg font-bold leading-none text-fg">{value}</div>
        </div>
        <div className="ml-auto text-xs text-fg-muted">{sub}</div>
      </div>
    </div>
  );
}
