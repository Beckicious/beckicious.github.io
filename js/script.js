var i = 0;
var topZ = 0;

$(document).ready(function() {
	
	$("#name").keyup(function(event){
    if(event.keyCode == 13){
        $("#butAddChannel").click();
    }
	});

	var colBackground = document.getElementById('colBackground');
	colBackground.addEventListener("change", colBackgroundChange, false);
	var colWindowEdge = document.getElementById('colWindowEdge');
	colWindowEdge.addEventListener("change", colWindowEdgeChange, false);

});

function colBackgroundChange(event) {
	//$('#inner').css('background-color', event.target.value);
	var style = $('<style>#inner { background-color: '+event.target.value+'; }</style>');
	$('html > head').append(style);
}
function colWindowEdgeChange(event) {
	//$('#inner').find('.frame').css('background-color', event.target.value);
	var style = $('<style>.frame { background-color: '+event.target.value+'; }</style>');
	$('html > head').append(style);
}

function addChannel() {
	
	var channelName = $("#name").val();
	var height = 400;
	var width = height * 1.64;
	
	var frameheight = height + 54;
	var framewidth = width + 54;
	
	var buttonpos = width + 29;
	
	$("#inner").append(`
		<div id='field` + i + `d' 
			 class='frame' 
			 style='height:` + frameheight + `; 
				width:` + framewidth + `; 
				z-index:` + topZ + `'
			 onresize='resize(this)' 
			 onmouseenter='showFrame(this)'
			 onmouseleave='hideFrame(this)'
			 onmousedown='putToFront(this)'>
			 <label class='labelChannelName'>` + channelName + `</label>
			 <button class='end' style='left:` + buttonpos + `;' onclick='removeElement(this)'>✕</button>
			 <iframe class='twitchfield' 
				src='https://player.twitch.tv/?channel=` + channelName + `' 
				frameborder='0' 
				scrolling='no' 
				allowfullscreen='true'
				height='` + height + `' 
				width='` + width + `'>
			 </iframe>
			 <div class='iframeShield'></div>
		</div>
	`);
	$("#field" + i + "d").draggable({
		start: function () {
			$(".iframeShield").css('visibility', 'visible')
		},
		stop: function () {
			$(".iframeShield").css('visibility', 'hidden')
		}
	});
	$("#field" + i + "d").resizable({
		start: function () {
			$(".iframeShield").css('visibility', 'visible')
		},
		stop: function () {
			$(".iframeShield").css('visibility', 'hidden')
		}
	});
	hideFrame("#field" + i + "d");
	i = i+1;
	topZ = topZ + 1;
}

function addChat() {
	
	var channelName = $("#name").val();
	var height = 400
	var width = height * 0.7;
	
	var frameheight = height + 54;
	var framewidth = width + 54;
	
	var buttonpos = width + 29;
	
	$("#inner").append(`
		<div id='field` + i + `d' 
			class='frame' 
			style='height:` + frameheight + `; 
				width:` + framewidth + `; 
				z-index:` + topZ + `'
			onresize='resize(this)' 
			onmouseenter='showFrame(this)'
			onmouseleave='hideFrame(this)'
			onmousedown='putToFront(this)'>
			<label class='labelChannelName'>` + channelName + `</label>
			<button class='end' style='left:` + buttonpos + `;' onclick='removeElement(this)'>✕</button>
			<iframe class='twitchfield' 
				src='https://www.twitch.tv/embed/` + channelName + `/chat?darkpopout'
				id='` + channelName + `' 
				frameborder='0' 
				scrolling='no' 
				height='` + height + `' 
				width='` + width + `'>
			</iframe>
			<div class='iframeShield'></div>			
		</div>
	`);
	//$("#inner").append("<div id='field" + i + "d' class='frame' style='height:" + frameheight + "; width:" + framewidth + "; z-index:" + topZ + "' onresize='resize(this)' onclick='putToFront(this)'>" + channelName + " chat<button class='end' style='left:" + buttonpos + ";' onclick='removeElement(this)'>✕</button><iframe class='twitchfield' src='https://twitch.tv/" + channelName + "/chat' frameborder='0' scrolling='no' height='" + height + "' width='" + width + "'></iframe></div>");
	$("#field" + i + "d").draggable({
		start: function () {
			$(".iframeShield").css('visibility', 'visible')
		},
		stop: function () {
			$(".iframeShield").css('visibility', 'hidden')
		}
	});
	$("#field" + i + "d").resizable({
		start: function () {
			$(".iframeShield").css('visibility', 'visible')
		},
		stop: function () {
			$(".iframeShield").css('visibility', 'hidden')
		},
		handles:'n, e, s, w, ne, se, sw, nw'
	});
	hideFrame("#field" + i + "d");
	i = i+1;
	topZ = topZ + 1;
}

function putToFront(ele) {
	$(ele).css("z-index", topZ);
	topZ = topZ + 1;
}

function showFrame(ele) {
	if ($('#inner').find('.frame').hasClass('ui-draggable-dragging') === false && $('#inner').find('.frame').hasClass('ui-resizable-resizing') === false) {
		$(ele).css('background-color', document.getElementById('colWindowEdge').value);
		$(ele).find('label').css('display', 'block');
		$(ele).find('button').css('display', 'block');
		$(ele).find('div:not(.iframeShield)').css('display', 'block');
	}
}

function hideFrame(ele) {
	if ($('#inner').find('.frame').hasClass('ui-draggable-dragging') === false && $('#inner').find('.frame').hasClass('ui-resizable-resizing') === false) {
		$(ele).css('background-color', 'transparent');
		$(ele).find('label').css('display', 'none');
		$(ele).find('button').css('display', 'none');
		$(ele).find('div:not(.iframeShield)').css('display', 'none');
	} else {
		showFrame(ele);
	}
}

function removeElement(ele) {
	$(ele).parent().remove();
}

function resize(ele) {
	var height = $(ele).height() - 54;
	var width = $(ele).width() - 54;
	var butpos = width+29;
	$(ele).find("iframe").css({"height":height, "width": width});
	$(ele).find("button").css("left",butpos);
}
