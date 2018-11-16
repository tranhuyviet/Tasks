'use strict';

// HTML contains element 'message'. This is used to show the server's response
// Select it and save it as a variable/object

// make function 'upload' which
// - prevents the form from sending
// - writes 'Upload in progress...' into 'message' element
// - selects the file input field
// - makes FormData -object and adds the file selected byt the user into the object
// - send the file to the same url as in task a by using fetch -method
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted

const message = document.getElementById('message');

/*function init() {
    document.getElementById('btn').addEventListener('click', upload());
}*/

const upload = () => {
    //alert('aaa');
    message.innerHTML = 'Upload in progess..';
    const input = document.querySelector('input[type="file"]');
    const data = new FormData();

    data.append('img', input.files[0]);

    const settings = {
        method: 'POST',
        body: data
    };

    fetch('localhost/upload/', settings).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
        message.innerHTML = json;
    });
}

document.getElementById('btn').addEventListener('click', upload);