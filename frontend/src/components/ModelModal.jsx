import { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "../services/api";

export default function ModelModal({ open, onClose, onSave, model }) {
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");

  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);
  const [brandsLoading, setBrandsLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  // Load brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setBrandsLoading(true);

        const res = await api.get("/brands");

        setBrands(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setBrandsLoading(false);
      }
    };

    if (open) {
      fetchBrands();
    }
  }, [open]);

  // Populate form when editing
  useEffect(() => {
    setIsSuccess(false);
    setMessage("");
    if (model) {
      setIsEditMode(true);

      setName(model.name || "");
      setBrandId(model.brand_id || "");
    } else {
      setIsEditMode(false);
      setName("");
      setBrandId("");
    }
  }, [model]);

  const handleSave = async () => {
    try {
      if (!name.trim()) {
        setMessage("❌ Model name is required.");
        return;
      }

      if (!brandId) {
        setMessage("❌ Please select a brand.");
        return;
      }

      setLoading(true);
      setMessage("");

      await onSave({
        name,
        brand_id: brandId,
      });

      setIsSuccess(true);

      setMessage(
        isEditMode
          ? "✅ Model updated successfully."
          : "✅ Model added successfully.",
      );

      setName("");
      setBrandId("");
    } catch (error) {
      setMessage(error.message || "❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    setLoading(false);
    setIsSuccess(false);

    if (!isEditMode) {
      setName("");
      setBrandId("");
    }

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[450px] relative">
        <button onClick={handleClose} className="absolute top-3 right-3">
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? "Edit Model" : "Add Model"}
        </h2>

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

        {/* Model Name */}
        <div className="mb-3">
          <label className="block text-sm mb-1">Model Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Model Name"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Brand Dropdown */}
        <div>
          <label className="block text-sm mb-1">Brand</label>

          {brandsLoading ? (
            <div className="border rounded p-2 text-gray-500">
              Loading brands...
            </div>
          ) : (
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Brand</option>

              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleClose} className="border px-4 py-2 rounded">
            {isSuccess ? "Close" : "Cancel"}
          </button>

          <button
            onClick={handleSave}
            disabled={loading || brandsLoading || isSuccess}
            className={`px-4 py-2 text-white rounded ${
              loading || brandsLoading || isSuccess
                ? "bg-blue-400 cursor-not-allowed"
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
