$(document).ready(function(){
	//팝업창 닫기
	$(document).on('mousedown touchstart focusin', function(e){
		//console.log(e.target);
		if($(e.target).closest(".lybg .inner").length === 0) {
			$(e.target).closest(".lybg").remove();
			//$("body", window.parent.document).removeClass("ovf_hdn");
		}
	});

	parent.loadFrame();
});

//iframe 로드 이벤트
$(window).load(function(){
	parent.loadFrame();
});
var lycnt = 0;
var layer_pop = function(url, name, width, height, target){
	var doc = $("body", window.parent.document);
	var bg, inDiv, div, frameTit, iframe;

	if(target == "self"){
		var bg = $(".lybg", window.parent.document);
		var bgLen = bg.length;
		if(bgLen > 0){
			bg.eq(bgLen - 1).find(".lytit strong").html(name);
			bg.eq(bgLen - 1).find("iframe").attr("src", url);
		}
	}else{
		//Backgroud
		bg = $("<div />", {
			"class":"lybg",
		});
		//Layer Box
		inDiv = $("<div />", {
			"class" : "inner"
		});
		//Layer in Div
		div = $("<div />");
		//Layer Title
		frameTit = $("<div />",{
			"class" : "lytit"
		});
		frameTit.html('<strong>'+name+'</strong><a href="javascript:void(0);" class="close" onclick="javascript:close_layer();">닫기</a>');
		//iFrame
		iframe = $("<iframe name='' title='' src='"+url+"' width='100%' height='100%' frameborder='0' scrolling='no'>", {
			"class" : "ly_ifrm",
			"id" : "ly_ifrm"+lycnt
		});

		$("body").addClass("ovf_hdn");

		var tmp = inDiv.css({"width" : width, "height":"100%"}).append(div.append(frameTit).append(iframe));
		bg.append(tmp).appendTo(doc);

		$(".lybg .inner").css("height", $(".lybg").height() - 90);
		iframe.attr("height", $(".lybg .inner>div").height() - 67);
	}

	lycnt++;
}
var loadFrame = function(){
	var bg = $(".lybg");
	var bgLen = bg.length;
	if(bgLen > 0){
		var bgInner = bg.eq(bgLen - 1).find(".inner");
		$(bgInner).css("height", "auto");
		$(bgInner).find("iframe").attr("height", "100%");
		bg.eq(bgLen - 1).find("iframe").load(function(){
			var height = this.contentWindow.document.body.scrollHeight;
			$(bgInner).css("height", height + 67);
			//$(bgInner).find("iframe").attr("height", "100%");
			$(bgInner).find("iframe").attr("height", height);
		});
	}
}
var close_layer = function(){
	var bg = $(".lybg", window.parent.document);
	var bgLen = bg.length;
	if(bgLen == 1){
		$("body", window.parent.document).removeClass("ovf_hdn");
	}
	bg.eq(bgLen - 1).remove();
}

var resizeHeight = function(){
	var height = $("#pop_wrap").height();
	//console.log("height = "+height);

	$(".lybg .inner", window.parent.document).css("height", height + 67);
	$(".lybg .inner iframe", window.parent.document).attr("height", height);
}