import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const uuid = process.env.UUID || "";
  return (
    <nav className="fixed top-0 left-0 w-full shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">
        <span className="text-white-500 mr-2 text-lg border-2 border-white rounded px-2 py-1">{uuid}</span>
        <Link href="/">Tasks App</Link>
      </h1>
      <div className="flex space-x-4">
        <Button asChild variant="ghost">
          <Link href="/tasks" className="uppercase">
            Tasks
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/variables" className="uppercase">
            Variables
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
