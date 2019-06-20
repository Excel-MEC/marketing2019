var images = Array.from(document.querySelectorAll('.img-cntr img'));
var descriptions = Array.from(document.querySelectorAll('.img-cntr p'));
var heads = Array.from(document.querySelectorAll('.img-cntr h2'));
var imageViewer = document.querySelector('.img-viewer');
var imageViewerD = document.querySelector('.img-viewer div');
var imageViewerH = document.querySelector('.img-viewer div h2');
var imageViewerP = document.querySelector('.img-viewer div p');
var imageViewerImg = document.querySelector('.img-viewer img');
var prevX = null,prevY=null,prevLeft = null,prevTop = null,prevelement=null;

function tidyUpAnimations () {
	imageViewerImg.style.transition = ""; 
	imageViewerImg.style.transform = "";
	imageViewerD.style.opacity = 1;
}



function handleClick (evt) {

	if (evt.target == imageViewer || evt.target == imageViewerImg ) {
		imageViewer.classList.remove('visible');
		imageViewerD.style.opacity = 0;
		return;
	}

	images.forEach( function(element, index) {
		if(element == evt.target) {
			imageViewer.classList.add('visible');

		    imageViewerImg.classList.remove('tall','wide');
		    imageViewerImg.classList.add('tall');
			imageViewerImg.src = element.src;
			if (imageViewerImg.offsetTop + imageViewerImg.offsetHeight >
			 	imageViewer.offsetTop + imageViewer.offsetHeight ||
				imageViewerImg.offsetLeft + imageViewerImg.offsetWidth >
				imageViewer.offsetLeft + imageViewer.offsetWidth ){

				    imageViewerImg.classList.remove('tall');
				    imageViewerImg.classList.add('wide');
    		}

    		/********description********/
    		
    		imageViewerP.innerHTML = descriptions[index].innerHTML;
    		imageViewerH.innerHTML = heads[index].innerHTML;
    		imageViewerD.style.left = imageViewerImg.offsetLeft+"px";
    		imageViewerD.style.top = imageViewerImg.offsetTop+"px";
    		imageViewerD.style.width = imageViewerImg.offsetWidth+"px";


			/********Animation********/

			var first  = element.getBoundingClientRect();
			var last   = imageViewerImg.getBoundingClientRect();
			var invertTop = (first.top - last.top)+'px';
			prevTop = (last.top - first.top)+'px';
			var invertLeft = (first.left - last.left)+'px';
			prevLeft = (last.left - first.left)+'px';
			var scaleX = first.width / last.width;
			prevX = 1/scaleX;
			var scaleY = first.height / last.height;
			prevY = 1/scaleY;

			imageViewerImg.style.transform = 'translate(' +invertLeft +','+invertTop + ')' + 
			'scale('+scaleX+','+scaleY+')';
			imageViewer.offsetTop;
			imageViewerImg.style.transition = "transform 0.3s cubic-bezier(0,0,0.32,1)";
			imageViewerImg.style.transform = '';
			imageViewerImg.addEventListener('transitionend', tidyUpAnimations);
		}
	});

}

document.addEventListener('click', handleClick);