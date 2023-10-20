import React from 'react'

import Button from './button';

export default function Confirmation({ title, info }) {


	console.log(info[0]);
	return (
		<div className="principal p-2 mt-10 w-full h-40 md:x-92 flex flex-col  bg-[#09B6C2] rounded-lg md:max-w-[600px] ">
			<div className="title h-10">
				<h3 className='text-2xl font-black text-center text-white'>{title}</h3>
			</div>
			<div className='overflow-y-scroll h-40'>
				<div className="data col-span-1 w-full flex flex-col justify-center align-top items-center bg-[#FFF] rounded-b-lg ">
					<table className='text-black w-92 my-5 w-full'>
						<thead >
							<tr>
								<th className='px-3'>Matricula</th>
								<th className='px-3'>Detalle</th>
							</tr>
						</thead>
						<tbody>
							{
								info.map((i, index) => {
									return (
										<>
											<tr className='text-black'>
												<td className='px-5 min-w-[120px] gap-y-10 border-r-2'>{i.matricula}</td>
												<td className='px-5 '>{i.detalle}</td>
												<td className='px-5 py-15 '> <Button children="ver" color="orange" size="mini" /> </td>

											</tr>



										</>
									)
								}
								)
							}

						</tbody>
					</table>

				</div>

			</div>

		</div >
	)
}
