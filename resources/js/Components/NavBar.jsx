import React from 'react';
import NavLink from "./NavLink"


export default function NavBar() {
    return (
        <div>
            <NavLink href={route("pc/create")}>
                Сборка ПК
            </NavLink>
            <NavLink  href={route("pc/ready")}>
                Готовые сборки
            </NavLink>
            <NavLink  href={route("pc/mypc")}>
                Мои сборки
            </NavLink>
            <NavLink  href={route("pc/login")}>
                Авторизация    
            </NavLink>
        </div>
    );
}