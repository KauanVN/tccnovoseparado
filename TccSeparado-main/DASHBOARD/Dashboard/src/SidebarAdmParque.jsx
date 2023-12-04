import React, { useState } from 'react';
import Modal from 'react-modal';
import { BsGrid1X2Fill, BsBoxArrowRight } from 'react-icons/bs';
import { FaTree, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'; // Ícones sugeridos para Eventos e Informações
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function SidebarAdmParque({ openSidebarToggle, OpenSidebar }) {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    window.location.href = 'http://localhost:5173/';
  };

  const closeModal = () => {
    setIsLogoutModalOpen(false);
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

      <Modal
        isOpen={isLogoutModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar Logout"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: '1000',
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: '#fff',
            borderRadius: '10px',
            outline: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Deseja realmente deslogar?</h2>
        <div className="modal-buttons">
          <button
            className="confirm-button"
            style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '10px 20px', marginRight: '10px', border: '1px solid #27ae60', borderRadius: '5px' }}
            onClick={confirmLogout}
          >
            Sim
          </button>
          <button
            className="cancel-button"
            style={{ backgroundColor: '#e74c3c', color: '#fff', padding: '10px 20px', border: '1px solid #c0392b', borderRadius: '5px' }}
            onClick={closeModal}
          >
            Não
          </button>
        </div>
      </Modal>
    </aside>
  );
}

export default SidebarAdmParque;
