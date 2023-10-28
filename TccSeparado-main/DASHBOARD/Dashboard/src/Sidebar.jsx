import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import { useNavigate } from "react-router-dom";


function Sidebar({openSidebarToggle, OpenSidebar}) {
    const navigate = useNavigate();

    const openDashboard = () => {
        navigate("/dashboard")
    }
    const openParque = () => {
        navigate("/parque")
    }
    const openUsuario = () => {
        navigate("/usuario")
    }
    const openSolicitacao = () => {
        navigate("/solicitacao")
    }
    const openChat = () => {
        navigate("/chat")
    }

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> LINKED PARK
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item' onClick={openDashboard}>
                    <BsGrid1X2Fill color='#fff' className='icon'/> Dashboard
            </li>
            <li className='sidebar-list-item' onClick={openParque}>
                    <BsFillArchiveFill color='#fff' className='icon'/> Parques
            </li>
            <li className='sidebar-list-item' onClick={openUsuario}>
                    <BsFillGrid3X3GapFill color='#fff' className='icon'/> Usuário     
            </li>
            <li className='sidebar-list-item' onClick={openSolicitacao}>
                    <BsPeopleFill color='#fff' className='icon'/> Solicitações
            </li>
            <li className='sidebar-list-item'>
                    <BsListCheck color='#fff' className='icon'/> Inventory
            </li>
            <li className='sidebar-list-item' onClick={openChat}>
                    <BsMenuButtonWideFill color='#fff' className='icon'/> Chat
            </li>
            <li className='sidebar-list-item'>
                    <BsFillGearFill color='#fff' className='icon'/> Deslogar
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar