import dataToDisplay from './js/data';
import { curry, splitData, compose, mapper } from './js/lib';
import { createHtml, createAttr, appendElement, createTrailingZeroes, createDateFormat } from './js/html-builds';


const container = document.getElementById('app');
const template = (x) => `<th>${x}</th>`;
const tbodyTmpl = (x) => `<tr><td>${x.name}</td><td>${createDateFormat(x.date).date}</td><td>${createDateFormat(x.date).hours}:${createDateFormat(x.date).minutes}${createDateFormat(x.date).ampm}</td><td>${x.uploads}</td><td>${x.downloads}</td></tr>`

// limit data
const limit = () => { return [25, 50, 100]};

// table headers
const headersForTable = () => { return ['Name', 'Date', 'Time', 'Uploads', 'Downloads'] };

let pager = limit()[0];

console.log(dataToDisplay);

const data = curry(splitData)(dataToDisplay);

// ***********************
const uldiv = createHtml('div');
const ulspan = createHtml('div');
// const arrowHolder = createHtml('span');
const ul = createHtml('ul');
createAttr(ulspan, 'class', ' limit ');
// appendElement(arrowHolder, uldiv);
appendElement(ulspan, uldiv);
appendElement(ul, uldiv);

ulspan.innerHTML = limit()[0] + ' <span class="arrow-down">▼</span>';
const s = ulspan.getElementsByTagName('span');

createAttr(ul, 'class', ' hidelist ');
const toggleClass = () => {
	
	// s[0].innerHTML = '▲';
	// ul.classList.toggle('activelist');
	if(ul.classList.contains('activelist')) {
		ul.classList.remove('activelist');
		s[0].innerHTML = '▼';
	} else {
		ul.classList += ' activelist ';
		s[0].innerHTML = '▲';
	}
};

ulspan.addEventListener('click', toggleClass);

window.displayPage = (e) => {
	tbody.innerHTML = '';
	pg.innerHTML ='';
	pager = e.target.value;
	ulspan.innerHTML = e.target.value + ' <span class="arrow-down">▼</span>';
	ul.classList.remove('activelist');
	tbodyTemplate(data, e.target.value, 0);
	appendElement(tbody, tbl);
	pagination(data(e.target.value));
};

const drop = limit().map((x, i) => ul.innerHTML += `<li value="${x}" onClick="displayPage(event)">${x}</li>`);

const tbl = createHtml('table');
const dt = createAttr(tbl, 'class', 'table');
const thead = createHtml('thead');
const tr = createHtml('tr');
const pg = createHtml('div');
const pgnt = createAttr(pg, 'id', 'pagination'); 
const headerTemplate = () => {
  tr.innerHTML = mapper(template,headersForTable());
}
const tbody = createHtml('tbody');

const tbodyTemplate = (d, lim, n=0) => {
  tbody.innerHTML += mapper(tbodyTmpl, d(lim)[n]);
}

headerTemplate();
tbodyTemplate(data, pager);
const b = pg.getElementsByTagName('button');

window.renderPage = (e) => {
	tbody.innerHTML = '';
	pg.innerHTML ='';
	tbodyTemplate(data, pager, e.target.value);
	appendElement(tbody, tbl);
	pagination(data(pager));
	
	b[e.target.value].className = 'btn btn-primary btn-sm active ';
}


const pagination = (ar) => {
	return ar.forEach((x, i) => {
		pg.innerHTML += `<button class="btn btn-primary btn-sm" value="${i}" onclick="renderPage(event)">${i + 1}</button>`;
	});
}

appendElement(uldiv, container);
appendElement(tr, thead);
appendElement(thead, tbl);
appendElement(tbody, tbl);
appendElement(tbl, container);
appendElement(pg, container);
pagination(data(pager));
b[0].className += ' active ';



