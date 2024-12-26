import React from "react";

const Summary = ({ data, onConfirm, loading }) => {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Health Summary</h2>
      <p className="mb-4">
        <strong>Name:</strong> {data?.name}
      </p>
      <p className="mb-4">
        <strong>Age:</strong> {data?.age}
      </p>
      <p className="mb-4">
        <strong>Symptoms:</strong> {data?.symptoms}
      </p>
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
          <p className="text-gray-600">Generating PDF...</p>
        </div>
      ) : (
        <button
          onClick={onConfirm}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Generate PDF
        </button>
      )}
    </div>
  );
};

export default Summary;
