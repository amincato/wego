import Link from "next/link";
import { WegoLogo } from "@/components/brand/wego-logo";
import { WelcomeCircles } from "@/components/brand/decorative-circles";
import { AirplaneTrail } from "@/components/brand/airplane-trail";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-student">
      {/* Decorative loops top-right (like splash) */}
      <div className="pointer-events-none absolute -right-12 -top-16">
        <WelcomeCircles className="w-[320px] h-[320px]" strokeWidth={5} />
      </div>

      {/* Logo */}
      <div className="relative flex flex-col items-center pt-[36vh]">
        <WegoLogo className="text-7xl text-white" as="h1" />
        <div className="mt-6 w-[240px]">
          <AirplaneTrail className="w-full h-[50px]" color="#FFFFFF" strokeWidth={2.5} />
        </div>
      </div>

      {/* CTAs at bottom */}
      <div className="absolute inset-x-0 bottom-10 px-6 flex flex-col gap-3">
        <Button
          asChild
          variant="whitePill"
          size="lg"
          width="full"
          className="font-bold"
        >
          <Link href="/role-select">Get started</Link>
        </Button>
        <Button
          asChild
          variant="outlineStudent"
          size="lg"
          width="full"
          className="!border-white !text-white hover:!bg-white/10"
        >
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    </div>
  );
}
