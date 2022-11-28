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
	let result = Array(item).fill(`<led-module></led-module>`);
	result.unshift(`<row-box>`);
	result.push(`</row-box>`);
	return result.join('');
};

const rows = item => {
	let result = Array(item).fill(coulmns(spec.data.colunm));
	return result.join('');
};

const headerRender = data => {
	insertHeaderElement.innerHTML = `
  <div>
    <h1>단</h1>
  </div>
  <div>
    <h1>열</h1>
  </div>
  <div>
    <h1></h1>
  </div>
  <div>
    <h1>단</h1>
  </div>
  `;
	targetBody.append(insertHeaderElement);
};

const update = () => {
	const moduleWidth = (spec.module.width * spec.module.size) / 10;
	const moduleHeight = (spec.module.height * spec.module.size) / 10;

	mainElement.style.setProperty('--out-led-module-width', moduleWidth);
	mainElement.style.setProperty('--out-led-module-height', moduleHeight);

	const width = spec.case.left + spec.case.right + spec.data.colunm * moduleWidth;
	const height = spec.case.top + spec.case.bottom + spec.data.row * moduleHeight;

	mainElement.style.setProperty('--out-line-width', width);
	mainElement.style.setProperty('--out-line-height', height);

	mainElement.style.setProperty('--out-inner-box-left', spec.case.left);
	mainElement.style.setProperty('--out-inner-box-right', spec.case.right);
	mainElement.style.setProperty('--out-inner-box-top', spec.case.top);
	mainElement.style.setProperty('--out-inner-box-bottom', spec.case.bottom);
};

export { mainRender, headerRender };
