import { updatePatientDiagnostic } from "@/firebase/database/patients";

export async function PUT(req: Request, route: { params: { id: string } }) {
  const { id } = route.params;
  const data = await req.json();

  if (typeof id !== "string") {
    return new Response(JSON.stringify({ message: "Invalid Patient ID" }), {
      status: 400,
    });
  }

  try {
    await updatePatientDiagnostic(id, data.diagnostic);

    return new Response(
      JSON.stringify({ message: "Diagnóstico atualizada(o) com sucesso!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 400,
    });
  }
}
