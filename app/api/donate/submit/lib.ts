import { drive_v3, google } from "googleapis";
import { nanoid } from "nanoid";
import { Readable } from "node:stream";
import { DeepRequired } from "react-hook-form";

import { FormSchema } from "@/app/donate/schema";
import { env } from "@/app/env";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY,
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export const uploadToDrive = async ({ slip }: FormSchema) => {
  const drive = google.drive({ version: "v3", auth });
  const nodeStream = Readable.fromWeb(slip.stream() as never);
  return drive.files
    .create({
      requestBody: {
        name: File.name,
        parents: [env.GOOGLE_DONATE_SLIP_FOLDER_ID],
      },
      fields: "id,webViewLink",
      media: {
        mimeType: slip.type,
        body: nodeStream,
      },
    })
    .then(
      ({ data: { id, webViewLink } }) =>
        ({ id, webViewLink }) as DeepRequired<
          Pick<drive_v3.Schema$File, "id" | "webViewLink">
        >
    );
};

export const insertToSheet = async ({
  name,
  allowCredit,
  amount,
  email,
  slipUrl,
}: Omit<FormSchema, "slip"> & {
  slipUrl: string;
}) => {
  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = env.GOOGLE_DONATE_SUBMIT_SHEET_ID;
  return sheets.spreadsheets.values.append({
    spreadsheetId,
    valueInputOption: "USER_ENTERED",
    range: env.GOOGLE_DONATE_SUBMIT_SHEET_RANGE,
    requestBody: {
      values: [[nanoid(), name, allowCredit, amount, email, slipUrl]],
    },
  });
};
