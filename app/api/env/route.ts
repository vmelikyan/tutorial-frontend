import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Filter out sensitive environment variables if needed
    const envVars = { ...process.env };

    // Convert to array of key-value pairs and sort alphabetically
    const sortedEnvVars = Object.entries(envVars)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .reduce(
        (acc, [key, value]) => {
          // Mask sensitive values that might contain tokens or keys
          const isSensitive = /key|token|password|secret/i.test(key);
          acc[key] = isSensitive ? "********" : value;
          return acc;
        },
        {} as Record<string, string | undefined>,
      );

    return NextResponse.json(sortedEnvVars);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch environment variables" },
      { status: 500 },
    );
  }
}
