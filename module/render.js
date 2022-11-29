import { spec } from './store.js';

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
};

const coulmns = item => {
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
	{ class: 'data-column', key_01: 'data', key_02: 'column' },
	{ class: 'data-row', key_01: 'data', key_02: 'row' },
	{ class: 'module-size', key_01: 'module', key_02: 'size' },
	{ class: 'module-height', key_01: 'module', key_02: 'height' },
	{ class: 'module-width', key_01: 'module', key_02: 'width' },
	{ class: 'case-top', key_01: 'case', key_02: 'top' },
	{ class: 'case-bottom', key_01: 'case', key_02: 'bottom' },
	{ class: 'case-left', key_01: 'case', key_02: 'left' },
	{ class: 'case-right', key_01: 'case', key_02: 'right' },
];

const eventPush = Element => {
	arr.forEach(item => {
		const target = Element.querySelector(`.${item.class}`);
		target.addEventListener('change', e => {
			spec[item.key_01][item.key_02] = Number(e.target.value);
			mainRender();
		});
	});
};

console.log(arr[0].key_01);
console.log(spec['data']['column']);
console.log(spec.data.column);
console.log(spec[arr[0].key_01][arr[0].key_02]);

const headerRender = data => {
	insertHeaderElement.innerHTML = `
  <div class="data-column">
    <label>단
      <input type="number" value="${spec.data.row}" min="1" max="1000" />
      
    </label>
  </div>
  <div class="data-row">
    <label>열
      <input type="number" value="${spec.data.column}" min="1" max="1000" />
      
    </label>
  </div>
  <div class="module-size">
    <label>모듈 크기
      <input type="number" value="${spec.module.size}" min="1" max="1000" />
      mm
    </label>
  </div>
  <div class="module-height">
    <label>모듈 단
      <input type="number" value="${spec.module.height}" min="1" max="10" />
      
    </label>
  </div>
  <div class="module-width">
    <label>모듈 열
      <input type="number" value="${spec.module.width}" min="1" max="10" />
      
    </label>
  </div>
  <div class="case-top">
    <label>케이스 상
      <input type="number" value="${spec.case.top}" min="10" step="10" />
      mm
    </label>
  </div>
  <div class="case-bottom">
    <label>케이스 하
      <input type="number" value="${spec.case.bottom}" min="10" step="10" />
      mm
    </label>
  </div>
  <div class="case-left">
    <label>케이스 좌
      <input type="number" value="${spec.case.left}" min="10" step="10"/>
      mm
    </label>
  </div>
  <div class="case-right">
    <label>케이스 우
      <input type="number" value="${spec.case.right}" min="10" step="10" />
      mm
    </label>
  </div>
  `;

	targetBody.append(insertHeaderElement);
	eventPush(insertHeaderElement);
};

const update = () => {
	const moduleWidth = (spec.module.width * spec.module.size) / 10;
	const moduleHeight = (spec.module.height * spec.module.size) / 10;

	mainElement.style.setProperty('--out-led-module-width', moduleWidth);
	mainElement.style.setProperty('--out-led-module-height', moduleHeight);

	const width = (spec.case.left + spec.case.right) / 10 + (spec.data.column * moduleWidth) / spec.module.width;
	const height = (spec.case.top + spec.case.bottom) / 10 + (spec.data.row * moduleHeight) / spec.module.height;

	mainElement.style.setProperty('--out-line-width', width);
	mainElement.style.setProperty('--out-line-height', height);

	mainElement.style.setProperty('--out-inner-box-left', spec.case.left / 10);
	mainElement.style.setProperty('--out-inner-box-right', spec.case.right / 10);
	mainElement.style.setProperty('--out-inner-box-top', spec.case.top / 10);
	mainElement.style.setProperty('--out-inner-box-bottom', spec.case.bottom / 10);
};

export { mainRender, headerRender };
