import {
  getPatientData,
  updatePatientClinic,
} from "@/firebase/database/patients";

export async function PUT(req: Request, route: { params: { id: string } }) {
  const { id } = route.params;
  const data = await req.json();

  if (typeof id !== "string") {
    return new Response(JSON.stringify({ message: "Invalid Patient ID" }), {
      status: 400,
    });
  }

  try {
    await updatePatientClinic(id, data.clinic);

    return new Response(
      JSON.stringify({ message: "Clínica atualizada com sucesso!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 400,
    });
  }
}
