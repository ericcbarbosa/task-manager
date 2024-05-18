<?php

namespace App\Http\Controllers;

use App\Enums\TaskStatusEnum;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::with('user')->get();
        return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'status' => 'required',
            'deadline' => 'required',
            'priority' => 'required',
        ]);

        $request->merge(['user_id'=> auth()->id()]);
        $result = Task::create($request->all());

        return response()->json($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'status' => 'required',
            'deadline' => 'required',
            'priority' => 'required',
        ]);

        $result = Task::findOrFail($id)::update($request->all());
        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = Task::findOrFail($id)->delete();
        return response()->json($result);
    }

    /**
     * Update task owner
     */
    public function take(string $id)
    {
        $result = Task::findOrFail($id)->update([
            'user_id' => auth()->id(),
        ]);

        return response()->json($result);
    }

    /**
     * Update task status
     */
    public function updateStatus(string $id, TaskStatusEnum $status)
    {
        $result = Task::findOrFail($id)->update([
            'status' => $status,
        ]);

        return response()->json($result);
    }
}
