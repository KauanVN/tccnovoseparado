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
import swal from "sweetalert";
import Header from "../Header";
import Sidebar from "../Sidebar";
import ModalComp from "./ModalComp";


function Parque({ data, handleDeleteParque }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [dataParque, setDataParque] = useState([]);
  const [showParque, setShowParque] = useState(true);
  const [showUsuario, setShowUsuario] = useState(false);
  const [showSolicitacao, setShowSolicitacao] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dados, setDados] = useState([]);

  var administrador = JSON.parse(localStorage.getItem("administrador"));

  // Defina um estado para rastrear as linhas da tabela marcadas como "correto"
  const [linhasCorretas, setLinhasCorretas] = useState([]);

  async function handleAddItem(novoItem) {
    if (showParque) {
      console.log(novoItem);
      try {
        // Obtém o token do administrador
        const token = await administrador.token;
        console.log("oi")

        if (token) {
          const headers = {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`,
          };
              
          const response = await fetch(
            "https://tcc-production-e100.up.railway.app/api/lazer",
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify(novoItem),
            }
          );

          if (response.status === 201) {
            const data = await response.json();
            console.log("Parque adicionado com sucesso:", data);

            setDataParque([...dataParque, data]);

            onClose();
          } else {
            console.error("Erro na adição do parque:", response.status);
          }
        }
      } catch (error) {
        console.error("Erro ao adicionar o parque:", error);
      }
    }
  }

  const handleEditParque = (parque) => {
    onOpen();
    setDataEdit(parque);
  };

  async function buscarParques() {
    try {
      const token = await administrador.token;

      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${token}`,
        };

        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/lazer",
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
    buscarParques();
  }, []);

  async function handleExcluirParque(id) {
    swal({
      text: "Tem certeza que quer excluir?",
      icon: "warning",
      buttons: ["Não", "Sim"],
    }).then(async (resposta) => {
      if (resposta) {
        try {
       

          const token = await administrador.token;

          if (token) {
            const headers = {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization": `Bearer ${token}`,
            };
            console.log("oi")
            const response = await fetch(
              `https://tcc-production-e100.up.railway.app/api/lazer/${id}`,
              {
                method: "DELETE",
                headers: headers,
              }
            );

            if (response.status === 200) {
              swal({
                text: "Excluído com sucesso",
                icon: "success",
                button: "Ok",
              });
              window.location.reload();
            } else {
              console.error("Erro na exclusão do parque:", response.status);
            }
          }
        } catch (error) {
          swal({
            text: "Erro na exclusão",
            icon: "error",
            button: "Ok",
          });
        }
      }
     
    });
    console.log("id" + id);
  }

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

        <main className="main-container">
          <div className="main-title">
            <h3>Parques</h3>
            <button
            className="botaoNovoCadastro"
            onClick={() => {
              onOpen();
            }}
          >
            NOVO CADASTRO
          </button>
          </div>

          {isOpen && (
            showParque ? (
              <ModalComp
                isOpen={isOpen}
                onClose={onClose}
                data={dataParque}
                setData={setDataParque}
                dataEdit={dataEdit}
                setDataEdit={setDataEdit}
                handleAddItem={handleAddItem}
              />
            ) : (
              showUsuario ? (
                <ModalCompUsuario
                  isOpen={isOpen}
                  onClose={onClose}
                  data={dataUsuario}
                  setData={setDataUsuario}
                  dataEdit={dataEdit}
                  setDataEdit={setDataEdit}
                  handleAddItem={handleAddItem}
                />
              ) : (
                <ModalCompSolicitacao
                  isOpen={isOpen}
                  onClose={onClose}
                  data={dataSolicitacao}
                  setData={setDataSolicitacao}
                  dataEdit={dataEdit}
                  setDataEdit={setDataEdit}
                  handleAddItem={handleAddItem}
                />
              )
            )
          )}
          <div className="tamanhoTabela">
            <Table className="tabela">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Nome</Th>
                  <Th>Descrição</Th>
                  <Th>Endereço</Th>
                  <Th>Latitude</Th>
                  <Th>Longitude</Th>
                  <Th>Categoria</Th>
                  <Th>Adm</Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th> {/* Novo cabeçalho para ícone "correto" */}
                  <Th p={0}></Th> {/* Novo cabeçalho para ícone "incorreto" */}
                </Tr>
              </Thead>
              <Tbody>
                {dados.map((item, index) => (
                  <Tr key={index} cursor="pointer">
                    <Td>{item.idLazer}</Td>
                    <Td>{item.nome}</Td>
                    <Td>{item.descricao}</Td>
                    <Td>{item.endereco}</Td>
                    <Td>{item.latitude}</Td>
                    <Td>{item.longetude}</Td>
                    <Td>{item.categoria}</Td>
                    <Td>{item.admin}</Td>
                    <Td p={0}>
                      <EditIcon
                        fontSize={20}
                        onClick={() => handleEditParque(item)}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleExcluirParque(item.idLazer)}
                      />
                    </Td>
                    <Td p={0}>
                  <img
                    className="imagemParque"
                    src={item.imagem}
                    alt={`Imagem de ${item.name}`}
                  />
                  </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </main>
      </div>
    </>
  );
}

export default Parque;
