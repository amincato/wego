import Link from "next/link";
import { CheckCircle2, ChevronLeft, Clock } from "lucide-react";
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
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    status: "paid",
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
    status: "paid",
  },
  {
    id: "pay_carlo",
    firstName: "Carlo",
    lastName: "Liberti",
    nationality: "it",
    city: "Milan",
    months: 6,
    photoUrl: "/carlo-liberti.png",
    status: "paid",
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
    status: "paid",
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
    status: "paid",
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
                </div>
              </div>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
                  STATUS_PILL[p.status].tone,
                )}
              >
                {STATUS_PILL[p.status].icon}
                {STATUS_PILL[p.status].label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
