import { useEffect, useState } from "react";
import api from "../services/api";
import ModelModal from "../components/ModelModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function ModelsPage() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  // Fetch Models
  const fetchModels = async (page = 1) => {
    try {
      setLoading(true);

      const res = await api.get(`/modelitems?page=${page}`);

      setModels(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch (error) {
      console.error("Failed to fetch models:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Add / Update Model
  const saveModel = async (form) => {
    try {
      if (selectedModel) {
        await api.put(`/modelitems/${selectedModel.id}`, form);
      } else {
        await api.post("/modelitems", form);
      }

      await fetchModels(currentPage);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to save model.");
    }
  };

  // Delete Model
  const deleteModel = async () => {
    try {
      await api.delete(`/modelitems/${deleteId}`);

      await fetchModels(currentPage);

      // Modal stays open
      // ConfirmDeleteModal will show success message
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete model.",
      );
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Models</h1>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => {
            setSelectedModel(null);
            setOpenModal(true);
          }}
        >
          Add New Model
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b text-center">ID</th>

              <th className="py-3 px-4 border-b text-center">Name</th>

              <th className="py-3 px-4 border-b text-center">Brand</th>

              <th className="py-3 px-4 border-b text-center">Items Count</th>

              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  Loading models...
                </td>
              </tr>
            ) : models.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No models data available yet.
                </td>
              </tr>
            ) : (
              models.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border-b text-center">{m.id}</td>

                  <td className="py-3 px-4 border-b text-center font-medium">
                    {m.name}
                  </td>

                  <td className="py-3 px-4 border-b text-center">
                    {m.brand?.name || "-"}
                  </td>

                  <td className="p-3 border text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {m.items_count}
                    </span>
                  </td>

                  <td className="py-3 px-4 border-b text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm transition"
                        onClick={() => {
                          setSelectedModel(m);
                          setOpenModal(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition"
                        onClick={() => setDeleteId(m.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={currentPage === 1 || loading}
            onClick={() => fetchModels(currentPage - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {currentPage} of {lastPage}
          </span>

          <button
            disabled={currentPage === lastPage || loading}
            onClick={() => fetchModels(currentPage + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <ModelModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedModel(null);
        }}
        onSave={saveModel}
        model={selectedModel}
      />

      {/* Delete Modal */}
      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteModel}
      />
    </div>
  );
}
