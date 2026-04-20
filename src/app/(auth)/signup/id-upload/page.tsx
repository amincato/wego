"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Camera } from "lucide-react";
import { WizardShell } from "@/components/auth/wizard-shell";
import { UploadBox } from "@/components/auth/upload-box";
import { useSignupStore } from "@/lib/store/signup";

export default function IdUploadStep() {
  const router = useRouter();
  const { account, setAccount } = useSignupStore();
  const [filename, setFilename] = useState<string | null>(
    account.idDocumentFilename ?? null,
  );

  return (
    <WizardShell
      backHref="/signup/name"
      progress={0.45}
      title="Upload your ID"
      primaryDisabled={!filename}
      primaryOnClick={() => {
        setAccount({ idDocumentFilename: filename ?? undefined });
        router.push("/signup/password");
      }}
    >
      <div className="flex flex-col gap-4">
        <UploadBox
          accept="JPG, PNG, PDF"
          defaultFileName={filename ?? undefined}
          onUploaded={(fn) => setFilename(fn)}
          onCleared={() => setFilename(null)}
        />
        <button
          type="button"
          onClick={() => setFilename("ID_scanned_from_camera.jpg")}
          className="flex flex-col items-center justify-center gap-3 rounded-[16px] border-2 border-dashed border-student bg-student/10 py-10 hover:bg-student/15"
        >
          <div className="flex size-12 items-center justify-center rounded-full bg-student text-white">
            <Camera size={22} />
          </div>
          <span className="text-[14px] font-semibold text-fg">
            Scan with camera
          </span>
        </button>
      </div>
    </WizardShell>
  );
}
