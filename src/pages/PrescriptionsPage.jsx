import React, { useState } from 'react';

const PrescriptionsPage = () => {
  const [prescriptionFile, setPrescriptionFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescriptionFile(file);
    }
  };

  const handleUpload = () => {
    if (prescriptionFile) {
      alert('Prescription uploaded successfully! Our team will process it shortly.');
      setPrescriptionFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Prescription</h1>
          <p className="text-gray-600 mb-8">Upload your prescription and we'll deliver your medicines quickly</p>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
              {prescriptionFile ? (
                <div>
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-900 font-semibold mb-2">{prescriptionFile.name}</p>
                  <p className="text-sm text-gray-600">{(prescriptionFile.size / 1024).toFixed(2)} KB</p>
                </div>
              ) : (
                <div>
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600 mb-2">Drag and drop your prescription here</p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <label className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-4">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
                </div>
              )}
            </div>

            {prescriptionFile && (
              <button
                onClick={handleUpload}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
              >
                Upload Prescription
              </button>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Why upload prescription?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Get authentic prescription medicines</li>
                <li>• Fast processing and delivery</li>
                <li>• Expert verification by pharmacists</li>
                <li>• Secure and confidential handling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;

