import { getUserList } from "@/firebase/database/users";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lastVisibleParam = searchParams.get("lastVisible");
  const pageSizeParam = searchParams.get("pageSize");

  const lastVisible: QueryDocumentSnapshot<DocumentData> | null =
    lastVisibleParam ? JSON.parse(lastVisibleParam) : null;
  const pageSize = pageSizeParam ? parseInt(pageSizeParam) : 25;

  try {
    const users = await getUserList(lastVisible, pageSize);

    return new Response(JSON.stringify({ data: users }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erro em retornar lista:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
