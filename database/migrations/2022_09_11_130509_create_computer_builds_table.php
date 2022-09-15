<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('computer_builds', function (Blueprint $table) {
            $table->id();
            $table->boolean('isAdmin');
            $table->foreignId('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreignId('c_p_u_id');
            $table->foreign('c_p_u_id')->references('id')->on('c_p_u_s');
            $table->foreignId('g_p_u_id');
            $table->foreign('g_p_u_id')->references('id')->on('g_p_u_s');
            $table->foreignId('r_a_m_id');
            $table->foreign('r_a_m_id')->references('id')->on('r_a_m_s');
            $table->foreignId('motherboard_id');
            $table->foreign('motherboard_id')->references('id')->on('motherboards');
            $table->foreignId('power_id');
            $table->foreign('power_id')->references('id')->on('powers');
            $table->foreignId('memory_id');
            $table->foreign('memory_id')->references('id')->on('memories');
            $table->foreignId('computer_case_id');
            $table->foreign('computer_case_id')->references('id')->on('computer_cases');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('computer_builds');
    }
};
