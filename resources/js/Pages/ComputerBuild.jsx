import React, { useState } from "react";
import Select from "@/Components/Select"
import Button from '@/Components/Button';
import { Head, Link, useForm, usePage } from '@inertiajs/inertia-react';

export default function ComputerBuild({options, user}) {
    const { data, setData, post, errors } = useForm({
        c_p_u_id: '',
        g_p_u_id: '',
        r_a_m_id: '',
        motherboard_id: '',
        memory_id: '',
        power_id: '',
        computer_case_id: '',
        isAdmin: false,
        user_id: user,
    });



    const [CASEmessage, setCASEMessage]= useState("");
    const [RAMmessage, setRAMMessage]= useState("");
    const [CPUmessage, setCPUMessage]= useState("");


    const  onHandleChangeCPU = (event) => {

        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        
        if (data.motherboard_id != '') {
            if(!(options[0].cpu[event.target.value-1].socket === options[0].motherboard[data.motherboard_id-1].socket)){
                setCPUMessage('Центральный процессор не подходит под материнскую плату')
            }else{
                setCPUMessage('')
            }
        }
    };

    const onHandleChangeMotherboard = (event) => {

        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);

        if (data.c_p_u_id != '') {

            if(!(options[0].motherboard[event.target.value-1].socket === options[0].cpu[data.c_p_u_id-1].socket)){
                setCPUMessage('Центральный процессор не подходит под материнскую плату')
            }else{
                setCPUMessage('')
            }
        }
        if (data.r_a_m_id != '') {

            if(!(options[0].motherboard[event.target.value-1].memory_socket === options[0].ram[data.r_a_m_id-1].memory_socket)){
                setRAMMessage('Оперативная память не подходит под материнскую плату')
            }else{
                setRAMMessage('')
            }
        }
        if (data.computer_case_id != '') {

            if(!(options[0].motherboard[event.target.value-1].form_factor === options[0].computer_case[data.computer_case_id-1].form_factor)){
                setCASEMessage('Материнская плата не подходит к корпусу')
            }else{
                setCASEMessage('')
            }
        }
    };


    
    const onHandleChangeRAM = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);

        if (data.motherboard_id != '') {
            if(!(options[0].ram[event.target.value-1].memory_socket === options[0].motherboard[data.motherboard_id-1].memory_socket)){
                setRAMMessage('Оперативная память не подходит под материнскую плату')
            }else{
                setRAMMessage('')
            }
        }

    };

    const onHandleChangeCase = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    
        if (data.motherboard_id != '') {
            if(!(options[0].computer_case[event.target.value-1].form_factor === options[0].motherboard[data.motherboard_id-1].form_factor)){
                setCASEMessage('Материнская плата не подходит к корпусу')
            }else{
                setCASEMessage('')
            }
        }
    
    };


    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };



    const submit = (event) => {
        event.preventDefault();
        if (data.c_p_u_id != '' && data.g_p_u_id != '' && data.r_a_m_id != '' && data.motherboard_id != '' && data.memory_id != '' && data.power_id != '' && data.computer_case_id != '' && CASEmessage === '' && RAMmessage === '' && CPUmessage === '') {
            post(route('comp-build.store'));
        }else{
            console.log("rtrt")
        }
    };


    return(
        <div>
            {/* {options.map(({name}) => ( <h1>{name}</h1> ))} */}
            {/* <NavBar/> */}
            <div>
                <span>{errors.title}</span>
                <form onSubmit={submit}>
                    <Select
                        value = {data.c_p_u_id}
                        name = "c_p_u_id"
                        className=""
                        handleChange={onHandleChangeCPU}
                        options = {options[0].cpu.map(({id, name}) => (<option value={id}>{name}</option>))}
                    />
                    <Select
                        value= {data.g_p_u_id}
                        name = "g_p_u_id"
                        className=""
                        handleChange={onHandleChange}
                        options = {options[0].gpu.map(({id, name}) => (<option value={id}>{name}</option>))}
                    />
                    <Select
                        value= {data.r_a_m_id}
                        name = "r_a_m_id"
                        className=""
                        handleChange={onHandleChangeRAM}
                        options = {options[0].ram.map(({id, name}) => (<option value={id}>{name}</option>))}
                    />
                    <Select
                        value= {data.motherboard_id}
                        name = "motherboard_id"
                        className=""
                        handleChange={onHandleChangeMotherboard}
                        options = {options[0].motherboard.map(({id, name}) => (<option value={id}>{name}</option>))}
                    />
                    <Select
                        value = {data.memory_id}
                        name = "memory_id"
                        className=""
                        handleChange={onHandleChange}
                        options = {options[0].memory.map(({id, name}) => (<option value={id}>{name}</option>))}
                    />
                    <Select
                        value = {data.power_id}
                        name = "power_id"
                        className=""
                        handleChange={onHandleChange}
                        options = {options[0].power.map(({id, name}) => (<option value={id}>{name}</option>))}
                    />  
                    <Select
                        value = {data.computer_case_id}
                        name = "computer_case_id"
                        className=""
                        handleChange={onHandleChangeCase}
                        options = {options[0].computer_case.map(({id, name}) => (<option value={id}>{name}</option>))}
                    />
                    <Button className="" >
                        Save
                    </Button>
                </form>
            </div>
            <div>
                <h2>{CASEmessage}</h2>
                <h2>{RAMmessage}</h2>
                <h2>{CPUmessage}</h2>
            </div>                                       
        </div>
    )
}