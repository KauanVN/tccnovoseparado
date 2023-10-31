import React from 'react';
import { BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsBoxArrowRight, BsFillGearFill, BsFileText } from 'react-icons/bs'; // Substituí BsFileEarmarkText por BsFileText
import { FaTree } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();

  const openDashboard = () => {
    navigate('/dashboard');
  };
  const openParque = () => {
    navigate('/parque');
  };
  const openUsuario = () => {
    navigate('/usuario');
  };
  const openSolicitacao = () => {
    navigate('/solicitacao');
  };
  const openChat = () => {
    navigate('/chat');
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
        <FaTree color="#fff" className="icon" /> Parques
        </li>
        <li className="sidebar-list-item" onClick={openUsuario}>
          <BsPeopleFill color="#fff" className="icon" /> Usuário
        </li>
        <li className="sidebar-list-item" onClick={openSolicitacao}>
          <BsFileText color="#fff" className="icon" /> Solicitações
        </li>
        <li className="sidebar-list-item">
          <BsListCheck color="#fff" className="icon" /> Inventory
        </li>
        <li className="sidebar-list-item" onClick={openChat}>
          <BsMenuButtonWideFill color="#fff" className="icon" /> Chat
        </li>
        <li className="sidebar-list-item" onClick={handleLogout}>
          <BsBoxArrowRight color="#fff" className="icon" /> Sair
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
