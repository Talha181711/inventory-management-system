import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BrandModal({ open, onClose, onSave, brand }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (brand) {
      setIsEditMode(true);
      setName(brand.name || "");
    } else {
      setIsEditMode(false);
      setName("");
    }

    setMessage("");
    setIsSuccess(false);
  }, [brand, open]);

  if (!open) return null;

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      await onSave(name);

      setMessage(
        isEditMode
          ? "✅ Brand updated successfully."
          : "✅ Brand added successfully.",
      );

      setIsSuccess(true);
      setName("");
    } catch (error) {
      setMessage(error.message || "❌ Something went wrong.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setMessage("");
    setLoading(false);
    setIsSuccess(false);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[450px] relative">
        {/* Close Icon */}
        <button onClick={handleClose} className="absolute top-3 right-3">
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Brand" : "Add Brand"}
        </h2>

        {/* Success / Error Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Brand Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Brand Name"
          disabled={loading}
          className="w-full border p-2 rounded"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleClose} className="border px-4 py-2 rounded">
            {isSuccess ? "Close" : "Cancel"}
          </button>

          <button
            onClick={handleSave}
            disabled={loading || isSuccess}
            className={`px-4 py-2 text-white rounded ${
              loading || isSuccess
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isSuccess
                ? isEditMode
                  ? "Updated"
                  : "Added"
                : isEditMode
                  ? "Update"
                  : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
