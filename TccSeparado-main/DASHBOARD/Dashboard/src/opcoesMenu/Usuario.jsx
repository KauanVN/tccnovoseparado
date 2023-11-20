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
import ModalComp from "./ModalCompParque";
import Header from "../Header";
import Sidebar from "../Sidebar";

function Usuario({ data, handleEditUsuario, handleDeleteUsuario }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataParque, setDataParque] = useState([]); // Dados do Parque
  const [dataUsuario, setDataUsuario] = useState([]); // Dados do Usuário
  const [dataSolicitacao, setDataSolicitacao] = useState([]); // Dados da Solicitação
  const [dataEdit, setDataEdit] = useState({});
  const [showParque, setShowParque] = useState(true);
  const [showUsuario, setShowUsuario] = useState(false);
  const [showSolicitacao, setShowSolicitacao] = useState(false);
  const [dados, setDados] = useState([]);


  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  
  var administrador = JSON.parse(localStorage.getItem("administrador"));
  async function buscarUsuarios() {
    try {
  
      const token = await administrador.token;
  
      if (token) {
     
        const headers = {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        };
  
        const response = await fetch(
          "https://tcc-production-e100.up.railway.app/api/usuario",
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
    buscarUsuarios();
  }, []);
  
  return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>

      <main className='main-container'>
        <div className='main-title'>
            <h3>Usuários</h3>
        </div>

        <div className="tamanhoTabela">
        <Table className="tabela">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Emailﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ</Th>
              <Th>Status da contaﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ</Th>
              <Th p={0}>Excluirﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dados.map((usuario, index) => (
              <Tr key={index} cursor="pointer">
                <Td>{usuario.idUsuario}</Td>
                <Td>{usuario.email}</Td>
                {usuario.accountNonExpired
                  ? "Conta Expirada: Não"
                  : "Conta Expirada: Sim"}
                <Td p={0}>
                  <DeleteIcon
                    fontSize={20}
                    onClick={() => handleDeleteUsuario(usuario.idUsuario)}
                    data-email={usuario.email}
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

export default Usuario;
