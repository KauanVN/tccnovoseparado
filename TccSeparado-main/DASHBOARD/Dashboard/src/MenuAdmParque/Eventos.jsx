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
import ModalCompEventos from "./ModalCompEventos";

function Eventos({ data, handleEditEvento, handleDeleteEvento }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataEdit, setDataEdit] = useState({});
  const [dados, setDados] = useState(data);

  useEffect(() => {
    setDados(data);
  }, [data]);

  const eventos = [
    // Array de objetos representando eventos
    {
      id: 1,
      nome: "	Casa de Cultura do Tatuapé",
      descricao: "É um lugar feito em uma construção histórica e hoje abriga um centro cultural com atividades educativas e exposições. Recomendado: Todas as idades / Horários: 9h às 17h",
      data: "11/11/2023",
      localizacao: "R. Guabijú, 49 - Tatuapé, São Paulo - SP, 03077100",
      adm: "Sim",
    },
    {
      id: 2,
      nome: "Parque Vila do Rodeio",
      descricao: "Criado como uma forma de preservar as nascentes do Córrego do Rodeio, na Zona Leste da capital, o Parque Vila do Rodeio recebe diversos visitantes que estão em busca de lazer e diversão na cidade.",
      data: "22/11/2023",
      localizacao: "R. Igarapé da Bela Aurora, 342 - Conj. Hab. Inacio Monteiro, São Paulo - SP, 08472-200",
      adm: "Sim",
    },
    {
      id: 3,
      nome: "Parque da Consciência Negra",
      descricao: "Localizado na Cidade Tiradentes, Zona Leste da capital paulista e foi criado para preservar as nascentes do Córrego Itaquera e da mata em estágio de regeneração. Recomendado: Todas as idades / Horários: 6h às 18h",
      data: "03/012/2023",
      localizacao: "R. José Francisco Brandão, 320 - Cidade Tiradentes, São Paulo - SP",
      adm: "Sim",
    },
  ];

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
            <h3>Eventos</h3>
            <button className="botaoNovoCadastro" onClick={() => onOpen()}>
              NOVO CADASTRO
            </button>
          </div>

          <div className="tamanhoTabela">
            <Table className="tabela">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Descrição</Th>
                  <Th>Data</Th>
                  <Th>Localização</Th>
                  <Th>Adm</Th>
                  <Th>Editar</Th>
                  <Th>Excluir</Th>
                </Tr>
              </Thead>
              <Tbody>
                {eventos.map((item) => (
                  <Tr key={item.id} cursor="pointer">
                    <Td>{item.id}</Td>
                    <Td>{item.nome}</Td>
                    <Td>{item.descricao}</Td>
                    <Td>{item.data}</Td>
                    <Td>{item.localizacao}</Td>
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
        onClose={() => onClose()}
      />
    </>
  );
}

export default Eventos;
