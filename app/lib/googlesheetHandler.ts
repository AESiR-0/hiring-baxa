import { google } from "googleapis";

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  experience: number;
  jobTitle: string | null;
  aboutExperience: string;
  cv: string;
  playlist: string;
  favComic: string;
};

export default async function postData(values: FormData) {
  const {
    fullName,
    email,
    phoneNumber,
    experience,
    jobTitle,
    playlist,
    cv,
    favComic,
    aboutExperience,
  } = values;

  // Auth setup
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = "1Ie0XlmrEWgx3hOYH3laNC-P0zb_Fk7NVBJ5CnnEX77E";

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1:F1", // Update the sheet name and range if necessary
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            fullName,
            email,
            phoneNumber,
            experience,
            jobTitle,
            aboutExperience,
            cv,
            favComic,
            playlist,
          ],
        ],
      },
    });
    console.log("Data successfully appended:", response.data);
    return "Data successfully added to Google Sheet";
  } catch (error) {
    console.error("Error appending data to Google Sheets:", error);
    throw error;
  }
}
