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


function Informacoes({ data, handleEditEvento, handleDeleteEvento }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dataEdit, setDataEdit] = useState({});
  const [dados, setDados] = useState(data);

  useEffect(() => {
    setDados(data);
  }, [data]);

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
            <h3>Eventosasdas</h3>
            <button
              className="botaoNovoCadastro"
              onClick={onOpen}
            >
              NOVO CADASTRO
            </button>
          </div>

          <div className="tamanhoTabela">
            <Table className="tabela">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>TÍTULO</Th>
                  <Th>DESCRIÇÃO</Th>
                  <Th>DATA</Th>
                  <Th>ADM</Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {dados.map((item) => (
                  <Tr key={item.id} cursor="pointer">
                    <Td>{item.id}</Td>
                    <Td>{item.titulo}</Td>
                    <Td>{item.descricao}</Td>
                    <Td>{item.data}</Td>
                    <Td>{item.adm}</Td>
                    <Td>
                      <EditIcon
                        fontSize={20}
                        onClick={() => handleEditItem(item)}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleDeleteEvento(item.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </main>
      </div>

      <ModalCompEventos
        data={dados}
        setData={setDados}
        dataEdit={dataEdit}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default Informacoes;
