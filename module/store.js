export const spec = {
	module: {
		width: 2,
		height: 1,
		size: 160,
	},
	data: {
		row: 4,
		column: 8,
	},
	case: {
		left: 20,
		right: 40,
		top: 60,
		bottom: 80,
	},
	outputs: {
		moduleWidth: 320,
		moduleHeight: 160,
		caseWidth: 1340,
		caseHeight: 780,
	},
	settings: {
		unit: 4,
		innerText: '내경 : ',
		outerText: '외경 : ',
		dimTextSize: 12,
		arrowSize: 12,
		lineWeight: 2,
		outerDimHeight: 40,
		innerDimHeight: 30,
		moduleColor: '#999999',
		frameColor: '#555555',
		dimColor: '#ff0000',
		moduleLineColor: '#000000',
		outerBorder: 5,
		frameDepth: 100,
		depthColor: '#00ff00',
	},
};

export const storeDim = {
	innerXDim: 1280,
	innerYDim: 720,
};
