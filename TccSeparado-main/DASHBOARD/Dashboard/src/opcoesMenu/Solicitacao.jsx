import React,{useState,useEffect} from "react";
import {
  useDisclosure,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalCompSolicitacao from "./ModalCompSolicitacao";
import ModalComp from "./ModalComp";
import "../css/HomeAdm.css"
import Header from "../Header";
import Sidebar from "../Sidebar";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"; // Importe os ícones CheckIcon e CloseIcon


function Solicitacao({ data, handleEditSolicitacao, handleDeleteSolicitacao }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [dataEdit, setDataEdit] = useState({});
  const [dataParque, setDataParque] = useState([]); // Dados do Parque
  const [showParque, setShowParque] = useState(true);
  const [showUsuario, setShowUsuario] = useState(false);
  const [showSolicitacao, setShowSolicitacao] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dados, setDados] = useState([]);
  var administrador = JSON.parse(localStorage.getItem("administrador"));
  
  async function adicionarAdm(dadosAdm){

    try{
      const token = await administrador.token
      if (token) {
     
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/administrador",
          {
            method: "POST", 
            headers: headers,
            body: JSON.stringify({
              "email": dadosAdm.email,
              "senha": dadosAdm.senha,
              "lazer":{
                "idLazer":dadosAdm.lazer.idLazer
              }
            })
          }
        );

        if (response.status === 201) {
          console.log(dadosAdm)
          alert("administrador adicionado com sucesso")
          atualizaStatus(dadosAdm)
        
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
    }

    async function atualizaStatus(dadosAdm){

      try{
        const token = await administrador.token
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
                "idSolicitacoes": dadosAdm.idSolicitacoes,
                "email": dadosAdm.email,
                "senha": dadosAdm.senha,
                "status":1,
                "lazer":  {
                  "idLazer": dadosAdm.lazer.idLazer
              }}),
            }
          );
  
          if (response.status === 200) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.error("Erro ao fazer a solicitação:", error);
      }
      }

      async function recusarSolicitacao(dadosAdm){

        try{
          const token = await administrador.token
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
                  "idSolicitacoes": dadosAdm.idSolicitacoes,
                  "email": dadosAdm.email,
                  "senha": dadosAdm.senha,
                  "status":2,
                  "lazer":  {
                    "idLazer": dadosAdm.lazer.idLazer
                }}),
              }
            );
    
            if (response.status === 200) {
              alert("solicitacao Recusada com sucesso ")
              window.location.reload();
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
          console.log(setDados(data))

        
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
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>

      <main className='main-container'>
          <div className='main-title'>
              <h3>Solicitação</h3>
          </div>
        <div className="tamanhoTabela">
        <Table className="tabela">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Email do adm</Th>
              <Th>Status</Th>
              <Th>nome do parque</Th>
              <Th>ID do parque</Th>
              <Th>aceitar</Th>
              <Th>recusar</Th>
            </Tr>
          </Thead>
          <Tbody>
  {dados.map((item, index) => (
    <Tr key={index} cursor="pointer">
      <Td>{item.idSolicitacoes}</Td>
      <Td>{item.email }</Td>
      <Td>
        {item.status === 0 ? 'Em andamento' : item.status === 1 ? 'Aprovada' : item.status === 2 ? 'Reprovada' : 'N/D'}
      </Td>      
      <Td>{item.lazer.nome}</Td>
      <Td>{item.lazer.idLazer}</Td>
                    <Td>
                      <CheckIcon
                        fontSize={20}
                        onClick={() => adicionarAdm(item)
                        }
                      />
                    </Td>
                    <Td p={0}>
                      <CloseIcon
                        fontSize={20}
                        onClick={() => 
                            recusarSolicitacao(item)
                        }
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
export default Solicitacao;
