const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const clear = document.getElementById('clear');


printJokes ();


clear.addEventListener('click', ()=>{
    localStorage.removeItem('chuckJokes');
    jokeList.innerHTML='';
})

fetchJoke.addEventListener('click', ()=>{
    fetch ('https://api.chucknorris.io/jokes/random')
        .then(response =>{
            if(!response.ok){
                throw new Error ('La solucitud no tuvo exito')
            }
            return response.json();
        })
        .then (jokes =>{
            getJokes(jokes);
            printJokes()

        })
        .catch(error =>{
            console.error(error)
            jokeList.innerHTML = 'error de pagina'
        })


})

function getJokes (joke){
    const {value} = joke;
    console.log(value);
    let listado = JSON.parse(localStorage.getItem('chuckJokes'));
    console.log('listado: ' , listado)
    if (listado === null){
        listado = [value];        
    }else{
        listado.push(value);
    }
    localStorage.setItem('chuckJokes', JSON.stringify(listado))
        
    console.log(listado)
    localStorage.setItem('chuckJokes', JSON.stringify(listado))
}

function printJokes (){
    
    jokeList.innerHTML='';
    let listado = JSON.parse(localStorage.getItem('chuckJokes'));
    if (listado !== null){
    listado.forEach((element, i) => {
        console.log(i);
        jokeList.innerHTML += `
        <li>
            ${element}
            
        </li>        
        `
    });
}

const btn = document.querySelectorAll('.btn');
    console.log('boton',btn);
    for (element of btn){
        element.addEventListener('click', (boton=>{
            borrarJoke(boton.value);
        }))
    }

}
/*
function borrarJoke(posicion){
    let listado = JSON.parse(localStorage.getItem('chuckJokes'));
    let nuevoListado = [];

    for (let i = 0; i< listado.lenght;i++){
        if (i !== posicion){
            nuevoListado.push(listado[i])
        }
    }
    console.log(nuevoListado)
    localStorage.setItem('chuckJokes', JSON.stringify(nuevoListado))
    printJokes();
}*/
