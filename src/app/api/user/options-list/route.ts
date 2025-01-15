import { getUserOptionList } from "@/firebase/database/users";

export async function GET(req: Request) {
  try {
    const data = await getUserOptionList();
    let options: OptionProp[] = [];

    if (!!data?.users?.length) {
      options = data?.users?.map(
        (user) =>
          ({
            id: user.uid,
            label: user.name,
          } as OptionProp)
      );
    }

    return new Response(JSON.stringify({ data: options }), {
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
