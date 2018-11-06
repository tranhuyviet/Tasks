// Create function 'showImages' which
// loads images.json which has links to images as an array.

// create a loop which builds the following HTML from every image in the array: 
/*
<li>
    <figure>
        <a href="img/original/filename.jpg"><img src="img/thumbs/filename.jpg"></a>
        <figcaption>
            <h3>Title</h3>
        </figcaption>
    </figure>
</li>
*/
// Make the above HTML by using DOM methods.
// Create elements with createElement()
// Add attributes with setAttribute()
// Add elements with appendChild
// When the above HTML is ready append it to the <ul> element
const showImages = (images) => {
   
    for(let i = 0; i < images.length ; i++){
        let h3 = document.createElement('h3');
        let figcaption = document.createElement('figcaption');
        let a = document.createElement('a');
        let figure = document.createElement('figure');
        let li = document.createElement('li'); 
        let img = document.createElement('img');

        h3.innerText = images[i].mediaTitle;
        figcaption.appendChild(h3);
        img.setAttribute('src',`img/thumbs/${images[i].mediaUrl}`) ;
        a.setAttribute('href',`img/original/${images[i].mediaUrl}`);
        a.appendChild(img);
        figure.appendChild(a);
        figure.appendChild(figcaption);
        li.appendChild(figure);
        document.querySelector('ul').appendChild(li);
        
    }
      
}

fetch('images.json').then((response) => {
    //console.log(response.text());
    return response.json();
}).then((json) => {
    showImages(json);
});   

