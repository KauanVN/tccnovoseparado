// Informacoes.jsx
import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import "../css/HomeAdm.css";
import Header from "../Header";
import SidebarAdmParque from "../SidebarAdmParque";
import ModalCompInformacoes from "./ModalCompInformacoes";

function Informacoes({ data, handleEditInformacoes, handleDeleteInformacoes }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const administrador = JSON.parse(localStorage.getItem("administrador"));
  const [dataEdit, setDataEdit] = useState(null);

  const handleEditItem = (item) => {
    setDataEdit(item);
    onOpen();
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  

  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <SidebarAdmParque openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <main className="main-container">
          <div className="main-title">
            <h3>Informações</h3>
          </div>

          <div className="tamanhoTabela">
            <Table className="tabela">
              <Thead>
                <Tr>
                  <Th>IDﾠﾠﾠ</Th>
                  <Th>Nomeﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ</Th>
                  <Th>Descriçãoﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ</Th>
                  <Th>Endereçoﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ</Th>
                  <Th>Admﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ</Th>
                  <Th p={0}>EDITARﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr cursor="pointer">
                  <Td>{administrador.parque.idLazer}</Td>
                  <Td>{administrador.parque.nome}</Td>
                  <Td>{administrador.parque.descricao}</Td>
                  <Td>{administrador.parque.endereco}</Td>
                  <Td>
                    <ul>
                      {administrador.parque.administradores.map((adm) => (
                        <li key={adm.idAdm}>{adm.email}</li>
                      ))}
                    </ul>
                  </Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => handleEditItem(administrador.parque)}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        </main>
      </div>

      <ModalCompInformacoes
        data={administrador.parque}
        dataEdit={dataEdit}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default Informacoes;
