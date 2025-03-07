import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 },
      );
    }

    const response = await fetch(`${process.env.API_URL}/task/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || "Failed to complete task" },
        { status: response.status },
      );
    }

    console.log(`Task ${id} completed`);
    return NextResponse.json({});
    // eslint-disable-next-line
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to complete task" },
      { status: 500 },
    );
  }
}
