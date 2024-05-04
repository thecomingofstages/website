import { NextResponse } from "next/server";

import { google } from "googleapis";
import { resolve } from "path";
import { Stream } from "stream";
import { v4 as uuidv4 } from "uuid";

import { env } from "@/app/env";

import { formDataSchema } from "../../../donate/schema";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_Client_email,
    private_key: env.GOOGLE_Private_key,
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});
const InsertToSheet = async (data, cb) => {
  const sheets = google.sheets({ version: "v4", auth });
  try {
    const spreadsheetId = env.GOOGLE_SpreadsheetId;
    const appendData = await sheets.spreadsheets.values.append({
      spreadsheetId,
      valueInputOption: "USER_ENTERED",
      range: env.GOOGLE_Spreadsheet_rangeSheet,
      requestBody: {
        values: [
          [
            uuidv4(),
            data.form.name,
            data.form.allowCredit,
            data.form.amount,
            data.form.email,
            `https://drive.google.com/file/d/${data.drive_response.id}/view`,
          ],
        ],
      },
    });

    cb(appendData);
  } catch (error) {
    cb(error);
    console.log(error);
  }
};
export const POST = async (request) => {
  console.log(env);
  return new Promise(async (resolve, reject) => {
    try {
      const data = formDataSchema.parse(await request.formData());
      const File = data.slip;

      const drive = google.drive({ version: "v3", auth });

      const buffer = Buffer.from(await File.arrayBuffer());

      const bufferStream = new Stream.PassThrough();
      bufferStream.end(buffer);

      try {
        const res = await drive.files.create({
          requestBody: {
            name: File.name,
            parents: [env.GOOGLE_DriveId],
          },
          media: {
            mimeType: File.type,
            body: bufferStream,
          },
        });

        if (res) {
          await InsertToSheet(
            { form: data, drive_response: res.data },
            (cb) => {
              if (cb.status == 200) {
                resolve(NextResponse.json({ status: cb.status }));
              }
              reject(NextResponse.json({ status: cb.status }));
            }
          );
        }
      } catch (err) {
        console.error(err);
        reject(err);
        return NextResponse.json(
          { success: false, error: err },
          {
            status: 400,
          }
        );
      }
    } catch (err) {
      console.error(err);
      reject(err);
      return NextResponse.json(
        { success: false, error: err },
        {
          status: 400,
        }
      );
    }
  });
};
