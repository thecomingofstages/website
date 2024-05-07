import { NextRequest, NextResponse } from "next/server";

import { formDataSchema } from "../../../donate/schema";
import { auth, insertToSheet, uploadToDrive } from "./lib";

export const runtime = "edge";

export const POST = async (request: NextRequest) => {
  try {
    const data = formDataSchema.parse(await request.formData());
    try {
      const token = await auth.getGoogleAuthToken();
      if (!token) {
        return NextResponse.json(
          { success: false, error: "No Server Token" },
          {
            status: 500,
          }
        );
      }
      const { webViewLink } = await uploadToDrive(data, token);
      await insertToSheet(
        {
          ...data,
          slipUrl: webViewLink,
        },
        token
      );
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { success: false, error: err },
        {
          status: 400,
        }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err },
      {
        status: 400,
      }
    );
  }
};
