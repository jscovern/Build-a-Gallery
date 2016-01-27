var imageArray = new Array();
var imageInGalleryMax = 4;

function previewFile() { //concept taken from http://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
	//var myImage = $("img[data-id=" + (imageArray.length + 1) + "]");
	//var myImage = document.querySelector('img'); //finds the img element
	var myImage = document.querySelector('img[data-id="' + findDataID() + '"]'); //finds the img element with the correct data-band id
	var myFile = document.querySelector('input[type=file][data-id="' + findDataID() + '"]').files[0]; //finds the input with a type of file
	var myFileUploader = document.querySelector('input[type=file][data-id="' + findDataID() + '"]');
	var reader = new FileReader();
	reader.onloadend = function() {
		myImage.src = reader.result; //sets the src of the img on the page (which is called myImage here)
	}

	if (myFile) { //if a file was uploaded
		reader.readAsDataURL(myFile); //reads the file that was uploaded, as a url
		$(myImage).removeClass("hidden"); //removes the hidden class from the image
		$(myFileUploader).addClass("hidden");
		imageArray.push($(myFileUploader).parent().attr('data-band_id') + "_" + $(myFileUploader).attr('data-id'));
		
	} else { //if a file wasn't uploaded, sets the src back to blank
		myImage.src = "";
	}

	hidePlusButton($(myFileUploader).parent().attr('data-band_id'));
}

function hidePlusButton(band_id) {
	if (numImageInGallery(band_id) === imageInGalleryMax) { //only allow 5 images in each gallery
				$("button.plusButton[data-band_id="+band_id+"]").addClass("hidden");
				$("div.verticalGutter[data-band_id="+band_id+"]").addClass("hidden");
				$("div.gallery[data-band_id=" + band_id + "]").addClass("plusButtonHidden");
			}
}

function showPlusButton(band_id) {
	if (numImageInGallery(band_id) < imageInGalleryMax) { //only allow 5 images in each gallery
				$("button.plusButton[data-band_id="+band_id+"]").removeClass("hidden");
				$("div.verticalGutter[data-band_id="+band_id+"]").removeClass("hidden");
				$("div.gallery[data-band_id=" + band_id + "]").removeClass("plusButtonHidden");
			}
}

function findDataID() {
	var highNum=0;
	for( i=0; i<imageArray.length; i++) {
		if(imageArray[i].substring(imageArray[i].search("_") + 1, imageArray[i].length) > highNum) {
			highNum = imageArray[i].substring(imageArray[i].search("_") + 1, imageArray[i].length);
		}
	}
		return parseInt(highNum) + 1;
}

function numImageInGallery(band_id) {
	var imageCount = 0;

	for(i=0; i<imageArray.length; i++) {
		if(imageArray[i].substring(0,imageArray[i].search("_")) === band_id) {
			imageCount++;
		}
	}

	return imageCount;
	console.log("imageCount from numImageInGallery: "+imageCount);
}

$(document).ready(function() {

	$(document).on('click', '.button', function(event) {
		event.preventDefault();
		var band_id = $(event.target).attr('data-band_id');

		    $(".gallery[data-band_id=" + band_id + "]").append("<input type='file' onchange=previewFile() data-id=" + findDataID() + ">");
		    $(".gallery[data-band_id=" + band_id + "]").append("<span class='imageWrapper' data-id=" + findDataID() + "><img class='hidden imgPreview' data-id=" + findDataID() + " data-band_id=" + band_id + " src=''><span class='deleteX' data-id=" + findDataID() + ">[x]</span></span>");

		    $("input[type='file'][data-id=" + findDataID() +"]").click(); //auto-click the choose-file button
	});

	$(document).on('click', '.deleteX', function(event) {
		var dataID = $(this).attr('data-id');
		var band_id = $(this).parent().parent().attr('data-band_id');
		console.log("dataID: "+dataID);
		var arrayPosition = imageArray.indexOf(band_id+"_"+dataID);
		imageArray.splice(arrayPosition,1);
		$(".imageWrapper[data-id=" + dataID + "]").remove();
		$("input[type=file][data-id=" + dataID + "]").remove();
		console.log("deleteX band_id: "+band_id);
		showPlusButton(band_id);
	});


});