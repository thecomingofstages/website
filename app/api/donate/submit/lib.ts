import dayjs from "dayjs";
import { drive_v3, sheets_v4 } from "googleapis";
import ky from "ky";
import { nanoid } from "nanoid";
import { DeepRequired } from "react-hook-form";

import { FormSchema } from "@/app/donate/schema";
import { env } from "@/app/env";
import GoogleAuth from "@/lib/google-auth";

export const auth = new GoogleAuth(
  {
    client_email: env.GOOGLE_CLIENT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY,
  },
  [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ]
);

export const uploadToDrive = async (
  { slip, name }: FormSchema,
  token: string
) => {
  const metadata: drive_v3.Schema$File = {
    name: `${name} - ${slip.name}`,
    parents: [env.GOOGLE_DONATE_SLIP_FOLDER_ID],
  };

  // Multipart upload (which is default in the official Node.js client library)
  // heavily used Node.js stream and is too complex to implement on other platforms.
  // Use resumable upload instead.
  // See: https://developers.google.com/drive/api/guides/manage-uploads#resumable

  const contentLength = slip.size.toString();

  const uploadEndpoint = await ky
    .post("https://www.googleapis.com/upload/drive/v3/files", {
      searchParams: {
        uploadType: "resumable",
        fields: "id,webViewLink",
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Upload-Content-Type": slip.type,
        "X-Upload-Content-Length": contentLength,
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(metadata),
      fetch: fetch,
    })
    .then((res) => res.headers.get("location"));

  if (!uploadEndpoint) {
    throw new Error("Failed to get upload endpoint");
  }

  return ky
    .put(uploadEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Length": contentLength,
      },
      body: slip.stream(),
      fetch: fetch,
    })
    .json<DeepRequired<Pick<drive_v3.Schema$File, "id" | "webViewLink">>>();
};

export const insertToSheet = async (
  {
    name,
    allowCredit,
    amount,
    email,
    accountName,
    dateTransfer,
    timeTransfer,
    slipUrl,
  }: Omit<FormSchema, "slip"> & {
    slipUrl: string;
  },
  token: string
) => {
  const params = {
    spreadsheetId: env.GOOGLE_DONATE_SUBMIT_SHEET_ID,
    valueInputOption: "USER_ENTERED",
    range: env.GOOGLE_DONATE_SUBMIT_SHEET_RANGE,
    requestBody: {
      // todo: make sure timezone works!
      values: [
        [
          nanoid(),
          `${dayjs(dateTransfer).format("DD/MM/YYYY")} ${timeTransfer}`,
          name,
          accountName,
          allowCredit,
          amount,
          email,
          slipUrl,
        ],
      ],
    },
  } satisfies sheets_v4.Params$Resource$Spreadsheets$Values$Append;
  return ky.post(`${params.spreadsheetId}/values/${params.range}:append`, {
    prefixUrl: `https://sheets.googleapis.com/v4/spreadsheets/`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(params.requestBody),
    searchParams: {
      valueInputOption: params.valueInputOption,
    },
  });
};
