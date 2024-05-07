import { NextRequest, NextResponse } from "next/server";

import { formDataSchema } from "../../../donate/schema";
import { insertToSheet, uploadToDrive } from "./lib";

export const POST = async (request: NextRequest) => {
  try {
    const data = formDataSchema.parse(await request.formData());
    try {
      const { webViewLink } = await uploadToDrive(data);
      await insertToSheet({
        ...data,
        slipUrl: webViewLink,
      });
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
