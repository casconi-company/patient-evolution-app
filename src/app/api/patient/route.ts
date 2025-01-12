import { addPatient } from "@/firebase/database/patients";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await addPatient(data);
    return new Response(
      JSON.stringify({ message: "Usuario criado com sucesso!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Erro ao criar usuario" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
