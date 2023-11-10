import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBox from './DataBox';
import ButtonService from './ButtonService';
import FilterService from './FilterService';
import { FaTh } from 'react-icons/fa';
import axios from 'axios';
import FilterActive from './filterActive';
import { useNavigate } from 'react-router-dom';

export default function VehicleHistory() {

  const navigate = useNavigate();
  const onRedirect = (path) => {
    console.log('redireccion', path);
    navigate(path);
  }

  const columns = ['vehPlate', 'title', 'created'];
  const [serviceData, setServiceData] = useState([]); {/* datos de los servicios*/}
  const [typeservice, settypeService] = useState([]); {/*  por tipo */}
  const [Initial, setInitial] = useState(); {/*  copia de los datos */}
  const [selectedType, setSelectedType] = useState(''); {/* para el filtro y el tipo de servicio que se selecciona*/}

  const [activeFilter, setActiveFilter] = useState('all'); // Filtro para servicios activos o no activos
  let filteredServiceData;

  const usrId = 'ca2841f8-0773-4b09-b944-1947e9913803';
  const baseURL = 'http://127.0.0.1:5000';

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/service/user/${usrId}`)
      .then((res) => {
        console.log('respuesta', res.data);
        const filteredData = res.data.map(item => ({
          vehPlate: item.vehPlate,
          title: item.title,
          created: item.created,
          active: item.active,
          vehId: item.vehId,
        }));

        setServiceData(filteredData);
        setInitial(filteredData); {/* Guarda la copia */} 

        console.log('Servicios', filteredData);

        {/*tipo de servicio*/}
        const uniqueTypes = ['Tipo de servicio',...Array.from(new Set(filteredData.map(item => item.title)))];
        settypeService(uniqueTypes);
        console.log('tipos de servicio', uniqueTypes);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [usrId]);

  {/*POR SERVICIO*/}
  const filterByType = (selectedType) => {
    setSelectedType(selectedType);
    
    if (selectedType === 'Tipo de servicio') {
      setServiceData(Initial);
    } else {
      const filteredServiceData = Initial.filter(item => item.title === selectedType);
      setServiceData(filteredServiceData);
    }
  };
  
  {/* filtro para que cambie de acttivo a finalizdo*/}
  const handleFilterChange = (event) => {
    setActiveFilter(event.target.value);
  };

    {/* por estado */}
  if (activeFilter === 'all') {
    filteredServiceData = serviceData;
  } else {
    filteredServiceData = serviceData.filter(item => item.active === (activeFilter === 'true'));
  }

  const handleButton = (id) => {
    console.log(`boton: ${id}`)
    navigate(`/details/${id}`);
  }


  return (
    <>
      <div className='w-screen h-screen bg-page_background'>
        <NavBar />
        <div className='xl:mr-72 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-16 font-bold text-black flex items-center justify-between'>
          <h1 className='text-7xl font-black'>Servicios</h1>
          <div className='flex-1 flex h-20 items-center space-x-4 justify-end'>
            <FilterActive activeFilter={activeFilter} handleFilterChange={handleFilterChange}/>
            <FilterService typeservice={typeservice} filterByType={filterByType} selectedType={selectedType} classname="md:w-full w-2/5"/>
            <FaTh className='h-9 w-9'/>
          </div>
        </div>
        {/* Info del historial */}
        <div className='bg-tabla_service items-center md:h-info_history xl:info_history_3 h-info_history_2 lg:mr-marg-5 mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-400 h-30'>
          <div className='hidden:overflow-y-scroll h-full w-full ml-20'>
            <DataBox columns={columns} info={filteredServiceData} 
            SeeClick={handleButton} IdName='vehId'
            onRedirect={onRedirect}/>
          </div>
          <ButtonService />
        </div>
      </div>
    </>
  );
}