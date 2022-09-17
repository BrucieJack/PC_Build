<?php

namespace App\Http\Controllers;


class HomeController extends Controller
{
   
    public function index()
    {   
        $user = auth()->user()->email ?? null;
        if ($user === null) {
            return redirect('/register'); 
        } else if ($user === "admin@gmail.com") {
            return redirect('/admin/create');
        } else {
            return redirect('/comp-build/create');
        }
    }

   
  
}
