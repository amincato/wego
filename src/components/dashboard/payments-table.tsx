import { cn } from "@/lib/utils";
import type { PaymentInstallment, PaymentStatus } from "@/lib/types-dashboard";

const STATUS_TONE: Record<PaymentStatus, string> = {
  paid: "bg-success-bg/40 text-success-fg",
  pending: "bg-chip text-fg",
  scheduled: "bg-student/15 text-student",
  overdue: "bg-danger-bg/60 text-danger-fg",
};

const STATUS_LABEL: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  scheduled: "Scheduled",
  overdue: "Overdue",
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function PaymentsTable({
  payments,
}: {
  payments: PaymentInstallment[];
}) {
  if (payments.length === 0) {
    return (
      <p className="text-sm text-fg-muted">No payments recorded yet.</p>
    );
  }

  const total = payments.reduce((s, p) => s + p.amountEur, 0);
  const paid = payments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + p.amountEur, 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-input bg-bg p-3 ring-1 ring-divider">
          <div className="text-xs uppercase tracking-wider text-fg-subtle">
            Total
          </div>
          <div className="mt-1 text-xl font-bold text-fg">€ {total.toLocaleString()}</div>
        </div>
        <div className="rounded-input bg-bg p-3 ring-1 ring-divider">
          <div className="text-xs uppercase tracking-wider text-fg-subtle">
            Paid
          </div>
          <div className="mt-1 text-xl font-bold text-success-fg">
            € {paid.toLocaleString()}
          </div>
        </div>
        <div className="rounded-input bg-bg p-3 ring-1 ring-divider">
          <div className="text-xs uppercase tracking-wider text-fg-subtle">
            Outstanding
          </div>
          <div className="mt-1 text-xl font-bold text-fg">
            € {(total - paid).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-input ring-1 ring-divider">
        <table className="w-full text-sm">
          <thead className="bg-chip/60 text-left text-xs uppercase tracking-wider text-fg-subtle">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Description</th>
              <th className="px-4 py-2.5 font-semibold">Due</th>
              <th className="px-4 py-2.5 font-semibold">Paid</th>
              <th className="px-4 py-2.5 text-right font-semibold">Amount</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t border-divider/60">
                <td className="px-4 py-3 font-semibold text-fg">{p.description}</td>
                <td className="px-4 py-3 text-fg-muted">{fmt(p.dueDate)}</td>
                <td className="px-4 py-3 text-fg-muted">
                  {p.paidDate ? fmt(p.paidDate) : "—"}
                </td>
                <td className="px-4 py-3 text-right font-bold text-fg">
                  € {p.amountEur.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold",
                      STATUS_TONE[p.status],
                    )}
                  >
                    {STATUS_LABEL[p.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
