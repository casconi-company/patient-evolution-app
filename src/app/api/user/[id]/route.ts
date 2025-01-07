import { getUserData } from "@/firebase/database/users";

export async function GET(req: Request, route: { params: { id: string } }) {
  const { id } = route.params;
  if (typeof id !== "string") {
    return new Response(JSON.stringify({ message: "Invalid User ID" }), {
      status: 400,
    });
  }

  try {
    const userData = await getUserData(id);
    if (!userData) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ data: userData }), { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 400,
    });
  }
}
