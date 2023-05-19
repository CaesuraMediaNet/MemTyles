import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function MtRow ({children}) {
	return (
		<div style={{
			display: "flex",
			flexWrap: "wrap",
			alignItems: "center",
			justifyContent: "center",
		}}>
			{children}
		</div>
	);
}


