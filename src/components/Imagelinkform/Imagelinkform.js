import React from 'react';
import './Imagelinkform.css';
const Imagelinkform = ({onInputChange,onButtonSubmit}) =>
{
	return (
		<div className = ''>
			<p className='f3'>
				{`This magic brain will detect faces from your pictures` }
			</p>
			<div className='center'>
				<div className='center form pa4 br3 shadow-5'>
					<input type='text' placeholder='Image URL'	className='f4 pa2 w-70 center'
					   		onChange={onInputChange} 
					/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-green'
						onClick = {onButtonSubmit}>
						Detect
					</button> 
				</div>
			</div>

		</div>
	);
}

export default Imagelinkform;