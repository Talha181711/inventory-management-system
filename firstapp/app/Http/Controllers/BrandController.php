<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{

        public function index()
    {
        return Brand::withCount(['items', 'models'])
        ->orderBy('id', 'desc')
        ->paginate(10);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:brands,name'
        ]);

        $brand = Brand::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Brand created',
            'brand' => $brand
        ]);
    }

    public function update(Request $request, $id)
    {
        $brand = Brand::findOrFail($id);

        $request->validate([
            'name' => 'required|unique:brands,name,' . $id
        ]);

        $brand->update([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Brand updated'
        ]);
    }

    public function destroy($id)
    {
        Brand::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Brand deleted'
        ]);
    }
}