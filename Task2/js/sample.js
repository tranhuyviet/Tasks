//document.getElementById('test').setAttribute('style', 'background: blue; color: red');
const firstElement = document.querySelector('#test');
firstElement.innerHTML = 'I add <strong>this</strong> text with JS';
firstElement.setAttribute('style','color:red');

const secondElement = document.querySelectorAll('.example');
console.log(secondElement);
for(let i = 0; i < secondElement.length ; i++){
    console.log(i);
    if(i == 0){
        secondElement[i].setAttribute('style','color: green');
    }else{
        secondElement[i].setAttribute('style','color: blue');
    }
    
}

for(const element of secondElement){
    element.innerHTML = 'Modified';
}

secondElement.forEach(element =>{
    element.innerHTML = 'Modified again';
});

/*firstElement.addEventListener('click', (evt) => {
    
    //console.log(evt);
    //console.log(evt.target);
    console.log(evt.currentTarget);
    evt.currentTarget.setAttribute('style','background:yellow');
    evt.currentTarget.innerHTML = 'Changed when click';
});
*/



const showMyName = (evt) =>{
    evt.currentTarget.setAttribute('style','background:yellow');
    evt.currentTarget.innerHTML = 'Changed when click';
};

firstElement.addEventListener('click', showMyName);