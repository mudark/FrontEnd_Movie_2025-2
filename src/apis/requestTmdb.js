import { addMoives } from "./printMovies.js";
const loading_wrap=document.getElementById('loading-wrap');
function loading() {
  loading_wrap.style.display="flex";
  setTimeout(endLoading,1000);
}
function endLoading() {
  loading_wrap.style.display="none";
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmRjYmM2N2EyMWQ3ODdkZWVmMzU0MzQwMDRiZjc5YyIsIm5iZiI6MTc2Mjc2OTUxNS4wMTIsInN1YiI6IjY5MTFiYTZiMmUyZDY1MmJhNjNhMzFhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HkHOm25bJkzS1zPhxjqDz5cBRlJps3yp4sc16SDsViw'
  }
};
export function requestTmdb(page=1,value=undefined) {
  loading();
  let pagename=document.getElementById('pagename');
  pagename.innerText='지금 인기있는 영화';
  let url=`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  if (value!=undefined) {
    url=`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(value)}&include_adult=false&language=ko-KR&page=${page}`;
    pagename.innerText=`"${value}" 검색 결과`;
  }
  console.log(`search : ${value}`);
  fetch(url, options)
    .then(res => res.json())
    .then(res => {console.log(res); return res;})
    .then(res => {
      const list=document.getElementById('list');
      const movies=res.results;
      if (movies.length==0 && page==1) {
        const no_content=document.createElement('p');
        no_content.innerText="결과 없음";
        list.appendChild(no_content);
        document.getElementById('add-btn').style.display='none';
      } else {
        addMoives(movies);
      }
    })
    .catch(err => console.error(err));
}
