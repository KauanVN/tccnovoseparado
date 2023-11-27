import React from 'react';
import { BsGrid1X2Fill, BsPeopleFill, BsMenuButtonWideFill, BsBoxArrowRight } from 'react-icons/bs';
import { FaTree, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'; // Ícones sugeridos para Eventos e Informações
import { useNavigate } from 'react-router-dom';

function SidebarAdmParque({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  const openDashboard = () => {
    navigate('/dashboardadmparque');
  };
  const openParque = () => {
    navigate('/eventos');
  };
  const openUsuario = () => {
    navigate('/informacoes');
  };
 

  const handleLogout = () => {
    const confirmLogout = window.confirm('Deseja realmente Deslogar?');
    if (confirmLogout) {
      localStorage.clear()
      window.location.href = 'http://localhost:5173/';
    }
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaTree className="icon_header" /> LINKED PARK
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item" onClick={openDashboard}>
          <BsGrid1X2Fill color="#fff" className="icon" /> Dashboard
        </li>
        <li className="sidebar-list-item" onClick={openParque}>
          <FaCalendarAlt color="#fff" className="icon" /> Eventos
        </li>
        <li className="sidebar-list-item" onClick={openUsuario}>
          <FaInfoCircle color="#fff" className="icon" /> Informações
        </li>
       
        <li className="sidebar-list-item" onClick={handleLogout}>
          <BsBoxArrowRight color="#fff" className="icon" /> Sair
        </li>
      </ul>
    </aside>
  );
}

export default SidebarAdmParque;
