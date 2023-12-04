import React from 'react'
import { useState, useEffect } from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsTreeFill }
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import SidebarAdmParque from '../SidebarAdmParque';
import Header from '../Header';
import '../App.css'




function DashboardAdmParque() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  var administrador = JSON.parse(localStorage.getItem("administrador"));
  const [eventos, setEventos] = useState([]);
  const [ativos, setAtivos] = useState(0);
  const [inativos, setInativos] = useState(0);
  const [totalInteressados, setTotalInteressados] = useState(0);
  const OpenSidebar = () => {

    setOpenSidebarToggle(!openSidebarToggle)
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const token = await administrador.token;

        if (token) {
          const headers = {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          };

          const response = await fetch(
            "https://tcc-production-e100.up.railway.app/api/evento/" +
              administrador.parque.idLazer,
            {
              method: "GET",
              headers: headers,
            }
          );

          if (response.status === 200) {
            const data = await response.json();
            console.log("Dados da resposta: ", data);
            setEventos(data);
          }
        }
      } catch (error) {
        console.error("Erro ao fazer a solicitação:", error);
      }
    }

    fetchData();
  }, []);
  
  useEffect(() => {
    let total = 0;
    eventos.forEach((evento) => {
      total += evento.usuarios.length;
    });
    setTotalInteressados(total);
  }, [eventos]);

  const contarEventos = (eventos) => {
    const ativosCount = eventos.filter((evento) => evento.status === 1).length;
    const inativosCount = eventos.filter((evento) => evento.status === 2).length;
    setAtivos(ativosCount);
    setInativos(inativosCount);
  };
  useEffect(() => {
    contarEventos(eventos);
  }, [eventos]);


    const data = [
        {
          name: 'Ativos',
          uv: ativos,
          pv: inativos,
        },
      ];
     

  return (
    <>
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <SidebarAdmParque openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>

      <main className='main-container'>
          <div className='main-title'>
              <h3>Dashboard</h3>
          </div>
  
          <div className='main-cards'>
              <div className='card'>
                  <div className='card-inner'>
                      <h3>Quantidade de Eventos ativos</h3>
                      <BsFillArchiveFill className='card_icon'/>
                  </div>
                  <h1>{ativos}</h1>
              </div>
              <div className='card'>
                  <div className='card-inner'>
                      <h3>Quantidade de Eventos passados</h3>
                      <BsFillGrid3X3GapFill className='card_icon'/>
                  </div>
                  <h1>{inativos}</h1>
              </div>
              <div className='card'>
                  <div className='card-inner'>
                      <h3>Total de Usuarios Interessados <strong>(geral)</strong></h3>
                      <BsFillGrid3X3GapFill className='card_icon'/>
                  </div>
                  <h1>{totalInteressados}</h1>
              </div>
          </div>
  
          <div className='charts'>
              <ResponsiveContainer width="100%" height="100%">
              <BarChart
              width={500}
              height={500}
              data={data}
              margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 5,
              }}
              >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                  </BarChart>
              </ResponsiveContainer>
  
             
  
          </div>
      </main>
    </div>
      
    </>
    
  )
}

export default DashboardAdmParque