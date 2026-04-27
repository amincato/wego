import Link from "next/link";
import { LifeBuoy, Mail, Phone, Settings } from "lucide-react";
import { PageHeader } from "@/components/dashboard/dashboard-shell";
import { InfoCard, InfoGrid } from "@/components/dashboard/info-card";
import { currentCoordinator } from "@/lib/mock/coordinator";
import { mySchool } from "@/lib/mock/my-school";

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="My profile"
        subtitle="Mobility coordinator account."
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/profile/settings"
              className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-sm font-bold text-fg ring-1 ring-divider hover:bg-chip"
            >
              <Settings className="size-4" />
              Settings
            </Link>
            <Link
              href="/profile/support"
              className="inline-flex items-center gap-2 rounded-full bg-school px-4 py-2 text-sm font-bold text-white hover:bg-school-accent"
            >
              <LifeBuoy className="size-4" />
              Support
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <InfoCard className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-5">
            <span
              className="size-24 shrink-0 rounded-full bg-chip bg-cover bg-center ring-2 ring-divider"
              style={{ backgroundImage: `url(${currentCoordinator.avatarUrl})` }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="h-title text-fg">
                  {currentCoordinator.firstName} {currentCoordinator.lastName}
                </h2>
                <span className="rounded-full bg-school/15 px-2.5 py-0.5 text-[11px] font-bold text-school capitalize">
                  {currentCoordinator.role.replace(/_/g, " ")}
                </span>
              </div>
              <div className="mt-1 text-sm text-fg-muted">{mySchool.name}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
                  <Mail className="size-3.5" /> {currentCoordinator.email}
                </button>
                <button className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-xs font-bold text-fg ring-1 ring-divider hover:bg-chip">
                  <Phone className="size-3.5" /> {currentCoordinator.phone}
                </button>
              </div>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Workspace">
          <InfoGrid
            columns={2}
            items={[
              { label: "School", value: mySchool.shortName },
              { label: "City", value: `${mySchool.city}, ${mySchool.country}` },
              { label: "Role", value: currentCoordinator.role.replace(/_/g, " ") },
              { label: "Coordinator since", value: "Sept. 2022" },
            ]}
          />
        </InfoCard>

        <InfoCard title="Quick actions" className="lg:col-span-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <ActionLink
              href="/profile/settings"
              title="Account settings"
              description="Manage your password, notifications and preferences."
            />
            <ActionLink
              href="/profile/support"
              title="Get support"
              description="Contact wego support or browse the knowledge base."
            />
            <ActionLink
              href="/welcome"
              title="Sign out"
              description="End your dashboard session."
              danger
            />
          </div>
        </InfoCard>
      </div>
    </>
  );
}

function ActionLink({
  href,
  title,
  description,
  danger,
}: {
  href: string;
  title: string;
  description: string;
  danger?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-input bg-bg p-4 ring-1 transition-colors ${
        danger
          ? "ring-danger-bg/60 hover:bg-danger-bg/30"
          : "ring-divider hover:bg-chip"
      }`}
    >
      <div
        className={`text-sm font-bold ${
          danger ? "text-danger-fg" : "text-fg"
        }`}
      >
        {title}
      </div>
      <p className="mt-1 text-xs text-fg-muted">{description}</p>
    </Link>
  );
}
