"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

interface Task {
  id: number;
  task: string;
  created_at: string;
  deleted: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/tasks`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      // Sort tasks by created_at date in descending order
      const sortedTasks = data.sort(
        (a: Task, b: Task) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/tasks/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to add task";
        throw new Error(errorMessage);
      }

      setNewTask("");
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);

      alert((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks/complete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to complete task";
        throw new Error(errorMessage);
      }

      await fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
      alert((error as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          disabled={submitting}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding
            </>
          ) : (
            "Add Task"
          )}
        </Button>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center space-x-2 p-3 bg-muted rounded-lg"
          >
            <Checkbox
              id={`task-${task.id}`}
              onCheckedChange={() => handleCompleteTask(task.id)}
              disabled={task.deleted} //Added disabled prop to checkbox
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`flex-grow text-sm font-medium leading-none ${task.deleted ? "line-through text-muted-foreground" : ""} peer-disabled:cursor-not-allowed peer-disabled:opacity-70`} //Added conditional class for styling
            >
              {task.task}
            </label>
            <span className="text-xs text-muted-foreground">
              {new Date(task.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
