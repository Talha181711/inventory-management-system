<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Brand;
use App\Models\Item;
class ModelItem extends Model
{
    protected $table = 'modelitem';
    protected $fillable =[
        'name',
        'brand_id'
    ];
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }
    public function items()
    {
        return $this->hasMany(Item::class, 'model_id');
    }
}
