import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

export default function ReadyComputers(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Мои сборки
                </h2>
            }
        >
            <div>
                <div></div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Комплектующие
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Инфо
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Цена
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.builds.map(
                                        ({
                                            id,
                                            cpu,
                                            gpu,
                                            ram,
                                            motherboard,
                                            power,
                                            compcase,
                                            memory,
                                        }) => (
                                            <tr className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {cpu.name}
                                                    <br />
                                                    {gpu.name}
                                                    <br />
                                                    {ram.name}
                                                    <br />
                                                    {motherboard.name}
                                                    <br />
                                                    {memory.name}
                                                    <br />
                                                    {power.name}
                                                    <br />
                                                    {compcase.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    CPU: {cpu.frequency},{" "}
                                                    {cpu.cores}, {cpu.socket}
                                                    <br />
                                                    GPU:{gpu.frequency},{" "}
                                                    {gpu.memory} GB
                                                    <br />
                                                    RAM: {ram.frequency},{" "}
                                                    {ram.memory_size},{" "}
                                                    {ram.memory_socket}
                                                    <br />
                                                    Motherboard:
                                                    {
                                                        motherboard.form_factor
                                                    },{" "}
                                                    {motherboard.memory_socket},{" "}
                                                    {motherboard.socket}
                                                    <br />
                                                    Memory:{memory.type}
                                                    <br />
                                                    Power:{power.power}
                                                    <br />
                                                    Computer Case:
                                                    {compcase.form_factor}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {cpu.price +
                                                        gpu.price +
                                                        ram.price +
                                                        motherboard.price +
                                                        power.price +
                                                        compcase.price +
                                                        memory.price}{" "}
                                                    бел.руб
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"></td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
