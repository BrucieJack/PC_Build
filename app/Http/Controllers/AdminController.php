<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Models\ComputerBuild;
use Illuminate\Http\Request;
use App\Models\CPU;
use App\Models\GPU;
use App\Models\RAM;
use App\Models\Motherboard;
use App\Models\Power;
use App\Models\ComputerCase;
use App\Models\Memory;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $builds = [];
        $computers = ComputerBuild::where('isAdmin', '=', true)->get();
        foreach($computers as $computer){
            $builds[] = [
                'id' => $computer->id,
                'cpu' => $computer->cpu,
                'gpu' => $computer->gpu,
                'ram' => $computer->ram,
                'motherboard' => $computer->motherboard,
                'memory' => $computer->memory,
                'power' => $computer->power,
                'compcase' => $computer->case,
            ];
        }

        return Inertia::render('ReadyComputers', ['builds' => $builds]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user = auth()->user()->id;
            $options[] = [
                'cpu' => CPU::all(),
                'gpu' => GPU::all(),
                'ram' => RAM::all(),
                'motherboard' => Motherboard::all(),
                'memory' => Memory::all(),
                'power' => Power::all(),
                'computer_case' => ComputerCase::all(),
            ];
    
     
            return Inertia::render('Admin', ['options' => $options, 'user' => $user]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        ComputerBuild::create($request->all());
        return Redirect::route('admin.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
