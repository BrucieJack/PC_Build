import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Guest from "@/Layouts/Guest";
import { get } from "lodash";

export default function Welcome(props) {
    console.log(props);

    const renderRedirect = () => {
        if (props.auth.user === null) {
            post(route("register"));
        } else if (props.auth.user.email === "admin@gmail.com") {
            post(route("admin.create"));
        } else {
            post(route("comp-build.create"));
        }
    };

    return (
        <div onLoad={() => renderRedirect()}>
            <button
                className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150"
                onClick={() => renderRedirect()}
            ></button>
        </div>
    );
}
