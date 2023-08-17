import Header from "@/components/Header";
import Providers from "@/providers/Providers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // This is a hack to force Next.js to re-render this page on every request.

const WorkspaceLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // All pages under "workspace" are protected
  if (!user) redirect("/login");

  return (
    <>
      <Providers>
        <div
          className="
            theme-background
            w-screen h-screen 
            overflow-x-hidden 
            overflow-y-auto
            relative
            flex flex-col
          "
        >
          <Header />
          {children}
        </div>
      </Providers>
    </>
  );
};

export default WorkspaceLayout;
