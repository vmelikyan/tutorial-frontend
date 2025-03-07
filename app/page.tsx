import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container h-full mx-auto max-w-4xl px-4 pt-16 grid grid-cols-2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl">Tasks Page</CardTitle>
          <CardDescription>
            <ul className="list-disc pl-5 text-base">
              <li>Check out the data in the Tasks page.</li>
              <li>This is being fetched from the backend service. </li>
              <li>
                When optional in the environment, the data is pulled from the
                static environment as a fallback default.
              </li>
              <li>
                When the backend service is selected, we get a separate deploy.
              </li>
            </ul>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/tasks" className="text-lg">
              View Tasks
            </Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl">Variables Page</CardTitle>
          <CardDescription>
            <ul className="list-disc pl-5 text-base">
              <li>
                This page will display all environment variables from the
                container.
              </li>
              <li>
                We will use this to view the baskend API@apos;s URL as we
                configure the lifecycle environment.
              </li>
              <li>
                Notice the `API_URL` value change after you select the backend
                service in your environment.
              </li>
            </ul>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/variables" className="text-lg">
              View Environment Variables
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
