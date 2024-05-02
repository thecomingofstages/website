import { NextRequest, NextResponse } from "next/server";

import { formDataSchema } from "../schema";

export const POST = async (request: NextRequest): Promise<Response> => {
  try {
    const data = formDataSchema.parse(await request.formData());
    // Do something with the data!
    console.log(data);
    return NextResponse.json({ success: 1 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      {
        status: 400,
      }
    );
  }
};
