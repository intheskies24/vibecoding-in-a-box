import { useState } from "react";
import { Sidebar, type Page } from "@/components/Sidebar";
import { WelcomePage } from "@/pages/WelcomePage";
import { GettingStartedPage } from "@/pages/GettingStartedPage";
import { ComponentsPage } from "@/pages/ComponentsPage";

export default function App() {
  const [page, setPage] = useState<Page>("welcome");

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar currentPage={page} onNavigate={setPage} />
      <main className="flex-1 overflow-y-auto">
        {page === "welcome" && <WelcomePage />}
        {page === "getting-started" && <GettingStartedPage />}
        {page === "components" && <ComponentsPage />}
      </main>
    </div>
  );
}
