import { spec, storeDim } from './store.js';

const targetBody = document.querySelector('body');
const insertHeaderElement = document.createElement('header');
const mainElement = document.createElement('main');

const mainRender = data => {
	update();
	mainElement.innerHTML = /*html*/ `
  <out-line>
    <inner-box>
      ${rows(spec.data.row)}
    </inner-box>
  </out-line>
  `;
	targetBody.append(mainElement);
	numberRender();
	dimRender();
};

const numberRender = () => {
	const boxs = document.querySelectorAll('row-box');
	boxs.forEach((item, index) => {
		if (index === 0) {
			item.querySelectorAll('led-module').forEach((item, index) => {
				item.innerHTML = index + 1;
			});
		} else {
			item.querySelector('led-module').innerHTML = index + 1;
		}
	});
};

const coulmns = item => {
	console.log(item, spec.module.width);
	let result = Array(item / spec.module.width).fill(`<led-module></led-module>`);
	result.unshift(`<row-box>`);
	result.push(`</row-box>`);
	return result.join('');
};

const rows = item => {
	let result = Array(item / spec.module.height).fill(coulmns(spec.data.column));
	return result.join('');
};

const arr = [
	{
		type: 'number',
		class: 'data-row',
		key_01: 'data',
		key_02: 'row',
		prename: '단',
		postname: '',
		min: 1,
		max: 1000,
		other: '',
	},
	{
		type: 'number',
		class: 'data-column',
		key_01: 'data',
		key_02: 'column',
		prename: '열',
		postname: '',
		min: 1,
		max: 1000,
		other: '',
	},
	{
		type: 'number',
		class: 'module-size',
		key_01: 'module',
		key_02: 'size',
		prename: '모듈크기',
		postname: 'mm',
		min: 1,
		max: 1000,
		other: '',
	},
	{
		type: 'number',
		class: 'module-height',
		key_01: 'module',
		key_02: 'height',
		prename: '모듈별 단',
		postname: '',
		min: 1,
		max: 10,
		other: '',
	},
	{
		type: 'number',
		class: 'module-width',
		key_01: 'module',
		key_02: 'width',
		prename: '모듈 별 열',
		postname: 'mm',
		min: 1,
		max: 10,
		other: '',
	},
	{
		type: 'number',
		class: 'case-top',
		key_01: 'case',
		key_02: 'top',
		prename: '케이스 상',
		postname: 'mm',
		min: 0,
		max: 1000,
		other: 'step="10"',
	},
	{
		type: 'number',
		class: 'case-bottom',
		key_01: 'case',
		key_02: 'bottom',
		prename: '케이스 하',
		postname: 'mm',
		min: 0,
		max: 1000,
		other: 'step="10"',
	},
	{
		type: 'number',
		class: 'case-left',
		key_01: 'case',
		key_02: 'left',
		prename: '케이스 좌',
		postname: 'mm',
		min: 0,
		max: 1000,
		other: 'step="10"',
	},
	{
		type: 'number',
		class: 'case-right',
		key_01: 'case',
		key_02: 'right',
		prename: '케이스 우',
		postname: 'mm',
		min: 0,
		max: 1000,
		other: 'step="10"',
	},
	{
		type: 'number',
		class: 'font-control',
		key_01: 'settings',
		key_02: 'unit',
		prename: '이미지 배율',
		postname: 'px',
		min: 0,
		max: 100,
		other: 'step="0.1"',
	},
	{
		type: 'number',
		class: 'dim-control',
		key_01: 'settings',
		key_02: 'dimTextSize',
		prename: 'dim 폰트 크기',
		postname: 'px',
		min: 0,
		max: 100,
		other: 'step="0.5"',
	},
	{
		type: 'number',
		class: 'arrow-control',
		key_01: 'settings',
		key_02: 'arrowSize',
		prename: 'dim 화살표 크기',
		postname: 'px',
		min: 0,
		max: 100,
		other: 'step="0.5"',
	},
	{
		type: 'text',
		class: 'inner-dim-text',
		key_01: 'settings',
		key_02: 'innerText',
		prename: '안쪽 치수 전치사',
		postname: '',
		min: 0,
		max: 100,
		other: 'step="0.5"',
	},
	{
		type: 'text',
		class: 'outer-dim-text',
		key_01: 'settings',
		key_02: 'outerText',
		prename: '바깥쪽 치수 전치사',
		postname: '',
		min: 0,
		max: 100,
		other: 'step="0.5"',
	},
];
// key_01 : spec의 key 값 , key_02 : spec의 key 값 안에 key 값

const eventPush = Element => {
	arr.forEach(item => {
		const target = Element.querySelector(`.${item.class}`);
		target.addEventListener('change', e => {
			if (item.type === 'number') {
				spec[item.key_01][item.key_02] = Number(e.target.value);
			} else if (item.type === 'text') {
				spec[item.key_01][item.key_02] = e.target.value;
			}
			mainRender();
		});
	});
};

console.log(arr[0].key_01);
console.log(spec['data']['column']);
console.log(spec.data.column);
console.log(spec[arr[0].key_01][arr[0].key_02]);

const inputGenerate = item => {
	return `<div class="${item.class}">
  <label>${item.prename}
    <input type="${item.type}" value="${spec[item.key_01][item.key_02]}" min="${item.min}" max="${item.max}" ${
		item?.other
	}/>
    ${item.postname}
  </label>
</div>`;
};

const headerRender = data => {
	insertHeaderElement.innerHTML = arr.map(item => inputGenerate(item)).join('');
	targetBody.append(insertHeaderElement);
	eventPush(insertHeaderElement);
};

const update = () => {
	spec.outputs.moduleWidth = (spec.module.width * spec.module.size) / 10;
	spec.outputs.moduleHeight = (spec.module.height * spec.module.size) / 10;

	mainElement.style.setProperty('--out-led-module-width', spec.outputs.moduleWidth);
	mainElement.style.setProperty('--out-led-module-height', spec.outputs.moduleHeight);

	spec.outputs.caseWidth =
		(spec.case.left + spec.case.right) / 10 + (spec.data.column * spec.outputs.moduleWidth) / spec.module.width;
	spec.outputs.caseHeight =
		(spec.case.top + spec.case.bottom) / 10 + (spec.data.row * spec.outputs.moduleHeight) / spec.module.height;

	mainElement.style.setProperty('--out-line-width', spec.outputs.caseWidth);
	mainElement.style.setProperty('--out-line-height', spec.outputs.caseHeight);

	mainElement.style.setProperty('--out-inner-box-left', spec.case.left / 10);
	mainElement.style.setProperty('--out-inner-box-right', spec.case.right / 10);
	mainElement.style.setProperty('--out-inner-box-top', spec.case.top / 10);
	mainElement.style.setProperty('--out-inner-box-bottom', spec.case.bottom / 10);
	document.documentElement.style.setProperty('--unit', spec.settings.unit);
	document.documentElement.style.setProperty('--dim-text-size', `${spec.settings.dimTextSize}px`);
	mainElement.style.setProperty('--arrow-size', spec.settings.arrowSize);

	//dimension
};

const dimRender = () => {
	//dimension
	storeDim.innerXDim = spec.outputs.caseWidth;
	storeDim.innerXDim = storeDim.innerXDim * 10;
	console.log(storeDim.innerXDim);
	storeDim.innerYDim = spec.outputs.caseHeight;
	storeDim.innerYDim = spec.outputs.caseHeight * 10;
	console.log(storeDim.innerYDim);
	const dimXElement = document.createElement('div');
	dimXElement.classList.add('dim-x');

	const dimBox = (text, option = '') => {
		return `
    <div class="left-arrow">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -17 17 17" width="100" height="100">
        <path d="M 2 0 L 15 0 A 1 1 0 0 0 15 -4 L 5 -4 A 1 1 0 0 1 4 -5 L 4 -15 A 1 1 0 0 0 0 -15 L 0 -2 A 2 2 0 0 0 2 0 Z" fill="#ff0000"/>
      </svg>
    </div class="left-arrow">
    <div class="bottom-dim"></div class="bottom-dim">
    <div class="right-arrow">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -17 17 17" width="100" height="100">
        <path d="M 2 0 L 15 0 A 1 1 0 0 0 15 -4 L 5 -4 A 1 1 0 0 1 4 -5 L 4 -15 A 1 1 0 0 0 0 -15 L 0 -2 A 2 2 0 0 0 2 0 Z" fill="#ff0000"/>
      </svg>
    </div class="right-arrow">
    <div class="line">
    <span class="dim-text">${option}${text}mm</span>
    </div>
    `;
	};

	// 재사용 고려해보기

	const dimYElement = document.createElement('div');
	dimYElement.classList.add('dim-y');
	const clonedXDim = dimXElement.cloneNode(true);
	const clonedYDim = dimYElement.cloneNode(true);
	// 재사용 고려해보기
	dimXElement.innerHTML = dimBox(storeDim.innerXDim, spec.settings.outerText);
	dimYElement.innerHTML = dimBox(storeDim.innerYDim, spec.settings.outerText);

	clonedXDim.innerHTML = dimBox(storeDim.innerXDim - spec.case.left - spec.case.right, spec.settings.innerText);
	clonedYDim.innerHTML = dimBox(storeDim.innerYDim - spec.case.top - spec.case.bottom, spec.settings.innerText);
	document.querySelector('out-line').append(dimXElement);
	document.querySelector('out-line').append(dimYElement);
	document.querySelector('inner-box').append(clonedXDim);
	document.querySelector('inner-box').append(clonedYDim);
};

export { mainRender, headerRender };
