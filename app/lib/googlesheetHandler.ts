import { google } from "googleapis";
type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  experience: number;
  jobTitle: string | null;
  aboutExperience: string;
};

export default async function postData(values: FormData) {
  const {
    fullName,
    email,
    phoneNumber,
    experience,
    jobTitle,
    aboutExperience,
  } = values;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email:
        "baxa-hiring@named-defender-441210-j7.iam.gserviceaccount.com",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3mVQTAd6g8Uim\nscBIgFNKcOjCYkULITklxZHaPIlQ/1ES78nDUbhMwHrM+1GihORNAoXnJaxq+Vj2\nDBSvxtd2j9RPtxqFIuqWxze2tgdxouXtnYAbqV9KTmM/NxyuDbFh5jxSsxu5fc+2\nIfajHQ+IxCiWsi52zbJW23UnnmBvtBgRnzQQkVujt2B5WyesCX89TQMxKJV9DxqP\noGozOi/kR1kaPnQM6lftgHO3rqZM1PDCszDCs/+kc5l3IBHeu76GEAOS63GnN2I3\nCayXgQs7UXO+BnmJjrnzGszbsXQqD1wooeEQPPw62gOUrCFNfEIVUQjcJBPOL+6G\nIhXYdANZAgMBAAECggEAFU0FO5VOcoa74pch02eMAkl6P78t+n4WxsKWyuaWGd8d\nVWCbnH0ZMFJujOSlkoDvid2+klRFHj4iq504MzKTIe7K95qrSYIFDIw9cwXIdE8t\ndPV+fPcYFqNkkVuACNOO3mhbXE7qawllNWDYYBFJkZkMintOt7ris4APphKSZrMg\nIZWlxrs/El5zzDqQtUKjTtMizr54K23V2SyS9Leoomfy9pJHrjEFR1o8iA49XGHu\nz3qx8k7/QQwnEG4AkR4JhP2XdFCcIeKYCrAkGlk22925dHeDjLhqK9rKlns9Sfcj\nD9lOdKCaBSX07Xwa7nDR6s+JENtMUJQuZWiGqjcBgQKBgQD0maSVMgEJKwMEigVc\nOWz9pROYPPazGZwKSL/GF3tvwtfjHq/s2h6+PHDj9v8R+FEFW3DwuC+3tcvTfdfP\narXdcuWOAAHezRgcvHuvRWjiSryEK/M1YTeZcOt6Wn0nO10ySv4jJWpE2gnGa1CO\nh/o3aDzflt3hwBDZeWUvRsTDYQKBgQDAJ98rHtYoXWpMl7vYwLG7Z7FXXNyNzJ0O\nUuIM/lCXbEcyj3SHA6KxomXGL2VxmMTK6n/MjqsVAb+oU2Cixn2vRyWHVlcZhutO\nZDWVIhsVBaOFOLg1a20qs3oi1mRWLzUq5KWq5Y1R9ane8RABuaXrpV7GdOLml0Vh\nl7D2b446+QKBgQC4ZTN7/gxl2vUVcO+FjQ0rUk0pUZwxfLbz0dAxB/bYVCzoXXQG\nvJC8nVgFo2i7JVX/EeZcsp3Wgsi8EXymMy4TWdDQchT23+qzjyw2/76ICguAIJni\nvf1qQYRj4t/CubASgBKCcGxip3UDDlfWe5AYQQ7TCCsRSvfo2ul68IDZQQKBgGE5\nC0JfBM5BjZIZR5MA1CxU57ajJnicaW6g4vzeA9rJjzB2wue5IC0uVL40pugV+qQM\niALwwIENdHJvVTqmoVr47XUPa1xgFliAfVfqfLdjNfwm2ZU1uHNdgdN0lCnDEuyT\n6XqRULKCUKObZpTo4Jlc/5n78/3l1dXuETxu7xDJAoGAfOPTWMtPCz0BYDPP9NMz\n1rF5UaDa1FIUzp1J6mkmHLJpOrL+8n0NPGHfxEeV4Wyg0OFNsEPWaXNl8gvaZcNf\n0abrqAZKWPsOb9BnXsrhFsvpREiVT2nah1LAjkX1pfPQDBdD2O6ydFtYuHMp/AHS\nmf2o0VtQqcmrRvlzamF6b8U=\n-----END PRIVATE KEY-----\n".replace(
          /\\n/g,
          "\n"
        ),
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });
  const spreadsheetId = "1Ie0XlmrEWgx3hOYH3laNC-P0zb_Fk7NVBJ5CnnEX77E";
  const sheets = google.sheets({ version: "v4", auth });

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A1:F1", // Adjust the sheet and range as needed
      requestBody: {
        values: [
          [fullName, email, phoneNumber, experience, jobTitle, aboutExperience],
        ],
      },
    });
    return "Data successfully added to Google Sheet";
  } catch (error) {
    console.error("Error appending data to Google Sheets:", error);
    throw error;
  }
}
