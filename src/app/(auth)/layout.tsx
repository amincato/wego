import { ReactNode } from "react";

/** Auth routes do not use the app's bottom navigation. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
