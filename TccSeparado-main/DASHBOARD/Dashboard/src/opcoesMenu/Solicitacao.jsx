import React, { useState, useEffect } from "react";
import { useDisclosure, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalCompSolicitacao from "./ModalCompSolicitacao";
import ModalComp from "./ModalCompParque";
import "../css/HomeAdm.css";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import emailjs from "emailjs-com";

function Solicitacao({ data, handleEditSolicitacao, handleDeleteSolicitacao }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [dataParque, setDataParque] = useState([]);
  const [showParque, setShowParque] = useState(true);
  const [showUsuario, setShowUsuario] = useState(false);
  const [showSolicitacao, setShowSolicitacao] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dados, setDados] = useState([]);
  var administrador = JSON.parse(localStorage.getItem("administrador"));

  // Configurações do EmailJS (substitua com suas informações)
  const emailjsConfig = {
    serviceId: "gmailMessage",
    templateId: "template_9vwh41m",
    userId: "uyCZcUA5NodsSYL-X", // Substitua com seu user ID do EmailJS
  };

  async function adicionarAdm(dadosAdm) {
    try {
      const token = await administrador.token;
      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch("https://tcc-production-e100.up.railway.app/api/administrador", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            email: dadosAdm.email,
            senha: dadosAdm.senha,
            lazer: {
              idLazer: dadosAdm.lazer.idLazer,
            },
          }),
        });

        if (response.status === 201) {
          console.log(dadosAdm);
          alert("administrador adicionado com sucesso");

          // Enviar e-mail de aprovação
          enviarEmailAprovacao(dadosAdm.email);
          atualizaStatus(dadosAdm);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  async function enviarEmailAprovacao(email) {
    const templateParams = {
      to_email: email,
      message: "Sua solicitação foi recusada.",
    };

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.userId
      )
      .then((response) => {
        console.log("E-mail enviado com sucesso:", response);
      })
      .catch((error) => {
        console.error("Erro ao enviar e-mail:", error);
      });
  }

  async function recusarSolicitacao(dadosAdm) {
    try {
      const token = await administrador.token;
      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/solicitacoes",
          {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({
              idSolicitacoes: dadosAdm.idSolicitacoes,
              email: dadosAdm.email,
              senha: dadosAdm.senha,
              status: 2,
              lazer: {
                idLazer: dadosAdm.lazer.idLazer,
              },
            }),
          }
        );

        if (response.status === 200) {
          alert("Solicitação recusada com sucesso");
          enviarEmailRecusa(dadosAdm.email);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  async function enviarEmailRecusa(email) {
    const templateParams = {
      to_email: email,
      message: "Sua solicitação foi recusada.",
    };

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.userId
      )
      .then((response) => {
        console.log("E-mail de recusa enviado com sucesso:", response);
      })
      .catch((error) => {
        console.error("Erro ao enviar e-mail de recusa:", error);
      });
  }

  async function buscarSolicitacao() {
    try {
      const token = await administrador.token;

      if (token) {
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/solicitacoes",
          {
            method: "GET",
            headers: headers,
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setDados(data);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  useEffect(() => {
    buscarSolicitacao();
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

      <main className="main-container">
        <div className="main-title">
          <h3>Solicitação</h3>
        </div>
        <div className="tamanhoTabela">
          <Table className="tabela">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Email do adm</Th>
                <Th>Status</Th>
                <Th>Nome do parque</Th>
                <Th>ID do parque</Th>
                <Th>Aceitar</Th>
                <Th>Recusar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dados.map((item, index) => (
                <Tr key={index} cursor="pointer">
                  <Td>{item.idSolicitacoes}</Td>
                  <Td>{item.email}</Td>
                  <Td>
                    {item.status === 0
                      ? "Em andamento"
                      : item.status === 1
                      ? "Aprovada"
                      : item.status === 2
                      ? "Reprovada"
                      : "N/D"}
                  </Td>
                  <Td>{item.lazer.nome}</Td>
                  <Td>{item.lazer.idLazer}</Td>
                  <Td>
                    <CheckIcon
                      fontSize={20}
                      onClick={() => adicionarAdm(item)}
                    />
                  </Td>
                  <Td p={0}>
                    <CloseIcon
                      fontSize={20}
                      onClick={() => recusarSolicitacao(item)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </main>
    </div>
  );
}

export default Solicitacao;
