import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function ReadyComputers(props) {
    return (
        <div>
        <div>
        {props.builds.map(({cpu, gpu, ram, motherboard, power, compcase, memory}) => (
            <div>
                <div>
                    <h2>{cpu.name}</h2>
                    <h2>{gpu.name}</h2>
                    <h2>{ram.name}</h2>
                    <h2>{motherboard.name}</h2>
                    <h2>{power.name}</h2>
                    <h2>{compcase.name}</h2>
                    <h2>{memory.name}</h2>
                </div>
                <div>
                    <h2>{cpu.price + gpu.price + ram.price + motherboard.price + power.price + compcase.price + memory.price}</h2>
                </div>
            </div>
         ))}
        </div>
    </div>
    );
}