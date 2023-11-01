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


  const [dataEdit, setDataEdit] = useState({}); // Novo estado para dados editados
  const [dados, setDados] = useState(data); // Estado para armazenar os dados

  useEffect(() => {
    setDados(data); // Atualize os dados quando a propriedade data mudar
  }, [data]);

  const handleEditItem = (item) => {
    setDataEdit(item);
    useDisclosure(true);
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
            <button
            className="botaoNovoCadastro"
            onClick={() => {
              onOpen();
            }}
          >
            NOVO CADASTRO
          </button>
          </div>

        
          <div className="tamanhoTabela">
        <Table className="tabela">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>nome</Th>
              <Th>Descrição</Th>
              <Th>endereco</Th>
              <Th>Adm</Th>
              <Th p={0}></Th>
              <Th p={0}></Th>
            </Tr>
          </Thead>
          <Tbody>
          
              <Tr  cursor="pointer">
                <Td>{administrador.select.lazer.idLazer}</Td>
                <Td>{administrador.select.lazer.nome}</Td>
                <Td>{administrador.select.lazer.descricao}</Td>
                <Td>{administrador.select.lazer.endereco}</Td>
                <Td>{administrador.select.lazer.idLazer}</Td>
                <Td p={0}>
                  <EditIcon
                    fontSize={20}
                    onClick={() => handleEditItem()} // Use handleEditItem
                  />
                </Td>
                <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => handleDeleteInformacoes()}
                  />
                </Td>
              </Tr>
          </Tbody>
        </Table>
      </div>
        </main>
      </div>

      
      {/* Renderize o ModalCompInformacoes com os estados adequados */}
      <ModalCompInformacoes
        data={dados}
        setData={setDados}
        dataEdit={dataEdit}
        isOpen={isOpen}
      />
    </>
  );
}

export default Informacoes;
