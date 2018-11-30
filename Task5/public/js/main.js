'use strict';

const frm = document.querySelector('#mediaform');
const updatefrm = document.querySelector('#updateform');
const deletefrm = document.querySelector('#deleteform')
const list = document.querySelector('#imagelist');
/*
const img = document.querySelector('#image');
const aud = document.querySelector('#aud');
const vid = document.querySelector('#vid');
*/

const fillUpdate = (image) => {
	////console.log(image);
	document.querySelector('#updateform input[name=mID]').value = image.mID;
	document.querySelector('#updateform input[name=category]').value = image.category;
	document.querySelector('#updateform input[name=title]').value = image.title;
	document.querySelector('#updateform input[name=details]').value = image.details;
	document.querySelector('#updateform input[name=thumbnail]').value = image.thumbnail;
	document.querySelector('#updateform input[name=image]').value = image.image;
	document.querySelector('#updateform input[name=original]').value = image.original;
	document.querySelector('#updateform button').removeAttribute('disabled');
	document.querySelector('#deleteform button').removeAttribute('disabled');

	/* document.querySelector('#updateBtn').removeAttribute('disabled');
	document.querySelector('#deleteBtn').removeAttribute('disabled'); */

};

const getImages = () => {
	fetch('/images').then((response) => {
		return response.json();
	}).then((json) => {
		////console.log(json);
		// clear list before adding upated data
		list.innerHTML = '';
		json.forEach((image) => {
			const li = document.createElement('li');
			const title = document.createElement('h3');
			//const button = document.createElement('button');
			title.innerHTML = image.title;
			//button.setAttribute("type","submit");
			//button.innerHTML = 'Delete';
			li.appendChild(title);
			const img = document.createElement('img');
			img.src = 'thumbs/' + image.thumbnail;
			img.addEventListener('click', () => {
				fillUpdate(image);
			});
			li.appendChild(img);
			//li.appendChild(button);
			list.appendChild(li);

		});
	});
};

const sendForm = (evt) => {
	evt.preventDefault();
	const fd = new FormData(frm);
	const settings = {
		method: 'post',
		body: fd,
	};

	fetch('/upload', settings).then((response) => {
		return response.json();
	}).then((json) => {
		////console.log(json);
		// update list
		frm.reset();
		getImages();
	});
};

const sendUpdate = (evt) => {
	console.log('bam vao ham sendUpdate');
	evt.preventDefault();
	// get data from updatefrm and put it to body
	const data = JSON.stringify([
		updatefrm.querySelector('input[name="category"]').value,
		updatefrm.querySelector('input[name="title"]').value,
		updatefrm.querySelector('input[name="details"]').value,
		updatefrm.querySelector('input[name="mID"]').value,
	]);

	const settings = {
		method: 'PATCH',
		body: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	};
	// app.patch('/images'.... needs to be implemented to index.js (remember body-parser)
	fetch('/images', settings).then((response) => {
		return response.json();
	}).then((json) => {
		////console.log(json);
		updatefrm.reset();
		document.querySelector('#updateform button').setAttribute('disabled', 'disabled');
		document.querySelector('#deleteform button').setAttribute('disabled', 'disabled');

		//document.querySelector('#updateBtn').setAttribute('disabled', 'disabled');
		//document.querySelector('#deleteBtn').setAttribute('disabled', 'disabled');
		// update list
		getImages();
	});
};

const sendDelete = (evt) => {
	console.log('bam vao ham sendDelete');
	evt.preventDefault();
	// get data from updatefrm and put it to body
	const data = JSON.stringify([
		updatefrm.querySelector('input[name="mID"]').value,
		updatefrm.querySelector('input[name="thumbnail"]').value,
		updatefrm.querySelector('input[name="image"]').value,
		updatefrm.querySelector('input[name="original"]').value
	]);

	const settings = {
		method: 'PATCH',
		body: data,
		images: 'dataImage',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	};
	// app.patch('/images'.... needs to be implemented to index.js (remember body-parser)
	fetch('/delete', settings).then((response) => {
		return response.json();
	}).then((json) => {
		////console.log(json);
		deletefrm.reset();
		document.querySelector('#updateform button').setAttribute('disabled', 'disabled');
		document.querySelector('#deleteform button').setAttribute('disabled', 'disabled');
		getImages();
	});
};




frm.addEventListener('submit', sendForm);
updatefrm.addEventListener('submit', sendUpdate);
deletefrm.addEventListener('submit', sendDelete);

/* const updateBtn = document.getElementById('#updateBtn');
const deleteBtn = document.getElementById('#deleteBtn');
if (updateBtn.onclick() == true) {
	alert('update');
} */
//if (deleteBtn.onclick()) return check =console.log('delete click');


getImages();