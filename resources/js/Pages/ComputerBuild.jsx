import React, { useState } from "react";
import Select from "@/Components/Select";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";

export default function ComputerBuild(props) {
    const { data, setData, post, errors } = useForm({
        c_p_u_id: "",
        g_p_u_id: "",
        r_a_m_id: "",
        motherboard_id: "",
        memory_id: "",
        power_id: "",
        computer_case_id: "",
        isAdmin: false,
        user_id: props.user,
    });

    console.log(props);
    const [CASEmessage, setCASEMessage] = useState("");
    const [RAMmessage, setRAMMessage] = useState("");
    const [CPUmessage, setCPUMessage] = useState("");

    const onHandleChangeCPU = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );

        if (data.motherboard_id != "") {
            if (
                !(
                    props.options[0].cpu[event.target.value - 1].socket ===
                    props.options[0].motherboard[data.motherboard_id - 1].socket
                )
            ) {
                setCPUMessage(
                    "Центральный процессор не подходит под материнскую плату"
                );
            } else {
                setCPUMessage("");
            }
        }
    };

    const onHandleChangeMotherboard = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );

        if (data.c_p_u_id != "") {
            if (
                !(
                    props.options[0].motherboard[event.target.value - 1]
                        .socket ===
                    props.options[0].cpu[data.c_p_u_id - 1].socket
                )
            ) {
                setCPUMessage(
                    "Центральный процессор не подходит под материнскую плату"
                );
            } else {
                setCPUMessage("");
            }
        }
        if (data.r_a_m_id != "") {
            if (
                !(
                    props.options[0].motherboard[event.target.value - 1]
                        .memory_socket ===
                    props.options[0].ram[data.r_a_m_id - 1].memory_socket
                )
            ) {
                setRAMMessage(
                    "Оперативная память не подходит под материнскую плату"
                );
            } else {
                setRAMMessage("");
            }
        }
        if (data.computer_case_id != "") {
            if (
                !(
                    props.options[0].motherboard[event.target.value - 1]
                        .form_factor ===
                        props.options[0].computer_case[
                            data.computer_case_id - 1
                        ].form_factor ||
                    (props.options[0].motherboard[event.target.value - 1]
                        .form_factor === "MicroATX" &&
                        props.options[0].computer_case[
                            data.computer_case_id - 1
                        ].form_factor === "ATX")
                )
            ) {
                setCASEMessage("Материнская плата не подходит к корпусу");
            } else {
                setCASEMessage("");
            }
        }
    };

    const onHandleChangeRAM = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );

        if (data.motherboard_id != "") {
            if (
                !(
                    props.options[0].ram[event.target.value - 1]
                        .memory_socket ===
                    props.options[0].motherboard[data.motherboard_id - 1]
                        .memory_socket
                )
            ) {
                setRAMMessage(
                    "Оперативная память не подходит под материнскую плату"
                );
            } else {
                setRAMMessage("");
            }
        }
    };

    const onHandleChangeCase = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );

        if (data.motherboard_id != "") {
            if (
                !(
                    props.options[0].computer_case[event.target.value - 1]
                        .form_factor ===
                        props.options[0].motherboard[data.motherboard_id - 1]
                            .form_factor ||
                    (props.options[0].computer_case[event.target.value - 1]
                        .form_factor === "ATX" &&
                        props.options[0].motherboard[data.motherboard_id - 1]
                            .form_factor === "MicroATX")
                )
            ) {
                setCASEMessage("Материнская плата не подходит к корпусу");
            } else {
                setCASEMessage("");
            }
        }
    };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (event) => {
        event.preventDefault();
        if (
            data.c_p_u_id != "" &&
            data.g_p_u_id != "" &&
            data.r_a_m_id != "" &&
            data.motherboard_id != "" &&
            data.memory_id != "" &&
            data.power_id != "" &&
            data.computer_case_id != "" &&
            CASEmessage === "" &&
            RAMmessage === "" &&
            CPUmessage === ""
        ) {
            post(route("comp-build.store"));
        } else {
            console.log("rtrt");
        }
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Сборка ПК
                </h2>
            }
        >
            <div className="container my-10 px-6 mx-auto">
                <section className="mb-20 text-gray-800">
                    <div className="flex flex-wrap">
                        <div className="grow-0 shrink-0 basis-auto mb-12 lg:mb-0 w-full lg:w-5/12 px-3 lg:px-6">
                            <span>{errors.title}</span>
                            <form onSubmit={submit}>
                                <Select
                                    value={data.c_p_u_id}
                                    name="c_p_u_id"
                                    className=""
                                    handleChange={onHandleChangeCPU}
                                    options={props.options[0].cpu.map(
                                        ({ id, name }) => (
                                            <option value={id}>{name}</option>
                                        )
                                    )}
                                />
                                <Select
                                    value={data.g_p_u_id}
                                    name="g_p_u_id"
                                    className=""
                                    handleChange={onHandleChange}
                                    options={props.options[0].gpu.map(
                                        ({ id, name }) => (
                                            <option value={id}>{name}</option>
                                        )
                                    )}
                                />
                                <Select
                                    value={data.r_a_m_id}
                                    name="r_a_m_id"
                                    className=""
                                    handleChange={onHandleChangeRAM}
                                    options={props.options[0].ram.map(
                                        ({ id, name }) => (
                                            <option value={id}>{name}</option>
                                        )
                                    )}
                                />
                                <Select
                                    value={data.motherboard_id}
                                    name="motherboard_id"
                                    className=""
                                    handleChange={onHandleChangeMotherboard}
                                    options={props.options[0].motherboard.map(
                                        ({ id, name }) => (
                                            <option value={id}>{name}</option>
                                        )
                                    )}
                                />
                                <Select
                                    value={data.memory_id}
                                    name="memory_id"
                                    className=""
                                    handleChange={onHandleChange}
                                    options={props.options[0].memory.map(
                                        ({ id, name }) => (
                                            <option value={id}>{name}</option>
                                        )
                                    )}
                                />
                                <Select
                                    value={data.power_id}
                                    name="power_id"
                                    className=""
                                    handleChange={onHandleChange}
                                    options={props.options[0].power.map(
                                        ({ id, name }) => (
                                            <option value={id}>{name}</option>
                                        )
                                    )}
                                />
                                <Select
                                    value={data.computer_case_id}
                                    name="computer_case_id"
                                    className=""
                                    handleChange={onHandleChangeCase}
                                    options={props.options[0].computer_case.map(
                                        ({ id, name }) => (
                                            <option value={id}>{name}</option>
                                        )
                                    )}
                                />
                                <Button className="ml-44 mt-4">Save</Button>
                            </form>
                        </div>
                        <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
                            <div className="flex flex-wrap">
                                <div className="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6">
                                    <div className="flex items-start">
                                        <div className="grow ml-6">
                                            <p className="font-bold mb-1">
                                                CPU
                                            </p>
                                            <p className="text-gray-500">
                                                {data.c_p_u_id != ""
                                                    ? props.options[0].cpu[
                                                          data.c_p_u_id - 1
                                                      ].cores
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.c_p_u_id != ""
                                                    ? props.options[0].cpu[
                                                          data.c_p_u_id - 1
                                                      ].frequency
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.c_p_u_id != ""
                                                    ? props.options[0].cpu[
                                                          data.c_p_u_id - 1
                                                      ].socket
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.c_p_u_id != ""
                                                    ? props.options[0].cpu[
                                                          data.c_p_u_id - 1
                                                      ].price
                                                    : "-"}{" "}
                                                бел. руб.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6">
                                    <div className="flex items-start">
                                        <div className="grow ml-6">
                                            <p className="font-bold mb-1">
                                                GPU
                                            </p>
                                            <p className="text-gray-500">
                                                {data.g_p_u_id != ""
                                                    ? props.options[0].gpu[
                                                          data.g_p_u_id - 1
                                                      ].frequency
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.g_p_u_id != ""
                                                    ? props.options[0].gpu[
                                                          data.g_p_u_id - 1
                                                      ].memory
                                                    : "-"}{" "}
                                                GB
                                            </p>
                                            <p className="text-gray-500">
                                                {data.g_p_u_id != ""
                                                    ? props.options[0].gpu[
                                                          data.g_p_u_id - 1
                                                      ].price
                                                    : "-"}{" "}
                                                бел. руб.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6">
                                    <div className="flex align-start">
                                        <div className="grow ml-6">
                                            <p className="font-bold mb-1">
                                                RAM
                                            </p>
                                            <p className="text-gray-500">
                                                {data.r_a_m_id != ""
                                                    ? props.options[0].ram[
                                                          data.r_a_m_id - 1
                                                      ].frequency
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.r_a_m_id != ""
                                                    ? props.options[0].ram[
                                                          data.r_a_m_id - 1
                                                      ].memory_size
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.r_a_m_id != ""
                                                    ? props.options[0].ram[
                                                          data.r_a_m_id - 1
                                                      ].memory_socket
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.r_a_m_id != ""
                                                    ? props.options[0].ram[
                                                          data.r_a_m_id - 1
                                                      ].price
                                                    : "-"}{" "}
                                                бел. руб.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6">
                                    <div className="flex align-start">
                                        <div className="grow ml-6">
                                            <p className="font-bold mb-1">
                                                Motherboard
                                            </p>
                                            <p className="text-gray-500">
                                                {data.motherboard_id != ""
                                                    ? props.options[0]
                                                          .motherboard[
                                                          data.motherboard_id -
                                                              1
                                                      ].socket
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.motherboard_id != ""
                                                    ? props.options[0]
                                                          .motherboard[
                                                          data.motherboard_id -
                                                              1
                                                      ].memory_socket
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.motherboard_id != ""
                                                    ? props.options[0]
                                                          .motherboard[
                                                          data.motherboard_id -
                                                              1
                                                      ].form_factor
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.motherboard_id != ""
                                                    ? props.options[0]
                                                          .motherboard[
                                                          data.motherboard_id -
                                                              1
                                                      ].price
                                                    : "-"}{" "}
                                                бел. руб.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6">
                                    <div className="flex align-start">
                                        <div className="grow ml-6">
                                            <p className="font-bold mb-1">
                                                Power
                                            </p>
                                            <p className="text-gray-500">
                                                {data.power_id != ""
                                                    ? props.options[0].power[
                                                          data.power_id - 1
                                                      ].power
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.power_id != ""
                                                    ? props.options[0].power[
                                                          data.power_id - 1
                                                      ].price
                                                    : "-"}{" "}
                                                бел. руб.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6">
                                    <div className="flex align-start">
                                        <div className="grow ml-6">
                                            <p className="font-bold mb-1">
                                                Memory
                                            </p>
                                            <p className="text-gray-500">
                                                {data.memory_id != ""
                                                    ? props.options[0].memory[
                                                          data.memory_id - 1
                                                      ].type
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.memory_id != ""
                                                    ? props.options[0].memory[
                                                          data.memory_id - 1
                                                      ].price
                                                    : "-"}{" "}
                                                бел. руб.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12 px-3 lg:px-6">
                                    <div className="flex align-start">
                                        <div className="grow ml-6">
                                            <p className="font-bold mb-1">
                                                Computer Case
                                            </p>
                                            <p className="text-gray-500">
                                                {data.computer_case_id != ""
                                                    ? props.options[0]
                                                          .computer_case[
                                                          data.computer_case_id -
                                                              1
                                                      ].form_factor
                                                    : "-"}
                                            </p>
                                            <p className="text-gray-500">
                                                {data.computer_case_id != ""
                                                    ? props.options[0]
                                                          .computer_case[
                                                          data.computer_case_id -
                                                              1
                                                      ].price
                                                    : "-"}{" "}
                                                бел. руб.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="ont-medium text-2xl">
                            <p>{CASEmessage}</p>
                            <p>{RAMmessage}</p>
                            <p>{CPUmessage}</p>
                        </div>
                    </div>
                </section>
            </div>
        </Authenticated>
    );
}
