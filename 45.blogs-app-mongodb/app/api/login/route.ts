import { ZodError } from "zod";
import { NextRequest } from "next/server";

import { Res } from "@/server/response";
import { loginBodyValidation } from "@/libs/validations/admin";
import { authenticationJwt } from "@/libs/helpers/authentication-jwt";

export async function POST(request: NextRequest) {
  const body: IAdmin = await request.json();
  const expectedValues = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  };
  try {
    loginBodyValidation.parse(body);
    const isAdmin =
      body.username === expectedValues.username &&
      body.password === expectedValues.password;
    if (!isAdmin) {
      return Res({ error: "Admin not found" }, 404);
    }
    return Res({ token: authenticationJwt.createSession() }, 200);
    // return Res({ token: authentication.createSession() }, 200);
  } catch (error) {
    if (error instanceof ZodError) {
      return Res({ error: error.issues }, 400);
    }
    return Res({ error: "Something went wrong" }, 500);
  }
}
