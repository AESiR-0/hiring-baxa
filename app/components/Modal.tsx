import React from "react";
import Link from "next/link";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's closed

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/2 flex flex-col gap-5 items-center justify-center rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-semibold text-center text-black mb-4">
          Submit ho gaya hai, <br /> ab{" "}
          <span className="text-[#80D3FF]"> sabar </span> rakho
        </h2>
        <video
          src={"/videos/modal/Success.mp4"}
          width={600}
          height={300}
          loop
          autoPlay
          controls={false}
        />
        <div className=" absolute top-10 right-10 flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#80D3FF] text-white px-6 py-2 rounded-lg hover:bg-[#d4edfa] transition-colors"
          >
            <Link href={"https://youtu.be/xvFZjo5PgG0?si=h9qItXjsVyKBb6fK"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
