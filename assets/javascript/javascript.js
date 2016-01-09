var imageArray = new Array();

function previewFile() { //concept taken from http://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
	//var myImage = $("img[data-id=" + (imageArray.length + 1) + "]");
	//var myImage = document.querySelector('img'); //finds the img element
	var myImage = document.querySelector('img[data-id="' + (imageArray.length + 1) + '"]'); //finds the img element
	var myFile = document.querySelector('input[type=file][data-id="' + (imageArray.length + 1) + '"]').files[0]; //finds the input with a type of file
	var myFileUploader = document.querySelector('input[type=file][data-id="' + (imageArray.length + 1) + '"]');
	var reader = new FileReader();

	reader.onloadend = function() {
		myImage.src = reader.result; //sets the src of the img on the page (which is called myImage here)
	}

	if (myFile) { //if a file was uploaded
		reader.readAsDataURL(myFile); //reads the file that was uploaded, as a url
		$(myImage).removeClass("hidden"); //removes the hidden class from the image
		$(myFileUploader).addClass("hidden");
		console.log(myFileUploader);
		imageArray.push(myImage.src); //adds in the url of the image into the imageArray
	} else { //if a file wasn't uploaded, sets the src back to blank
		myImage.src = "";
	}
}

$(document).ready(function() {

	$(document).on('click', '.button', function(event) {
		event.preventDefault();
		// console.log($(event.target).parent().parent().attr('id'));
		// console.log($(event.target).parent().siblings());
		var band_id = $(event.target).attr('data-band_id');

		    $(".gallery[data-band_id=" + band_id + "]").append("<input type='file' onchange=previewFile() data-id=" + (imageArray.length + 1) + "><br>");
		    $(".gallery[data-band_id=" + band_id + "]").append("<img class='hidden' data-id=" + (imageArray.length + 1) + " src='' height='200' width='200'>");

		    // $('.gallery').append("<input type='file' onchange=previewFile() data-id=" + (imageArray.length + 1) + "><br>");
		    // $('.gallery').append("<img class='hidden' data-id=" + (imageArray.length + 1) + " src='' height='200' width='200'>");
	});

});