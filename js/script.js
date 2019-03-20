var i = 0;
var topZ = 0;
var frameOffset = 54;
var buttonOffset = 29;

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

	var url = window.location.href;
	var param = url.split('?')[1];
	if (param) {
		console.log(param.split('&'));
	}
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

function addStreamFromButton() {
	var channelName = $("#name").val();
	var top = '50px';
	var left = '10px';
	var height = 400
	var width = height * 1.64;

	addStream(channelName, top, left, height, width);
}

function addStream(channelName, top, left, height, width) {
	var frameheight = height + frameOffset;
	var framewidth = width + frameOffset;
	
	var buttonpos = width + buttonOffset;
	
	$("#inner").append(`
		<div id='field` + i + `d' 
			 class='frame stream' 
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
	$("#field" + i + "d").css({top: top, left:left});
	i = i+1;
	topZ = topZ + 1;

	createPath();
}

function addChatFromButton() {
	var channelName = $("#name").val();
	var top = '50px';
	var left = '10px';
	var height = 400
	var width = height * 0.7;

	addChat(channelName, top, left, height, width);
}

function addChat(channelName, top, left, height, width) {
	
	var frameheight = height + frameOffset;
	var framewidth = width + frameOffset;
	
	var buttonpos = width + buttonOffset;
	
	$("#inner").append(`
		<div id='field` + i + `d' 
			class='frame chat' 
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
	$("#field" + i + "d").css({top: top, left:left});
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

function createPath() {
	var path = '//' + window.location.hostname + '/?';
	path += 'colBG=' + $('#colBackground')[0].value + '&';
	path += 'colWE=' + $('#colWindowEdge')[0].value + '&';
	path += 'streams=';
	$('#inner').find('.stream').each(function() {
		var channel = $(this).find('label')[0].innerHTML;
		var top = $(this).position().top;
		var left = $(this).position().left;
		var height = $(this).height() - frameOffset;
		var width = $(this).width() - frameOffset;
		var z = $(this)[0].style.zIndex;
		var pathPart = channel + '-' + top + '-' + left + '-' + height + '-' + width + '-' + z;
		path += pathPart + ';';
	});
	//window.history.replaceState(null,null, path);
}