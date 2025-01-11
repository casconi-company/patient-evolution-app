import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { serverConfig } from "../../config";
import { firebaseConfig } from "@/firebase/config";

export default async function Home() {
  const tokens = await getTokens(cookies(), {
    apiKey: firebaseConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    notFound();
  }

  redirect("/my-patients");
}
