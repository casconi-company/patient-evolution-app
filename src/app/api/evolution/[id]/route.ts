import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { addEvolution } from "@/firebase/database/evolution";
import { uploadFile } from "@/storage/gcs";

const UPLOAD_DIR = "/tmp";

export async function POST(req: Request, route: { params: { id: string } }) {
  const { id } = route.params;

  if (typeof id !== "string") {
    return new Response(JSON.stringify({ message: "Invalid User ID" }), {
      status: 400,
    });
  }

  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;
    const mimeType = (body.file as File).name.split(".")[1];

    const fileId = uuidv4();
    const fileName = `${fileId}.${mimeType}`;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.resolve(UPLOAD_DIR, fileName);

      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }

      fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName), buffer);

      await uploadFile(filePath, fileName);
    }

    const data = {
      therapistId: body.therapistId,
      clinic: body.clinic,
      evolution: body.evolution,
      date: body.date,
      time: body.time,
      fileId: fileName,
    } as any;

    await addEvolution(data, id);

    return new Response(
      JSON.stringify({ message: "Evolução criada com sucesso!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao criar evolução" + error }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
