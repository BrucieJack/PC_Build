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
        Schema::create('r_a_m_s', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('price');
            $table->string('memory_size');
            $table->string('memory_socket');
            $table->string('frequency');
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
        Schema::dropIfExists('r_a_m_s');
    }
};
