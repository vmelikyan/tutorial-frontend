import { EnvVariables } from "@/components/env-variables";

export default function EnvVarsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Environment Variables</h1>
      <EnvVariables />
    </div>
  );
}
