import { addEvolution } from "@/firebase/database/evolution";

export async function POST(req: Request, route: { params: { id: string } }) {
  const { id } = route.params;
  if (typeof id !== "string") {
    return new Response(JSON.stringify({ message: "Invalid User ID" }), {
      status: 400,
    });
  }
  const data = await req.json();
  try {
    await addEvolution(data, id);
    return new Response(
      JSON.stringify({ message: "Evolução criada com sucesso!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erro ao criar evolução" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
