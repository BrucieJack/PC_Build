<?php

namespace App\Services;

use Goutte\Client;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\CPU;
use App\Models\GPU;
use App\Models\RAM;
use App\Models\Motherboard;
use App\Models\Power;
use App\Models\ComputerCase;
use App\Models\Memory;




class ParserService
{


    private $gpu = [];
    private $cpu = [];
    private $motherboard = [];
    private $ram = [];
    private $power = [];
    private $memory = [];
    private $case = [];

    public function curlGetPage($url ,$referer = 'https://google.com/'){
        
    }

    public function parseGPU(){
        $client = new Client();
        $url = 'https://shop.by/videokarty/';
        $page = $client->request('GET', $url);

        $page->filter('.ModelList__ModelBlockRow')->each(function ($item) {
            $price = $item->filter('.PriceBlock__PriceValue')->text();
            $temp = [];
            $temp = explode(',' ,$item->filter('.ModelList__DescBlock')->text());
            $this->gpu[] = [
                'name' => $item->filter('.ModelList__LinkModel > span')->text(),
                'price' => (float)  preg_replace("/[^,.0-9]/", '', $price),
                'memory' => $temp[3] ?? "Нет информации",
                'frequency' => $temp[1] ?? "Нет информации",
            ];
        });
    }

    public function parseCPU(){
        $client = new Client();
        $url = 'https://shop.by/protsessory/';
        $page = $client->request('GET', $url);

        $page->filter('.ModelList__ModelBlockRow')->each(function ($item) {
            $price = $item->filter('.PriceBlock__PriceValue')->text();
            $temp = [];
            $temp = explode(',' ,$item->filter('.ModelList__DescBlock')->text());
            $this->cpu[] = [
                'name' => $item->filter('.ModelList__LinkModel > span')->text(),
                'price' => (float)  preg_replace("/[^,.0-9]/", '', $price),
                'cores' => $temp[3] ?? "Нет информации",
                'frequency' => $temp[2] ?? "Нет информации",
                'socket' => trim(str_replace('Socket', '', (str_replace('LGA', '', ($temp[1] ?? "Нет информации"))))),
            ];
        });
    }


    public function parseMotherboard(){
        $client = new Client();
        $url = 'https://shop.by/materinskie_platy/';
        $page = $client->request('GET', $url);

        $page->filter('.ModelList__ModelBlockRow')->each(function ($item) {
            $price = $item->filter('.PriceBlock__PriceValue')->text();
            $temp = [];
            $temp = explode(',' ,$item->filter('.ModelList__DescBlock')->text());
            $this->motherboard[] = [
                'name' => $item->filter('.ModelList__LinkModel > span')->text(),
                'price' => (float)  preg_replace("/[^,.0-9]/", '', $price),
                'form_factor' => $temp[0] ?? "Нет информации",
                'socket' => trim(str_replace('Socket', '', (str_replace('LGA', '', (explode(' ', $temp[1] ?? "Нет информации", 3)[2]))))),
                'memory_socket' => $temp[4] ?? "Нет информации",
            ];
        });
    }

    public function parseRAM(){
        $client = new Client();
        $url = 'https://shop.by/pamyat/';
        $page = $client->request('GET', $url);

        $page->filter('.ModelList__ModelBlockRow')->each(function ($item) {
            $price = $item->filter('.PriceBlock__PriceValue')->text();
            $temp = [];
            $temp = explode(',' ,$item->filter('.ModelList__DescBlock')->text());
            $this->ram[] = [
                'name' => $item->filter('.ModelList__LinkModel > span')->text(),
                'price' => (float)  preg_replace("/[^,.0-9]/", '', $price),
                'memory_size' => $temp[1] ?? "Нет информации",
                'frequency' => $temp[3] ?? "Нет информации",
                'memory_socket' => $temp[2] ?? "Нет информации",
            ];
        });
    }

    public function parsePower(){
        $client = new Client();
        $url = 'https://shop.by/kompyuternye_bloki_pitaniya/';
        $page = $client->request('GET', $url);

        $page->filter('.ModelList__ModelBlockRow')->each(function ($item) {
            $price = $item->filter('.PriceBlock__PriceValue')->text();
            $temp = [];
            $temp = explode(',' ,$item->filter('.ModelList__DescBlock')->text());
            $this->power[] = [
                'name' => $item->filter('.ModelList__LinkModel > span')->text(),
                'price' => (float)  preg_replace("/[^,.0-9]/", '', $price),
                'power' => $temp[0] ?? "Нет информации",
            ];
        });
    }

    public function parseMemory(){
        $client = new Client();
        $url = 'https://shop.by/zhestkie_diski/';
        $page = $client->request('GET', $url);

        $page->filter('.ModelList__ModelBlockRow')->each(function ($item) {
            $price = $item->filter('.PriceBlock__PriceValue')->text();
            $temp = [];
            $temp = explode(',' ,$item->filter('.ModelList__DescBlock')->text());
            $this->memory[] = [
                'name' => $item->filter('.ModelList__LinkModel > span')->text(),
                'price' => (float) preg_replace("/[^,.0-9]/", '', $price),
                'type' => $temp[0] ?? "Нет информации",
            ];
        });
    }

    public function parseCase(){
        $client = new Client();
        $url = 'https://shop.by/korpusa_dlya_kompyutera/';
        $page = $client->request('GET', $url);

        $page->filter('.ModelList__ModelBlockRow')->each(function ($item) {
            $price = $item->filter('.PriceBlock__PriceValue')->text();
            $temp = [];
            $temp = explode(',' ,$item->filter('.ModelList__DescBlock')->text());
            $this->case[] = [
                'name' => $item->filter('.ModelList__LinkModel > span')->text(),
                'price' => (float) preg_replace("/[^,.0-9]/", '', $price),
                'form_factor' => str_replace('-', '', (trim(strpos($temp[0] ?? "Нет информации", "Tower") ? $temp[1] ?? "Нет информации" : $temp[0] ?? "Нет информации"))),
            ];
        });
    }

    public function parseAllComponents(){
        $this->parseGPU();
        $this->parseCPU();
        $this->parseRAM();
        $this->parseMotherboard();
        $this->parsePower();
        $this->parseCase();
        $this->parseMemory();
        


        foreach($this->gpu as $item){
            if(!(GPU::where('name', '=', $item['name']))->exists()){
                DB::table('g_p_u_s')->insert($item);
            }
        }

        foreach($this->cpu as $item){
            if(!(CPU::where('name', '=', $item['name']))->exists()){
                DB::table('c_p_u_s')->insert($item);
            }
        }

        foreach($this->ram as $item){
            if(!(GPU::where('name', '=', $item['name']))->exists()){
                DB::table('r_a_m_s')->insert($item);
            }
        }

        foreach($this->motherboard as $item){
            if(!(GPU::where('name', '=', $item['name']))->exists()){
                DB::table('motherboards')->insert($item);
            }
        }

        foreach($this->power as $item){
            if(!(GPU::where('name', '=', $item['name']))->exists()){
                DB::table('powers')->insert($item);
            }
        }

        foreach($this->memory as $item){
            if(!(GPU::where('name', '=', $item['name']))->exists()){
                DB::table('memories')->insert($item);
            }
        }

        foreach($this->case as $item){
            if(!(GPU::where('name', '=', $item['name']))->exists()){
                DB::table('computer_cases')->insert($item);
            }
        }


    }
}


