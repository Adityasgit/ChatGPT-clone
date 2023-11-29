import { Sidebar } from "@/components/clients/chat";
import { Main } from "@/components/servers/chat";

export default function Home() {
  return (
    <>
      <div className="flex flex-row text-white justify-center align-middle">
        <Sidebar />
        <Main />
      </div>
    </>
  );
}
