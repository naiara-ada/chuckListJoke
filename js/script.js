const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const clear = document.getElementById('clear');
let btn;

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
            printJokes();
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
            <button class='btn' value='${i}'>Eliminar</button>
        </li>        
        `
    });
}

    btn = document.querySelectorAll('.btn');
    btn.forEach( (boton)=>{
        boton.addEventListener('click', ()=>{
            borrarJoke(boton.value)
        })
    })  
   

}

function borrarJoke(posicion){
    let listadoBorrar = JSON.parse(localStorage.getItem('chuckJokes'));
    let nuevoListado = [];
    console.log('listadoBorrar', listadoBorrar);
    for (let i in listadoBorrar){
        if (i !== posicion){
           nuevoListado.push(listadoBorrar[i])
        }
    }
    
    console.log('nuevoListado', nuevoListado)
    localStorage.setItem('chuckJokes', JSON.stringify(nuevoListado))
    console.log(localStorage);
    printJokes();
}
