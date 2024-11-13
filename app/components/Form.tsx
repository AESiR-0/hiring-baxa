"use client";
import React, { useState } from "react";

type FocusedFields = {
  [key: string]: boolean;
};

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

const formFields = [
  { type: "text", name: "fullName", label: "Full Name" },
  { type: "email", name: "email", label: "Email" },
  { type: "tel", name: "phoneNumber", label: "Mobile" },
  { type: "number", name: "experience", label: "Years of Experience" },
  { type: "text", name: "playlist", label: "Playlist Link" },
  { type: "text", name: "favComic", label: "Favourite Standup Comic" },
];

const Form: React.FC = () => {
  const [focused, setFocused] = useState<FocusedFields>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [CV, setCV] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    experience: 0,
    jobTitle: null,
    aboutExperience: "",
    cv: "",
    playlist: "",
    favComic: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFocus = (field: string) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setFocused({ ...focused, [field]: false });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const {
      fullName,
      email,
      phoneNumber,
      experience,
      jobTitle,
      aboutExperience,
      cv,
    } = formData;

    const dataToSend = {
      fullName,
      email,
      phoneNumber,
      experience,
      jobTitle,
      aboutExperience,
      cv,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        setIsSubmitting(false);
      } else {
        alert("Failed to submit form. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0D0D] flex items-center justify-center text-white px-4">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <div className="text-6xl w-full max-md:text-3xl max-md:mb-5  max-md:items-start max-md:justify-start max-md:m-0 max-md:p-0  font-bold md:mb-6 md:pr-32">
          <span className="text-[#80D3FF] ">Salary </span>{" "}
          <span>kitni loge usse pehele</span>
          <span className="text-[#80D3FF]"> CV</span> <span>dekhle?</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 md:grid max-md:grid-cols-2 justify-between gap-10 mb-6">
            {[
              "Front-end Developer",
              "Sales and BD Intern",
              "Content Writer",
              "UI Intern",
            ].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  // Toggle the jobTitle in the form data and set the selected option
                  const newJobTitle = selected === option ? null : option;
                  setSelected(newJobTitle);
                  setFormData((prev) => ({
                    ...prev,
                    jobTitle: newJobTitle, // Update jobTitle directly based on new selected option
                  }));
                }}
                className={`hover:bg-[#80D3FF] ${
                  formData.jobTitle === option
                    ? "bg-[#80D3FF] border border-[#80D3FF]"
                    : "border border-white bg-transparent "
                } py-2 px-2 rounded-3xl transition`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="grid gap-x-10 gap-y-4 py-5 grid-cols-1 md:grid-cols-2">
            {formFields.map((field, index) => (
              <div key={index} className="relative mb-6">
                <input
                  required
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof FormData] || ""}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={(e) => handleBlur(field.name, e.target.value)}
                  onChange={handleChange}
                  className="w-full bg-[#0E0D0D] rounded-none text-white py-3 px-2 outline-none border border-t-0 border-l-0 border-r-0 border-[#80D3FF] transition"
                />
                <label
                  className={`absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 ${
                    focused[field.name]
                      ? "-translate-y-10 left-0 text-sm text-[#80D3FF]"
                      : ""
                  }`}
                >
                  {field.label}*
                </label>
              </div>
            ))}
          </div>

          <div className="mb-6 flex relative w-full flex-row-reverse gap-5 justify-end">
            <input
              required
              type="text"
              name="cv"
              value={formData["cv"] || ""}
              onFocus={() => handleFocus("cv")}
              onBlur={(e) => handleBlur("cv", e.target.value)}
              onChange={handleChange}
              className={`w-full bg-[#0E0D0D] rounded-none text-white py-3 px-2 outline-none border border-t-0 border-l-0 border-r-0 border-[#80D3FF] transition`}
            />
            <label
              className={`absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 ${
                focused["cv"]
                  ? "-translate-y-10 left-0 text-sm text-[#80D3FF]"
                  : ""
              }`}
            >
              CV Link*
            </label>
          </div>

          <div className="mb-6">
            <textarea
              placeholder="Tell Us About Your Experience!"
              name="aboutExperience"
              rows={4}
              value={formData.aboutExperience}
              onChange={handleChange}
              className="w-full bg-[#0E0D0D] border-b-[#80D3FF] text-white py-3 px-4 rounded-md outline-none border border-transparent focus:border-[#80D3FF] transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full hover:border-white hover:border hover:bg-transparent bg-[#80D3FF] py-3 rounded-xl text-white font-semibold hover:bg-[#80D3FF] transition"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
