<?php

namespace Database\Factories;

use App\Enums\TaskPriorityEnum;
use App\Enums\TaskStatusEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fn () => User::all()->random()->id,
            'name' => $this->faker->text(45),
            'description' => $this->faker->text(200),
            'status' => $this->faker->randomElement(TaskStatusEnum::cases())->value,
            'priority' => $this->faker->randomElement(TaskPriorityEnum::cases())->value,
            'deadline' => $this->faker->date(),
        ];
    }
}
