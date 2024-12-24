import { cookies } from "next/headers";
import { serverConfig } from "../../../../config";
import { signIn } from "@/firebase/auth/Authentication";
export async function POST(req: Request) {
  const data = await req.json();

  if (!data.email || !data.password) {
    return new Response(
      JSON.stringify({ message: "Não foi enviado email ou senha" }),
      {
        status: 400,
      }
    );
  }

  const { result, error } = await signIn(data.email, data.password);

  if (!!error) {
    return new Response(
      JSON.stringify({ message: "Erro ao logar com seu usuario!" }),
      {
        status: 400,
      }
    );
  }

  const token = await result?.user.getIdToken();

  if (!!token) {
    const cookieStore = await cookies();
    cookieStore.set(serverConfig.cookieName, token);
    return new Response(
      JSON.stringify({ message: "Authorization header received" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
