/* eslint-disable react/prop-types */
import React from 'react';
import { useEffect } from 'react';

export default function DataBoxBudget({ info, columns, SeeClick, IdName, onRedirect, toggleDone, columnsName, renderCell }) {

  return (

    <table className="text-black mb-5 mt-14 w-full ">
      <thead>
        <tr className="w-screen bg-gris-footer">
          {columns.map((column, index) => (
            <th
              key={index}
              className={`p-3 align-middle flex-row justify-around md:text-lg text-base
                ${index === 0 ? 'rounded-tl-2xl rounded-bl-2xl border-r-2' : index === columns.length - 1 ? 'rounded-tr-2xl rounded-br-2xl border-l-2' : ''}`}
            >
              {columnsName[column]}
            </th>
          ))}

        </tr><div className='mb-3'></div>
      </thead>
      <tbody>
        {info.map((data, index) => (
          <><tr
            key={index}
          >
            {columns.map((column, indexcol) => (
              <td
                key={indexcol}
                className={`p-2 sm:px-8 px-5 align-middle  md:text-base text-sm text-center
                ${indexcol === 0 ? 'rounded-tl-2xl rounded-bl-2xl bg-gris-footer border-r-2' : indexcol === columns.length - 1 ? 'rounded-tr-2xl rounded-br-2xl bg-gris-footer border-l-2' : ''} 
                ${indexcol === Math.floor(columns.length / 2) ? 'bg-gris-footer' : ''}
                `}
              >
                {renderCell ? renderCell(column, data) : column !== 'done' ? data[column] : (
                  <>
                    <div className='flex items-center'>
                      <button
                        type="button"
                        className={`p-px mr-3 w-4 h-4 border rounded-sm  ${data[column] ? 'bg-orange-oscuro' : 'bg-white border border-black'}`}
                        onClick={() => toggleDone(index)}
                      >
                        {/* Contenido del botón */}
                      </button>
                      {data[column] ? 'Finalizado' : 'Pendiente'}
                    </div>
                    {console.log('Estado actualizado en renderCell:', data[column])}
                  </>
                )}
              </td>
            ))}
            <td className="p-2 sm:px-8 px-5 align-middle md:text-md text-sm">
              <button type="button" className="bg-orange-claro hover:bg-orange-oscuro text-white p-px md:w-14 w-10 items-center"
                onClick={() => SeeClick(data[IdName], onRedirect)}>
                Ver
              </button>
            </td>
          </tr><div className='mb-1'></div></>
        ))}
      </tbody>
    </table>

  );
}