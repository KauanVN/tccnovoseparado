import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
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
  const [dados, setDados] = useState([]);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const cancelRef = React.useRef();
  var administrador = JSON.parse(localStorage.getItem("administrador"));


  async function buscarEventos() {
    try {
      const token = await administrador.token;

      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/evento/"+administrador.parque.idLazer,
          {
            method: "GET",
            headers: headers,
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log("Dados da resposta: p", data);
          setDados(data);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  useEffect(() => {
    buscarEventos();
  }, []);


  const handleEditItem = (item) => {
    setDataEdit(item);
    onOpen();
  };

  const handleDeleteItem = async (id) => {

    try {
      const token = await administrador.token;
      const idLazer = await administrador.parque.idLazer

      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${token}`,
        };

        const response = await fetch(
          `https://tcc-production-e100.up.railway.app/api/evento/`+id,
          {
            method: "DELETE",
            headers: headers,

          }
        );
        if (response.status === 204) {
          alert("evento deletado!");
          window.location.reload();

          // Chame onUpdateData se precisar atualizar dados no componente pai

        } else {
          console.error("Erro ao deletar evento:", response.status);
        }
      }
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteEvento(dataEdit.id); // Chame a função para excluir o evento
    onClose(); // Feche a modal de edição após a exclusão
    setIsDeleteAlertOpen(false); // Feche a modal de confirmação de exclusão
  };

  const handleCancelDelete = () => {
    setIsDeleteAlertOpen(false);
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
                  <Th>Data de Inicio</Th>
                  <Th>Data de Término</Th>
                  <Th>Localização</Th>
                  <Th>Editar</Th>
                  <Th>Excluir</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dados && dados.map((item, index) => (
                  <Tr key={index} cursor="pointer">
                    <Td>{item.idEvento}</Td>
                    <Td>{item.nomeEvento}</Td>
                    <Td>{item.descricao}</Td>
                    <Td>{item.dataInicio}</Td>
                    <Td>{item.dataTermino}</Td>
                    <Td>{item.local}</Td>
                    <Td>
                      <EditIcon
                        fontSize={20}
                        onClick={() => handleEditItem(item)}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleDeleteItem(item.idEvento)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </main>
      </div>

      {/* Modal de Edição */}
      <ModalCompEventos
        data={dados}
        setData={setDados}
        dataEdit={dataEdit}
        isOpen={isOpen}
        onClose={() => onClose()}
      />

      {/* Modal de Confirmação de Exclusão */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCancelDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar Exclusão
            </AlertDialogHeader>

            <AlertDialogBody>
              Deseja realmente excluir este evento?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelDelete}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Eventos;
