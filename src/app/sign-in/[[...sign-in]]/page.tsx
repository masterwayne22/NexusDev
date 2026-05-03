import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <SignIn 
          appearance={{
            elements: {
              card: "bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl",
              headerTitle: "text-white text-2xl font-black tracking-tight",
              headerSubtitle: "text-white/60",
              formFieldLabel: "text-white/80",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-bold",
              footerActionLink: "text-blue-400 hover:text-blue-300",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-white",
              formFieldInput: "bg-white/5 border-white/10 text-white",
              dividerLine: "bg-white/10",
              dividerText: "text-white/40"
            }
          }}
          signUpUrl="/sign-up"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
