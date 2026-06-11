<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable =[
        'name',
        'amount',
        'brand_id',
        'model_id'
    ];
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }
    public function model()
    {
        return $this->belongsTo(ModelItem::class, 'model_id');
    }
}
