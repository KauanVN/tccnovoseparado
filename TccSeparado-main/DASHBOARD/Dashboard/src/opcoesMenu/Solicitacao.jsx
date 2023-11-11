import React, { useState, useEffect } from "react";
import { useDisclosure, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import ModalCompSolicitacao from "./ModalCompSolicitacao";
import "../css/HomeAdm.css";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import emailjs from 'emailjs-com';

function Solicitacao({ data, handleEditSolicitacao, handleDeleteSolicitacao }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dados, setDados] = useState([]);
  var administrador = JSON.parse(localStorage.getItem("administrador"));

  // Função para enviar e-mail de aprovação
  const sendEmailAprovacao = (toEmail) => {
    const templateParams = {
      to_email: toEmail,
      subject: "Solicitação Aprovada",
      message: "Sua solicitação foi aprovada. Você agora é um administrador!",
    };

    // Substitua 'SEU_SERVICE_ID', 'SEU_TEMPLATE_ID' e 'SEU_USER_ID' pelos seus dados do EmailJS
    emailjs.send('service_02nhlch', 'template_sblgj1u', templateParams, 'cXjdFwYdSBazrrS7q')
      .then((response) => {
        console.log('E-mail enviado com sucesso:', response);
      })
      .catch((error) => {
        console.error('Erro ao enviar e-mail:', error);
      });
  };

  // Função para recusar (pode chamar esta função ao clicar em Recusar)
  const recusarSolicitacao = (toEmail) => {
    const templateParams = {
      to_email: toEmail,
      subject: "Solicitação Recusada",
      message: "Sua solicitação foi recusada. Infelizmente, não foi possível aprovar neste momento.",
    };

    // Substitua 'SEU_SERVICE_ID', 'SEU_TEMPLATE_ID' e 'SEU_USER_ID' pelos seus dados do EmailJS
    emailjs.send('service_02nhlch', 'template_sblgj1u', templateParams, 'cXjdFwYdSBazrrS7q')
      .then((response) => {
        console.log('E-mail enviado com sucesso:', response);
      })
      .catch((error) => {
        console.error('Erro ao enviar e-mail:', error);
      });
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
          sendEmailAprovacao(dadosAdm.email);
          // Atualizar o status aqui, se necessário
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
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
  };

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
                      onClick={() => sendEmailAprovacao(item.email)}
                    />
                  </Td>
                  <Td p={0}>
                    <CloseIcon
                      fontSize={20}
                      onClick={() => recusarSolicitacao(item.email)}
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
