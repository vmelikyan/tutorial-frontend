"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface EnvVariables {
  [key: string]: string | undefined;
}

export function EnvVariables() {
  const [envVars, setEnvVars] = useState<EnvVariables>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("API_URL");

  useEffect(() => {
    const fetchEnvVars = async () => {
      try {
        const response = await fetch("/api/env");
        if (!response.ok)
          throw new Error("Failed to fetch environment variables");
        const data = await response.json();
        setEnvVars(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEnvVars();
  }, []);

  const filteredEnvVars = Object.entries(envVars).filter(
    ([key, value]) =>
      key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (value && value.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-destructive">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search environment variables..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Badge variant="secondary">
          {filteredEnvVars.length} variable
          {filteredEnvVars.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Variable Name</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnvVars.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="font-mono">{key}</TableCell>
                <TableCell className="font-mono">
                  {value || (
                    <span className="text-muted-foreground italic">
                      undefined
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
