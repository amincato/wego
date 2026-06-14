import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
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
  status: PayStatus;
}

const payments: PayRow[] = [
  {
    id: "pay_lily",
    firstName: "Lily Louise",
    lastName: "Jacob",
    nationality: "fr",
    city: "Lyon",
    months: 3,
    photoUrl: "/students/confirmed/p8.png",
    status: "paid",
  },
  {
    id: "pay_pablo",
    firstName: "Pablo",
    lastName: "García",
    nationality: "es",
    city: "Madrid",
    months: 3,
    photoUrl: "/students/confirmed/p2.png",
    status: "pending",
  },
  {
    id: "pay_marco",
    firstName: "Marco",
    lastName: "Conti",
    nationality: "it",
    city: "Florence",
    months: 6,
    photoUrl: "/students/confirmed/p5.png",
    status: "pending",
  },
  {
    id: "pay_camille",
    firstName: "Camille",
    lastName: "Dubois",
    nationality: "fr",
    city: "Lille",
    months: 3,
    photoUrl: "/students/confirmed/p10.png",
    status: "paid",
  },
  {
    id: "pay_giulia",
    firstName: "Giulia",
    lastName: "Bianchi",
    nationality: "it",
    city: "Milan",
    months: 3,
    photoUrl: "/students/confirmed/p9.png",
    status: "paid",
  },
  {
    id: "pay_lucas",
    firstName: "Lucas",
    lastName: "Martin",
    nationality: "fr",
    city: "Marseille",
    months: 6,
    photoUrl: "/students/confirmed/p3.png",
    status: "pending",
  },
];

const STATUS_PILL: Record<
  PayStatus,
  { label: string; tone: string; icon: React.ReactNode }
> = {
  paid: {
    label: "Paid",
    tone: "bg-success-bg/50 text-success-fg",
    icon: <CheckCircle2 className="size-3.5" strokeWidth={2.4} />,
  },
  pending: {
    label: "Pending payment",
    tone: "bg-family/15 text-family",
    icon: <Clock className="size-3.5" strokeWidth={2.4} />,
  },
};

export default function FeePaymentsPage() {
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

      <ul className="mt-6 flex flex-col gap-2">
        {payments.map((p) => (
          <li key={p.id}>
            <Link
              href={`/incoming/applicants/${p.id}`}
              className="group flex items-center gap-4 rounded-input border border-divider border-l-4 border-l-student bg-surface px-4 py-5 transition-colors hover:border-fg/20 hover:border-l-student hover:bg-chip/40"
            >
              <span
                className="size-12 shrink-0 rounded-full bg-chip bg-cover bg-center"
                style={{ backgroundImage: `url(${p.photoUrl})` }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-base font-bold text-fg">
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
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                    STATUS_PILL[p.status].tone,
                  )}
                >
                  {STATUS_PILL[p.status].icon}
                  {STATUS_PILL[p.status].label}
                </span>
                <ChevronRight className="size-4 text-fg-subtle group-hover:text-fg" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
