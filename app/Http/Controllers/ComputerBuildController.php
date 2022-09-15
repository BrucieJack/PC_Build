<?php

namespace App\Http\Controllers;

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
use App\Models\User;

class ComputerBuildController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   

        $user = auth()->user()->id;
        $computers = ComputerBuild::where('user_id', '=', $user)->get();
        foreach($computers as $computer){
            $builds[] = [
                'cpu' => $computer->cpu,
                'gpu' => $computer->gpu,
                'ram' => $computer->ram,
                'motherboard' => $computer->motherboard,
                'memory' => $computer->memory,
                'power' => $computer->power,
                'compcase' => $computer->case,
            ];
        }

        return Inertia::render('MyComputers', ['builds' => $builds]);
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

 
        return Inertia::render('ComputerBuild', ['options' => $options, 'user' => $user]);
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
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ComputerBuild  $computerBuild
     * @return \Illuminate\Http\Response
     */
    public function show(ComputerBuild $computerBuild)
    {
        $computers = ComputerBuild::where('isAdmin', '=', true)->get();
        foreach($computers as $computer){
            $builds[] = [
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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ComputerBuild  $computerBuild
     * @return \Illuminate\Http\Response
     */
    public function edit(ComputerBuild $computerBuild)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ComputerBuild  $computerBuild
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ComputerBuild $computerBuild)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ComputerBuild  $computerBuild
     * @return \Illuminate\Http\Response
     */
    public function destroy(ComputerBuild $computerBuild)
    {
        //
    }
}
