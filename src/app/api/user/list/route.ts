import { PAGE_SIZE } from "@/constants/pagination";
import { getUserList } from "@/firebase/database/users";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lastVisibleParam = searchParams.get("lastVisible");
  const pageSizeParam = searchParams.get("pageSize");

  const lastVisible: QueryDocumentSnapshot<DocumentData> | null =
    !!lastVisibleParam
      ? (JSON.parse(lastVisibleParam) as QueryDocumentSnapshot<DocumentData>)
      : null;
  const pageSize = pageSizeParam ? parseInt(pageSizeParam) : PAGE_SIZE;

  try {
    const { users, lastVisibleDoc } = await getUserList(pageSize, lastVisible);

    return new Response(JSON.stringify({ data: users, lastVisibleDoc }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro em retornar lista:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
