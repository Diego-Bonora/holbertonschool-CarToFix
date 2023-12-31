import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import DataBoxBudget from './DataBoxBudget';
import axios from 'axios';
import FilterService from './FilterService';
import { useParams, useNavigate } from 'react-router-dom';
import DetailsModal from './DetailsModal';

export default function SpecificBudget() {

  const navigate = useNavigate();
  const onRedirect = (path) => {
    console.log('redireccion', path);
    navigate(path);
  }

  const { id } = useParams();
  console.log('ID de la ruta:', id);

  const info_vehiculo = { Marca: '', Modelo: '', Color: '' };
  const columns = ['title', 'description', 'done'];
  const columnsName = {
    title: 'Tipo de servicio',
    description: 'Detalles',
    done: 'Estado',
  }
  const [historyData, setHistoryData] = useState([]);
  const [datavehicle, setDatavehicle] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const [typeService, setTypeService] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [serviceIds, setServiceIds] = useState([]);


  const baseURL = 'http://127.0.0.1:5000';

  useEffect(() => {
    axios.get(`${baseURL}/api/v1/budget/${id}`)
      .then((res) => {
        const filterHistory = res.data.services.map(item => ({
          title: item.title,
          description: item.description,
          done: item.done,
          ids: item.id,
        }));

        setHistoryData(filterHistory);
        setInitialData(filterHistory);
        setFilteredData(filterHistory); // Inicializa los datos filtrados
        setInfo(filterHistory);
        console.log('historial', filterHistory);

        const vehicleData = {
          model: res.data.vehicle.model,
          color: res.data.vehicle.color,
          brand: res.data.brand,
          plate: res.data.vehicle.plate,
          vehicle_type: res.data.vehicle_type,
        };
        setDatavehicle(vehicleData);
        console.log('info de vehiculo', vehicleData);

        const serviceIdsArray = res.data.services.map(item => item.id);
        setServiceIds(serviceIdsArray);

        const uniqueTypes = ['Tipo de servicio', ...new Set(filterHistory.map(item => item.title))];
        setTypeService(uniqueTypes);
        console.log('tipos de servicio', uniqueTypes);
      })
      .catch((error) => {
        console.error('Errormio', error);
      });
  }, [id]);
  const [info, setInfo] = useState([]);
  const toggleDone = (index) => {
    console.log('infooo', info);
    console.log('histrydata', historyData);
    const serviceId = serviceIds[index];
    const currentState = historyData[index].done;
    if (currentState) {
      return;
    }
    const newState = !currentState;
    console.log('Estado actualizado:', newState);
    axios.put(`${baseURL}/api/v1/service/dwn/${serviceId}`, { done: newState })
      .then(response => {
        setHistoryData(prevData => {
          const updatedData = [...prevData];
          updatedData[index] = { ...updatedData[index], done: newState };
          return updatedData;
        });
        console.log('histrydata', historyData);
        // Actualiza también info con los datos filtrados
        setInfo(prevInfo => {
          const updatedInfo = [...prevInfo];
          updatedInfo[index] = { ...updatedInfo[index], done: newState };
          return updatedInfo;
        });
      })
      .catch(error => {
        console.error('Error done', error);
      });
  };

  const filterByType = (selectedType) => {
    setSelectedType(selectedType);

    if (selectedType === 'Tipo de servicio') {
      setFilteredData(initialData);
    } else {
      const filteredServiceData = initialData.filter(item => item.title === selectedType);
      setFilteredData(filteredServiceData);
      console.log('filtros', filteredServiceData);
    }
  };

  const [ShowModal, setShowModal] = useState(false)
  const [idss, setIdss] = useState();
  const handleButton = (ids) => {
    console.log(`boton: ${ids}`);
    setShowModal(true);
    setIdss(ids);
    console.log('loggg', ids);
  }

  return (
    <>
      <div className='w-screen h-screen bg-page_background'>
        <NavBar />
        {ShowModal && (
          <DetailsModal onClose={() => setShowModal(false)} ids={idss} />
        )}
        <div className='flex lg:ml-marg-4 ml-marg-1 mt-marg-3'>
          <div className='bg-tabla_service lg:w-info_detalles w-info_detalles_mini flex flex-wrap h-28 rounded-r-lg shadow-md shadow-gray-300'>
            <div className='border border-azul-oscuro flex flex-col justify-start w-3/12 h-full'>
              <div className={`bg-azul-oscuro flex items-center justify-center text-lg text-white ${datavehicle.vehicle_type ? 'py-2' : 'py-5'}  h-22/5`}>
                <p>{datavehicle.vehicle_type}</p>
              </div>

              <div className='bg-white flex items-center justify-center text-xl font-bold py-4 h-3/5'>
                <p>{datavehicle.plate}</p>
              </div>
            </div>
            <div className='lg:pl-10 pl-5 lg:w-9/12 w-2/5 h-28 flex-wrap'>
              <div className='text-black h-28  sm:flex flex-col flex-wrap hidden text-xl my-4 w-10/12'>
                <div className='py-2'>
                  Marca: <span className='font-bold'>{datavehicle.brand}</span>
                </div>
                <div className='pb-1'>
                  Modelo: <span className='font-bold'>{datavehicle.model}</span>
                </div>
                <div className='py-2'>
                  Color: <span className='font-bold'>{datavehicle.color}</span>
                </div>
              </div>
            </div>
          </div>
          <FilterService typeservice={typeService} filterByType={filterByType} selectedType={selectedType} classname="md:w-full w-1/2 ml-10" />
        </div>
        <div className='bg-tabla_service items-center h-info_history w-35 lg:mr-marg_detalles mr-marg-1 lg:ml-marg-4 ml-marg-1 mt-marg-3 flex flex-wrap rounded-lg justify-items-center justify-center shadow-md shadow-gray-300 h-30'>
          {filteredData.length === 0 ? (
            <div className="text-center text-gray-500 my-8 mx-2.25rem">
              <h2 className="text-xl font-bold">No hay datos disponibles</h2>
            </div>
          ) : (
            <div className='overflow-y-scroll h-full w-full ml-9'>
              <DataBoxBudget
                columns={columns}
                info={filteredData}
                toggleDone={toggleDone}
                SeeClick={handleButton}  // Asegúrate de pasar solo el serviceId aquí
                IdName='ids'       // Asegúrate de pasar el nombre correcto del prop para el ID
                onRedirect={onRedirect}
                columnsName={columnsName}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}