import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <SignUp 
          appearance={{
            elements: {
              card: "bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl",
              headerTitle: "text-white text-2xl font-black tracking-tight",
              headerSubtitle: "text-white/60",
              formFieldLabel: "text-white/80",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white font-bold",
              footerActionLink: "text-purple-400 hover:text-purple-300",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-white",
              formFieldInput: "bg-white/5 border-white/10 text-white",
              dividerLine: "bg-white/10",
              dividerText: "text-white/40"
            }
          }}
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
