import React from 'react';
import './FaceRecognition.css'
const FaceRecognition = ({imageUrl,box})=>{
	return (
		<div className='mw7 mw7-ns center pa3 ph6-ns'>
			<div className='absolute mt2'>
				<img className='' id='inputimage' width='500px' height='auto' alt ='' src={imageUrl}/>
				<div className = 'bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>		
			</div>
		</div>
	);
}	
export default FaceRecognition;