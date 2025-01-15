import { getPatientData, updatePatient } from "@/firebase/database/patients";

export async function GET(req: Request, route: { params: { id: string } }) {
  const { id } = route.params;
  if (typeof id !== "string") {
    return new Response(JSON.stringify({ message: "Invalid Patient ID" }), {
      status: 400,
    });
  }

  try {
    const patientData = await getPatientData(id);
    if (!patientData) {
      return new Response(JSON.stringify({ message: "Patient not found" }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ data: patientData }), { status: 200 });
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 400,
    });
  }
}

export async function PUT(req: Request, route: { params: { id: string } }) {
  const { id } = route.params;
  const data = await req.json();

  if (typeof id !== "string") {
    return new Response(JSON.stringify({ message: "Invalid Patient ID" }), {
      status: 400,
    });
  }

  try {
    await updatePatient(id, data);

    return new Response(
      JSON.stringify({ message: "Paciente atualizada(o) com sucesso!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 400,
    });
  }
}
