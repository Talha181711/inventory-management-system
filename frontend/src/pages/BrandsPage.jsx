import { useEffect, useState } from "react";
import api from "../services/api";
import BrandModal from "../components/BrandModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const fetchBrands = async (page = 1) => {
    try {
      setLoading(true);

      const res = await api.get(`/brands?page=${page}`);

      setBrands(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch (error) {
      console.error("Error loading brands:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const saveBrand = async (name) => {
    try {
      if (selectedBrand) {
        await api.put(`/brands/${selectedBrand.id}`, { name });
      } else {
        await api.post("/brands", { name });
      }

      await fetchBrands(currentPage);
    } catch (error) {
      console.error("Error saving brand:", error);
      throw new Error(error.response?.data?.message || "Failed to save brand.");
    }
  };

  const deleteBrand = async () => {
    await api.delete(`/brands/${deleteId}`);
    await fetchBrands(currentPage);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Brands</h1>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedBrand(null);
            setOpenModal(true);
          }}
        >
          Add New Brand
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          {/* HEADER */}
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b text-center">ID</th>
              <th className="py-3 px-4 border-b text-center">Name</th>
              <th className="p-3 border text-center">Items Count</th>
              <th className="p-3 border text-center">Models Count</th>
              <th className="py-3 px-4 border-b text-center">Operations</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  Loading brands...
                </td>
              </tr>
            ) : brands.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No brands found yet.
                </td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border-b text-center">{brand.id}</td>

                  <td className="py-3 px-4 border-b text-center font-medium">
                    {brand.name}
                  </td>

                  <td className="p-3 border text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {brand.items_count}
                    </span>
                  </td>

                  <td className="p-3 border text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {brand.models_count}
                    </span>
                  </td>

                  <td className="py-3 px-4 border-b text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm transition"
                        onClick={() => {
                          setSelectedBrand(brand);
                          setOpenModal(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition"
                        onClick={() => setDeleteId(brand.id)}
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
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => fetchBrands(currentPage - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {currentPage} of {lastPage}
          </span>

          <button
            disabled={currentPage === lastPage}
            onClick={() => fetchBrands(currentPage + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <BrandModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={saveBrand}
        brand={selectedBrand}
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteBrand}
      />
    </div>
  );
}
