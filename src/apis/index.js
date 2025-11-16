import {requestTmdb} from './requestTmdb.js';
let page=1;
let value=undefined;
function debounce(func,timeout=300) {
  let timer;
  return function(...args) {
    const context=this;
    clearTimeout(timer);
    timer=setTimeout(()=>{
      func.apply(context,args);
    },timeout);
  }
}
function deleteMovies() {
  document.getElementById('list').innerHTML='';
  page=1;
}

const debounceSearch=debounce(function() {
  deleteMovies();
  value=document.getElementById('search-text').value;
  console.log(`search? : ${value}`);
  requestTmdb(page,value);
});
function search() {event.preventDefault(); debounceSearch();};

const debounceAddMovies=debounce(function() {  
  requestTmdb(++page,value);
});
function addMovies() {debounceAddMovies();};

const debounceInit=debounce(function() {
  deleteMovies();
  value=undefined;
  requestTmdb();
});
function init() {debounceInit();}

const logo=document.getElementById('logo');
const search_btn=document.getElementById('search-btn');
const add_btn=document.getElementById('add-btn');
search_btn.addEventListener('click',search);
add_btn.addEventListener('click',addMovies);
logo.addEventListener('click',init);
init();
