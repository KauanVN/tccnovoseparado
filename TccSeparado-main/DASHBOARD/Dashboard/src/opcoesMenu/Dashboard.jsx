import React from 'react'
import { useState, useEffect } from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsTreeFill }
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import Sidebar from '../Sidebar';
import Header from '../Header';
import '../App.css'




function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [usuarios, setUsuarios] = useState([]);


  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [parques, setParques] = useState([]);

  useEffect(() => {
    // Coloque aqui a lógica para buscar os parques da API
    buscarParques();
  }, []);

  // Função para buscar os parques
  var administrador = JSON.parse(localStorage.getItem("administrador"));
  async function buscarParques() {
    try {
      const response = await fetch(
        "https://tcc-production-e100.up.railway.app/api/lazer",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setParques(data);
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }

  // Filtrar os parques que não têm administradores associados
  const parquesSemAdmin = parques.filter(parque => !parque.administradores || parque.administradores.length === 0);

  // Contar a quantidade de parques sem administradores
  const quantidadeParquesSemAdmin = parquesSemAdmin.length;

  const contarParquesComAdmin = () => {
    let parquesComAdmin = 0;

    parques.forEach(parque => {
      if (parque.administradores && parque.administradores.length > 0) {
        parquesComAdmin++;
      }
    });

    return parquesComAdmin;
  };

  const totalParquesComAdmin = contarParquesComAdmin();
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
          setUsuarios(data);
        }
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
  }
  useEffect(() => {
    buscarUsuarios();
  }, []);

  const totalUsuarios = usuarios.length;



  const dadosParques = parques.map((parque, index) => ({
    name: `Parque ${index + 1}`,
    quantidadeAdministradores: parque.administradores
      ? parque.administradores.length
      : 0,
  }));

  const dadosUsuarios = usuarios.map((usuario, index) => ({
    name: `Usuário ${index + 1}`,
    idade: usuario.idade || 0, // Considerando 'idade' como um atributo dos usuários
  }));

    const data = [
        {

          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>

      <main className='main-container'>
          <div className='main-title'>
              <h3>Dashboard</h3>
          </div>
  
          <div className='main-cards'>
              <div className='card'>
                  <div className='card-inner'>
                      <h3>Total de Usuários</h3>
                      <BsFillArchiveFill className='card_icon'/>
                  </div>
                  <h1>{totalUsuarios}</h1>
              </div>
              <div className='card'>
                  <div className='card-inner'>
                      <h3>Parques sem Administradores</h3>
                      <BsFillGrid3X3GapFill className='card_icon'/>
                  </div>
                  <h1>{quantidadeParquesSemAdmin}</h1>
              </div>
              <div className='card'>
                  <div className='card-inner'>
                      <h3>Parques com Administradores</h3>
                      <BsPeopleFill className='card_icon'/>
                  </div>
                  <h1>{totalParquesComAdmin}</h1>
              </div>
          </div>
  
          <div className='charts'>
          <ResponsiveContainer width='100%' height={300}>
              <BarChart
                data={dadosParques}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='quantidadeAdministradores' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
  
  
          </div>
      </main>
    </div>
      
    </>
    
  )
}

export default Dashboard