
export function addMoives(movie_list) {
    const list=document.getElementById('list');
    let movie_row;
    for (let i=0;i<movie_list.length;i++) {     
        if (i%4==0) {
            movie_row=document.createElement('div');
            movie_row.classList.add('movierow');
            list.appendChild(movie_row);    
        }
        const movie=movie_list[i];
        const view=document.createElement('div');
        view.classList.add('movieview');

        const poster_path=`https://image.tmdb.org/t/p/original${movie.poster_path}`;
        const poster=document.createElement('img');
        poster.classList.add('poster');
        poster.setAttribute('object-fit','cover');
        poster.setAttribute('src',poster_path);
        view.appendChild(poster);

        const movie_title=document.createElement('p');
        movie_title.innerText=movie.title;
        view.appendChild(movie_title);
        
        const vote_avg=document.createElement('span');
        vote_avg.innerText=movie.vote_average.toFixed(1);
        view.appendChild(vote_avg);

        const star=document.createElement('img');
        star.setAttribute('src','./src/assets/star.svg');
        view.appendChild(star);

        movie_row.appendChild(view);
    }
    const add_btn=document.getElementById('add-btn');
    if (movie_list.length<20) {
        add_btn.style.display='none';
    } else {
        add_btn.style.display='inline-block';
    }
}