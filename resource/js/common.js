var svTarget, itemClass = ".item", svCnt = 0, item = 1;
$(document).ready(function(){
	//Viewport 체크
	viewportChk();
	//글자수 체크
	chklength();
	if(browser() == "Firefox"){
		keyUpTrigger();
	}
	//첨부파일
	chkfile();
	//대상찾기 버튼 높이값 조정
	reisizeHeight();
	//등록폼 제목 Decoration...
	setTitleDeco();
	/* 기간설정 초기 설정 */
	//Notice
	setDate("#lnb_date01", "#lnb_date02");
	//게시시작일, 게시종료일
	//setDate("#post_start", "#post_end");
	setDatePeriod("#post_start", "#post_end");
	//검색 옵션
	setDate("#opt_start", "#opt_end");
	setDate(".opt_start", ".opt_end");
	//Board
	setDate(".date_start", ".date_end", 30);
	//분류관리
	makeSelect(window.innerWidth);
	//모바일 badge
	mBadge();
	//responsive table
	mTbl(window.innerWidth);

	//iOS hover event
	if(mobilecheck()){
		$('*').click(function(){});
		$('html').css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
	}

	/* IE */
	if(browser() == "IE"){
		$(".btn span").bind({
			"mousedown" : function(){
				$(this).closest(".btn").addClass("active");
			},
			"mouseup" : function(){
				$(this).closest(".btn").removeClass("active");
			}
		});
	}

	//To-Do Slide
	var todoSlideOpts = "";
	var todoSlide = $(".todo_list").slick({infinite: true, slidesToShow: 4, slidesToScroll: 4, dots: false, responsive:[{breakpoint:768, settings:{slidesToShow: 3, slidesToScroll: 3, arrows:false, dots: true}}]});
	//To-Do
	$(".top_btn_message").bind({
		"click" : function(e){
			e.preventDefault();

			var $this = $(this);
			var target = ".todo_wrap";
			$(target).slideToggle(150, function(){
				if($(this).is(":hidden")){
					$this.removeClass("on");
				}else{
					$this.addClass("on");
					todoSlide.slick('destroy').slick({infinite: true, slidesToShow: 4, slidesToScroll: 4, dots: false, responsive:[{breakpoint:768, settings:{slidesToShow: 3, slidesToScroll: 3, arrows:false, dots: true}}]});
				}
			});
		}
	});

	//Top Navigation
	$(".tnavi li a").bind({
		"mouseover focusin" : function(){
			var span = $(this).find("span");
			var spanW = span.outerWidth();
			span.css({"margin-left":(spanW/2) * -1})
		}
	});

	//System Map
	var body = $("body");
	var sysTarget = ".sysmap_wrap";
	var sysBtn = ".top_btn_system";
	var sysBg = ".sysmap_bg";
	var sysCon = ".sysmap";
	var sysClose = ".sysmap_close";
	$(sysBtn).live({
		"click" : function(e){
			e.preventDefault();

			if($(sysTarget).hasClass("show")){
				$(this).removeClass("on");
				$(sysTarget).removeClass("show");
				body.removeClass("ovf_hdn");
				$(sysTarget).stop().animate({"left":"100%"}, 150);
			}else{
				$(this).removeClass("on").addClass("on");
				$(sysTarget).addClass("show");
				body.addClass("ovf_hdn");
				$(sysTarget).stop().animate({"left":"0"}, 150);
			}
		}
	});
	//System Map BG event
	$(sysBg).live({
		"click" : function(){
			$(sysTarget).stop().animate({"left":"100%"}, 150, function(){
				$(".top_btn_system").removeClass("on");
				$(sysTarget).removeClass("show");
				body.removeClass("ovf_hdn");
			});
		}
	});
	$(sysClose).live({
		"click" : function(e){
			e.preventDefault();

			$(sysBg).trigger("click");
		}
	});
	//System Map Tree
	//sysMapTree("#sys_favorite");

	//상단 검색
	var schBtn = ".top_btn_search";
	var schBox = ".hd_sch";
	var schBg = ".hd_sch_bg";
	$(schBtn).on({
		"click" : function(e){
			e.preventDefault();

			var $this = $(this);
			var target = schBox;

			$(target).slideToggle(150, function(){
				if($(this).is(":hidden")){
					$this.removeClass("on");
					$(schBg).fadeOut(150, function(){
						$(this).remove();
					});
					$(target).find("input[type=text]").val("");
				}else{
					$this.addClass("on");
					$("<div class='"+schBg.replace(".","").replace("#", "")+"' />").appendTo($("body")).fadeIn(150);
				}
			});
		}
	});
	$(document).on("click", schBg, function(){
		$(schBox).slideUp(150, function(){
			$(schBg).fadeOut(150, function(){
				$(this).remove();
			});
			$(schBox).find("input[type=text]").val("");
		});
		$(schBtn).removeClass("on");
	});

	//자동완성기능
	hasDataAttr("[data-auto-comp]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), autoCmpBox = $(this).data("auto-comp");
			$this.live({
				"focusin keyup" : function(){
					if($this.val() != ""){
						$(autoCmpBox, $this.parent()).show();
					}else{
						$(autoCmpBox, $this.parent()).hide();
					}
				}
			});
			$(document).on('mousedown touchstart focusin', function(e){
				//console.log(e.target);
				if($(e.target).closest($(autoCmpBox).parent('div')).length === 0) {
					$(autoCmpBox).hide();
				}
			});
		});
	});

	//Design Selectbox
	$(".w70").selectOrDie({customClass: $(".w70").attr("class"), size: 10});
	$(".w99").selectOrDie({customClass: $(".w99").attr("class"), size: 10});
	$(".w104").selectOrDie({customClass: $(".w104").attr("class"), size: 10});
	$(".w121").selectOrDie({customClass: $(".w121").attr("class"), size: 10});
	$(".w170").selectOrDie({customClass: $(".w170").attr("class"), size: 10});
	$(".w260").selectOrDie({customClass: $(".w260").attr("class"), size: 10});
	$(".w100p").selectOrDie({customClass: $(".w100p").attr("class"), size: 10});
	$(".sch_sel").selectOrDie({customClass: $(".sch_sel").attr("class"), size: 10});
	/*
	$(".w70, .w99, .w104, .w121, .w170, .w260, .w100p, .sch_sel").each(function(){
		$(this).selectOrDie({customClass: $(this).attr("class"), size: 10});
	});
	*/

	//Treeview
	$(".treeview>ul>li span").bind({
		"click" : function(e){
			//e.preventDefault();
			if($(this).next("ul").length > 0){
				$(this).next("ul").slideToggle("fast");
				$(this).toggleClass("open");
			}
		}
	});

	//LNB 기간 - 직접 입력
	hasDataAttr("[data-lnb-period]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("lnb-period");
			$this.bind({
				"click" : function(){
					var dataObj = val.target;
					var dataDisplay = val.display;

					dataDisplay == "show" ? $(dataObj).slideDown('fast') : $(dataObj).slideUp('fast');
				}
			});
		});
	});

	//게시대상
	hasDataAttr("[data-target-toggle]", function($ele){
		$ele.each(function(){
			var $this = $(this), data = $(this).data("target-toggle");
			$this.bind({
				"click" : function(){
					var dataEle = data.ele;
					var dataDispaly = data.display;
					var checked = data.check;
					/*
						show : target show
						hide : target hide
						all_show : target all show
						all_hide : target all hide
					*/
					var dataEle02 = data.ele02;
					if(!checked){
						dataDispaly == "show" ? $(dataEle).show() : $(dataEle).hide();
						if(dataEle02 !="" && dataEle02 != null){
							dataDispaly == "show" ? $(dataEle02).hide() : $(dataEle02).show();
						}
						if(dataDispaly != "" && dataDispaly != null){
							if(dataDispaly == "all_hide"){
								$(dataEle).hide();
								$(dataEle02).hide();
							}
						}
					}else{
						if($this.prop("checked")){
							$(dataEle).show();
						}else{
							 $(dataEle).hide();
						}
					}
					reisizeHeight();
				}
			});
		});
	});

	//Check All
	var form = function(){
		var setLabel = function(clz){
			if($(clz + ' input').length){
				$(clz).each(function(){
					$(this).removeClass('on');
					$(this).removeClass('on_disabled');
					$(this).removeClass('disabled');
				});
				$(clz + ' input:checked').each(function(){
					$(this).parent('label').addClass('on');
				});
				$(clz + ' input:disabled').each(function(){
					if ($(this).prop('checked')){
						$(this).parent('label').addClass('on_disabled');
					}else{
						$(this).parent('label').addClass('disabled');
					}
				});
			}
		}

		setLabel('.label_check');
		setLabel('.label_radio');
		$('.label_check').click(function(e){
			setLabel('.label_check');
			e.stopPropagation();
		});
		$('.label_radio').click(function(e){
			setLabel('.label_radio');
			e.stopPropagation();
		});
		hasDataAttr('[data-check-all]',function($ctx){
			$ctx.each(function(){
				//var $input = $(this).find('input'), checkGroup = $(this).data('check-all');
				var $input = $(this).siblings('input'), checkGroup = $(this).data('check-all');

				$input.on('click',function(){
					var val = $input.prop('checked'), bool;
					if(val){
						//bool = false;
						bool = true;
					}else{
						//bool = true;
						bool = false;
					}

					$('[data-check-group="' + checkGroup + '"]').each(function(){
						//$(this).find('input').prop('checked',bool);
						$(this).siblings('input').prop('checked',bool);
					});
					setLabel('.label_check');
					setLabel('.label_radio');
				});
			});
		});

		hasDataAttr('[data-check-group]',function($ctx){
			$ctx.each(function(){
				//var $input = $(this).find('input'), checkAll = $(this).data('check-group');
				var $input = $(this).siblings('input'), checkAll = $(this).data('check-group');
				$input.on('click',function(){
					//$('[data-check-all="' + checkAll + '"]').find('input').prop('checked',false);
					var len = $('[data-check-group="' + checkAll + '"]').length;
					var chkLen = $('[data-check-group="' + checkAll + '"]').siblings('input:checked').length;

					if(len == chkLen){
						$('[data-check-all="' + checkAll + '"]').siblings('input').prop('checked',true);
					}else{
						$('[data-check-all="' + checkAll + '"]').siblings('input').prop('checked',false);
					}
					
					setLabel('.label_check');
					setLabel('.label_radio');
				});
			});
		});
	}
	form();
	//end Check All

	//게시 기간 설정 - 긴급
	hasDataAttr("[data-urgent]", function($ele){
		var date = $ele.data("urgent");
		$ele.each(function(){
			$(this).bind({
				"click" : function(){
					if($(this).prop("checked")){
						$(date).find(".date_tit").addClass("disable");
						$(date).removeClass("disable").addClass("disable");
						$(date).find("input[type=text]").addClass("disable").datepicker("disable");
						$(date).find("select").selectOrDie('disable');
					}else{
						$(date).find(".date_tit").removeClass("disable");
						$(date).removeClass("disable");
						$(date).find("input[type=text]").removeClass("disable").datepicker("enable");
						$(date).find("select").selectOrDie('enable');
					}
				}
			});
		});
		$(date).find("input[type=checkbox]").bind({
			"click" : function(){
				if($ele.prop("checked")){
					$(this).prop("checked", false);
				}
			}
		});
	});

	//기간 설정 오늘, 1주일, 1개월
	var target = ".tbl_opt .period .btn";
	$(target).bind({
		"click" : function(e){
			e.preventDefault();

			var start = "#opt_start, .opt_start";
			var end = "#opt_end, .opt_end";
			var val = $(this).attr("data-period");
			var period = $(this).closest(".period");
			var banner = false;
			if($(period).hasClass("mng_banner")){
				banner = true;
			}

			$(target).removeClass("on");
			$(this).toggleClass("on");

			switch (val){
			case "today" :		//오늘
				$(start).datepicker('setDate', new Date());
				$(end).datepicker('setDate', new Date());
			break;
			case "week" :			//일주일
				if(banner){
					$(start).datepicker('setDate', new Date());
					$(end).datepicker('setDate', setDateCal(7, "+"));
				}else{
					$(start).datepicker('setDate', setDateCal(7));
					$(end).datepicker('setDate', new Date());
				}
			break;
			case "month" :		//1개월
				if(banner){
					$(start).datepicker('setDate', new Date());
					$(end).datepicker('setDate', setDateCal(30, "+"));
				}else{
					$(start).datepicker('setDate', setDateCal(30));
					$(end).datepicker('setDate', new Date());
				}
			break;
			case "month3" :	//3개월
				if(banner){
					$(start).datepicker('setDate', new Date());
					$(end).datepicker('setDate', setDateCal(90, "+"));
				}else{
					$(start).datepicker('setDate', setDateCal(90));
					$(end).datepicker('setDate', new Date());
				}
			break;
			case "month6" :	//6개월
				if(banner){
					$(start).datepicker('setDate', new Date());
					$(end).datepicker('setDate', setDateCal(180, "+"));
				}else{
					$(start).datepicker('setDate', setDateCal(180));
					$(end).datepicker('setDate', new Date());
				}
			break;
			case "month12" :	//12개월
				if(banner){
					$(start).datepicker('setDate', new Date());
					$(end).datepicker('setDate', setDateCal(360, "+"));
				}else{
					$(start).datepicker('setDate', setDateCal(360));
					$(end).datepicker('setDate', new Date());
				}
			break;
			}
		}
	});

	//대상찾기 삭제 이벤트
	$(".target_tag .del").live({
		"click" : function(e){
			e.preventDefault();

			$(this).closest(".target_tag").remove();
			reisizeHeight();
		}
	});

	//Banner Slider
	hasDataAttr("[data-banner]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("banner"); 
			var itemShow = val.show;
			var itemScroll = val.scroll;
			$(this).slick({
				autoplay: true,
				dots: true,
				infinite: true,
				slidesToShow: itemShow,
				slidesToScroll: itemShow,
				arrows: false,
				responsive:[{
					breakpoint:768,
					settings:{
						slidesToShow:1,
						slidesToScroll:1,
						infinite: true,
						dots: true
					}
				}]
			});
		});
	});
	hasDataAttr("[data-main-banner]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("main-banner"); 
			var itemShow = val.show;
			var itemScroll = val.scroll;
			$(this).slick({
				autoplay: true,
				dots: true,
				infinite: true,
				slidesToShow: itemShow,
				slidesToScroll: itemShow,
				arrows: false,
				responsive:[{
					breakpoint:1217,
					settings:{
						slidesToShow:4,
						slidesToScroll:4,
						infinite: true,
						dots: true
					}
				},{
					breakpoint:768,
					settings:{
						slidesToShow:1,
						slidesToScroll:1,
						infinite: true,
						dots: true
					}
				}]
			});
		});
	});

	//Basic Datepicker
	hasDataAttr("[data-datepicker]", function($ele){
		$ele.each(function(){
			$(this).datepicker({
				showOn: 'both',
				buttonImage : '/resource/images/common/ico_cal.png',
				buttonImageOnly : true,
				buttonText: '날짜 선택',
				//changeMonth: true,
				//changeYear: true,
				//showButtonPanel: true,
				closeText: closeText,
				dateFormat: dateFormat,
				dayNames: dayNames,
				dayNamesMin: dayNamesMin,
				monthNames: monthNames,
				monthNamesShort: monthNamesShort,
				showOtherMonths: true,
				selectOtherMonths: true,
				showMonthAfterYear: true
			});
			//$(this).datepicker('setDate', new Date());
		});
	});

	//Notice interface
	$(".notibox>ul>li").each(function(idx){
		$(this).bind({
			"mouseenter" : function(){
				var idx = $(this).index();
				idx = idx + 1;
				var width = $(this).width() * idx;
				var leftPos = width - 140;
				//$(this).find(".noti_layer").stop().slideDown("fast");
				$(this).find(".noti_layer").show();
				$(this).find(".point").css({"left" : leftPos+"px"});
			},
			"mouseleave" : function(){
				//$(this).find(".noti_layer").stop().slideUp("fast");
				$(this).find(".noti_layer").hide();
			}
		});
	});

	//배너관리 리스트 순서 변경
	hasDataAttr("[data-tbl-sort]", function($ele){
		var $this = $ele, data = $ele.data("tbl-sort");
		var up = data.up, down = data.down;
		$(up).each(function(idx){
			$(this).bind({
				"click" : function(e){
					e.preventDefault();
					var $tr = $(this).closest("tr");
					$tr.prev().before($tr);

					//Number Sorting
					numbering($this);
					//Controller Sorting
					controll($this);
				}
			});
		});
		$(down).each(function(idx){
			$(this).bind({
				"click" : function(e){
					e.preventDefault();
					var $tr = $(this).closest("tr");
					$tr.next().after($tr);

					//Number Sorting
					numbering($this);
					//Controller Sorting
					controll($this);
				}
			});
		});
	});

	//연관검색어 fold/unfold
	$(".related_sch .more").bind({
		"click" : function(e){
			e.preventDefault();

			var dl = $(this).closest(".related_sch").find("dl");
			$(this).toggleClass("on");
			dl.toggleClass("active");
		}
	});
	//Scroll To Top
	$(".totop").bind({
		"click" : function(e){
			e.preventDefault();

			$("html, body").stop().animate({scrollTop:"0"}, 150);
		}
	});

	//검색 옵션 초기화
	$(".resetBtn").click(function(e){
		e.preventDefault();

		resetOptions(".reset_area");
	});

	//오늘 하루 이창 열지 않음
	$("#today").bind({
		"click" : function(){
			var chk = $(this).prop("checked");
			var name = $(this).attr("name");
			deleteCookie(name);
			if(chk){
				setCookie(name, "done" , 1);
			}
		}
	});

	//****************************** 설문 *************************************//
	changeOrder();						//항목 순서변경 활성
	survey_numbering();			//항목 넘버링
	deletion();								//항목 삭제 활성
	addItem();								//문항별 항목 추가/삭제
	addEtc();								//기타항목 추가/삭제
	delItem();								//항목 삭제
	upload_desc_img();				//설문 항목 설명 이미지 업로드
	//설문 문항 추가
	$("#addSurvey").bind({
		"click" : function(e){
			e.preventDefault();

			svTarget = $("#surveyItem");
			var val = $(".sv_ctrl input:checked").val(), baseUrl = "./survey/", url;

			switch (val){
			case 'O':		//단일
				url = "type-single.html";
			break;
			case 'M':	//다중
				url = "type-multiple.html";
			break;
			case 'S':	//단답
				url = "type-short.html";
			break;
			case 'E':	//서술
				url = "type-desc.html";
			break;
			case 'F':	//파일
				url = "type-file.html";
			break;
			case 'I':	//이미지
				url = "type-image.html";
			break;
			}

			survey.add(baseUrl+url, val);
		}
	});
});
//END Document Ready
var time;
$(window).resize(function(){
	//대상찾기 버튼 높이값 조정
	reisizeHeight();
	//Viewport 체크
	viewportChk();
	//모바일 badge
	mBadge();

	clearInterval(time);
	time = setInterval(function(){
		clearInterval(time);
		//분류관리
		makeSelect(window.innerWidth);

		$(".w70").selectOrDie("destroy").selectOrDie({customClass: $(".w70").attr("class"), size: 10});
		$(".w99").selectOrDie("destroy").selectOrDie({customClass: $(".w99").attr("class"), size: 10});
		$(".w104").selectOrDie("destroy").selectOrDie({customClass: $(".w104").attr("class"), size: 10});
		$(".w121").selectOrDie("destroy").selectOrDie({customClass: $(".w121").attr("class"), size: 10});
		$(".w170").selectOrDie("destroy").selectOrDie({customClass: $(".w170").attr("class"), size: 10});
		$(".w260").selectOrDie("destroy").selectOrDie({customClass: $(".w260").attr("class"), size: 10});
		$(".w100p").selectOrDie("destroy").selectOrDie({customClass: $(".w100p").attr("class"), size: 10});
		$(".sch_sel").selectOrDie("destroy").selectOrDie({customClass: $(".sch_sel").attr("class"), size: 10});
	}, 300);

	//responsive table
	mTbl(window.innerWidth);
});
//End Window Resize

//HasData
var hasDataAttr = function(ctx, func){
	if($(ctx).length){
		var $ctx = $(ctx);
		if(func !== undefined){
			func($ctx);
		}else{
			console.log('callback function is not defined.');
		}
	}
}
//대상찾기 리스트 처리
var reisizeHeight = function(){
	hasDataAttr("[data-target-box]", function($ele){
		$ele.each(function(){
			var $this = $(this), val = $this.data("target-box");
			var height = $this.outerHeight();
			$('[data-target-box-button='+val+']').css({"height":(height-2),"line-height":(height-2)+"px"});
		});
	});
}
//글자수 체크
var chklength = function(){
	hasDataAttr("[data-chk-length]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("chk-length");
			$this.live({
				"keyup" : function(e){
					var textarea = $(this).find("textarea, input[type=text]");
					if(textarea.length > 0){
						var textareaVal = $(this).find("textarea, input[type=text]").val();
						var textareaLen = textareaVal.length;
						var byteNum = 0, len = 0;

						var txt = $(this).find(".byte span");
						var maxLen = eval($(this).find(".count").text());

						for(var i = 0; i < textareaLen; i++){
							c = textareaVal.charAt(i);
							if(escape(c).length > 4){
								byteNum += 2;
							}else{
								byteNum++;
							}

							if(byteNum <= maxLen){
								len = i + 1;
							}
						}

						txt.html(byteNum);
						if(byteNum > maxLen){
							var substrTxt = textareaVal.substr(0, len);
							//alert(len + "자를 초과 입력 할 수 없습니다.");
							textarea.val(substrTxt);
							txt.html(maxLen);
							return false;
						}
					}
				}
			}).trigger("keyup");
		});
	});
}
var keyUpTrigger = function(){
	$('[data-chk-length]').find("input, textarea").each(function(idx){
		var $this = $(this);
		$this[0].checkKeyEvt = undefined;
		$this[0].existValue = undefined;
	});

	$('[data-chk-length]').find("input, textarea").on('focus blur', function(e){
			var $this = $(this);
			var watcher = function(){
				if($this[0].existValue != $this.val()){
				$this.trigger('keyup');
			}
			$this[0].existValue = $this.val();
			if($this[0].checkKeyEvt) clearInterval($this[0].checkKeyEvt);
			$this[0].checkKeyEvt = setInterval(watcher, 100);
		};
		if(e.type == 'focus'){
			if(!$this[0].checkKeyEvt) watcher();
		}else if(e.type == 'blur'){
			if($this[0].checkKeyEvt){
				clearInterval($this[0].checkKeyEvt);
				$this[0].checkKeyEvt = undefined;
			}
		}
	});
};
//첨부파일
var chkfile = function(){
	hasDataAttr("[data-file-box]", function($ele){
		$ele.each(function(){
			var $this = $(this);
			var data = $this.data("file-box");
			var $btn =$this.find("label"); 
			var $file = $this.find("input[type=file]");
			var $txt = $this.find("input[type=text]");
			var $txt02 = $this.find(data);
			$file.bind({
				"change" : function(e){
					var val = $file.val();
					if(data =="" || data == null){
						$txt.val(e.target.files[0].name);
					}else{
						$txt02.removeClass("filename").addClass("filename");
						$txt02.text(e.target.files[0].name);
					}
				}
			});
		});
	});
}

//기간 설정
var disabled_start, disabled_end;
var dateFormat = "yy.mm.dd", closeText = "닫기",
dayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
dayNamesMin = ['월', '화', '수', '목', '금', '토', '일'],
monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
monthNamesShort = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
function setDate(startDate, endDate, day){
	/*
	startDate : input 의 class 또는 id(string)
	endDate : input 의 class 또는 id(string)
	day : 날짜계산
	*/
	//Datepicker
	var from = $(startDate).datepicker({
		showOn: 'both',
		buttonImage : '/resource/images/common/ico_cal.png',
		buttonImageOnly : true,
		buttonText: '날짜 선택',
		//changeMonth: true,
		//changeYear: true,
		//showButtonPanel: true,
		closeText: closeText,
		dateFormat: dateFormat,
		dayNames: dayNames,
		dayNamesMin: dayNamesMin,
		monthNames: monthNames,
		monthNamesShort: monthNamesShort,
		showOtherMonths: true,
		selectOtherMonths: true,
		showMonthAfterYear: true
	}).on('change', function(){
		to.datepicker("option", "minDate", getDate(this));
	}),
	to = $(endDate).datepicker({
		showOn: 'both',
		buttonImage : '/resource/images/common/ico_cal.png',
		buttonImageOnly : true,
		buttonText: '날짜 선택',
		//changeMonth: true,
		//changeYear: true,
		//showButtonPanel: true,
		closeText: closeText,
		dateFormat: dateFormat,
		dayNames: dayNames,
		dayNamesMin: dayNamesMin,
		monthNames: monthNames,
		monthNamesShort: monthNamesShort,
		showOtherMonths: true,
		selectOtherMonths: true,
		showMonthAfterYear: true
	}).on('change', function(){
		from.datepicker("option", "maxDate", getDate(this));
	});

	if($(startDate).val() == ''){
		from.datepicker('setDate', new Date());
	}else{
		from.datepicker('setDate', new Date($(startDate).val()));
	}
	if($(endDate).val() == ''){
		to.datepicker('setDate', new Date());
	}else{
		to.datepicker('setDate', new Date($(endDate).val()));
	}

	if(day > 0){
		from.datepicker('setDate', setDateCal(day));
	}

	function getDate(element){
		var date;
		try{
			date = $.datepicker.parseDate(dateFormat, element.value);
		}catch(error){
			date = null;
		}
		return date;
	}
}
//게시 시작일, 게시 종료일 설정
function setDatePeriod(startDate, endDate){
	var from = $(startDate).datepicker({
		showOn: 'both',
		buttonImage : '/resource/images/common/ico_cal.png',
		buttonImageOnly : true,
		buttonText: '날짜 선택',
		closeText: closeText,
		dateFormat: dateFormat,
		dayNames: dayNames,
		dayNamesMin: dayNamesMin,
		monthNames: monthNames,
		monthNamesShort: monthNamesShort,
		showOtherMonths: true,
		selectOtherMonths: true,
		showMonthAfterYear: true,
		minDate: new Date()
	}).on('change', function(){
		to.datepicker("option", "minDate", getDate(this));
	}),
	to = $(endDate).datepicker({
		showOn: 'both',
		buttonImage : '/resource/images/common/ico_cal.png',
		buttonImageOnly : true,
		buttonText: '날짜 선택',
		closeText: closeText,
		dateFormat: dateFormat,
		dayNames: dayNames,
		dayNamesMin: dayNamesMin,
		monthNames: monthNames,
		monthNamesShort: monthNamesShort,
		showOtherMonths: true,
		selectOtherMonths: true,
		showMonthAfterYear: true,
		minDate: new Date()
	}).on('change', function(){
		from.datepicker("option", "maxDate", getDate(this));
	});

	if($(startDate).val() == ''){
		from.datepicker('setDate', new Date());
	}
	if($(endDate).val() == ''){
		to.datepicker('setDate', setDateCal(1095, "+"));
	}

	function getDate(element){
		var date;
		try{
			date = $.datepicker.parseDate(dateFormat, element.value);
		}catch(error){
			date = null;
		}
		return date;
	}
}
//날짜 계산
function setDateCal(d, as, s){
	/*
	d : day(int)
	as : 덧셈, 뺄셈
	s : seperate
	*/
	var from_year, from_month, from_day;
	if(s == null || s == ""){
		s = ".";
	}
	var date = new Date();
	var from;
	if(as == "+"){
		from = new Date(Date.parse(date) + (d * 1000 * 60 * 60 * 24));
	}else{
		from = new Date(Date.parse(date) - (d * 1000 * 60 * 60 * 24));
	}
	//var from = new Date(Date.parse(date) - (d * 1000 * 60 * 60 * 24));

	from_year = from.getFullYear();
	if(from.getMonth() < 9){
		from_month = '0' + (from.getMonth()+1);
	}else{
		from_month = from.getMonth()+1;
	}
	if(from.getDate() < 9){
		from_day = '0'+from.getDate();
	}else{
		from_day = from.getDate();
	}
	return from_year + s + from_month + s + from_day;
}
//Detect Browser
var browser = function() {
	// Return cached result if avalible, else get result then cache it.
	if (browser.prototype._cachedResult)
		return browser.prototype._cachedResult;

	// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	// Chrome 1+
	var isChrome = !!window.chrome && !isOpera;
	// At least IE6
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	return browser.prototype._cachedResult =
		isOpera ? 'Opera' :
		isFirefox ? 'Firefox' :
		isSafari ? 'Safari' :
		isChrome ? 'Chrome' :
		isIE ? 'IE' :
		isEdge ? 'Edge' :
		"Don't know";
};
//Detect Browser Version
function getInternetExplorerVersion(){
	var rv = -1; // Return value assumes failure.
	if(navigator.appName == 'Microsoft Internet Explorer'){
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if(re.exec(ua) != null) rv = parseFloat(RegExp.$1);
	}
	return rv;
}

//Mobile Detect
var mobilecheck = function(){
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|ad|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};
//등록폼 제목 Decoration
function setTitleDeco(){
	//텍스트 볼드 Set
	hasDataAttr("[data-text-bold]", function($ele){
		$ele.each(function(){
			var $this = $(this), data = $(this).data("text-bold");
			$this.bind({
				"click" : function(e){
					e.preventDefault();

					$this.toggleClass("on");
					$this.hasClass("on") ? $("input[name=text_bold]").val("true") : $("input[name=text_bold]").val("");
					$this.hasClass("on") ? $("[data-text-deco="+data+"]").css({"font-weight":"bold"}) : $("[data-text-deco="+data+"]").css({"font-weight":"normal"});
				}
			});
		});
	});
	//텍스트 컬러 Set
	hasDataAttr("[data-text-color]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), $thisChild = $(this).find(">span"), data = $(this).data("text-color");
			$($this, $thisChild).spectrum({
				allowEmpty:true,
				showInitial: true,
				showPalette: true,
				showSelectionPalette: true,
				palette: [
					["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", /*"rgb(153, 153, 153)","rgb(183, 183, 183)",*/
					"rgb(204, 204, 204)", "rgb(217, 217, 217)", /*"rgb(239, 239, 239)", "rgb(243, 243, 243)",*/ "rgb(255, 255, 255)"],
					["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
					"rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
					["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
					"rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
					"rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
					"rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
					"rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
					"rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
					"rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
					"rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
					/*"rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
					"rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",*/
					"rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
					"rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
				],
				change: function(color){
					if(color !=null && color !=""){
						//console.log("color = "+color);
						var val = color.toHexString();	// #ff0000
						var hex = color.toHex();				// ff0000
						$(".txt_color span").css({"border-bottom-color":val});
						$("#color_value").val(hex);
						$("[data-text-deco="+data+"]").css({"color":val});
					}
				}
			});
		});
	});
}
//Viewport Check
var viewportChk = function(){
	var w = $(window).width();
	var viewport = $('meta[name="viewport"]');

	var mobileLnb = $("#lnb .basic ul");
	var mobileLnbWidth = 20;

	if(w <= 1024){
		if(mobilecheck()){
			viewport.attr("content", "width=device-width, initial-scale=1");
		}else{
			viewport.attr("content", "width=1024");
		}
	}else{
		if(mobilecheck()){
			viewport.attr("content", "width=device-width, initial-scale=1");
		}else{
			viewport.attr("content", "width=1024");
		}
	}
	if(w < 768){
		//Mobile View LNB - mypage, board
		mobileLnb.find("li").not(".hm").each(function(){
			var oW = $(this).outerWidth(true);
			mobileLnbWidth = mobileLnbWidth + oW;
		});
		mobileLnb.width(mobileLnbWidth);

		//개별 커뮤니티 LNB Event
		$(".lnb_tit.vm").unbind("click").bind({
			"click" : function(){
				var navi = $(this).closest("#lnb").find(".treeview.comm");

				$(this).toggleClass("on");
				navi.slideToggle('fast');
			}
		});
	}else{
		mobileLnb.removeAttr("style");

		//개별 커뮤니티 LNB Event
		$(".lnb_tit.vm").unbind("click");
		if($("#lnb .treeview.comm").length > 0){
			$("#lnb .treeview.comm").removeAttr("style");
		}
	}
};
// Reset Numbering
var numbering = function(target){
	var $this = $(target), num = $this.find(".num"), tr = $this.find("tbody tr"), len = tr.length;

	var numArr = [];
	var numSortArr = [];
	for(var i=0; i < len; i++){
		numArr.push(num.eq(i).text());
	}
	//console.log(numArr);
	numSortArr = numArr.sort(function(a, b){return a-b});	//역순 정렬 : b-a,  정순 정렬 : a-b;
	//console.log(numSortArr);
	$.each(tr, function(idx){
		num.eq(idx).text(numSortArr[idx]);
	});
}
//Reset Controll Button
var controll = function(target){
	var $this = $(target), tr = $this.find("tbody tr"), len = tr.length, className = "disabled";

	tr.find(".up, .down").removeClass(className);
	tr.find("first").removeClass("first");
	tr.eq(0).find(".up").addClass(className);
	tr.eq(0).find(".orderby").addClass("first");
	
	tr.eq(len-1).find(".down").addClass(className);
}
//설문 넘버링
function survey_numbering(){
	if(svTarget == null || svTarget == ""){
		svTarget = $("#surveyItem");
	}
	var len = svTarget.find(itemClass).length;

	svTarget.find(itemClass).removeClass("first").removeClass("last").removeClass("one");
	svTarget.find(itemClass).each(function(idx){
		if((len -1) == 0){
			$(this).addClass("one");
		}else{
			if(idx == 0){
				$(this).addClass("first");
			}
			if(idx > 0){
				if(idx == (len - 1)){
					$(this).addClass("last");
				}
			}
		}
		$(this).find(".side .num").text(idx+1+".");
	});
}
//설문 문항 삭제
function deletion(){
	$(".del_item").bind({
		"click" : function(e){
			e.preventDefault();

			survey.del($(this));
		}
	});
}
//설문 문항 순서 변경
function changeOrder(){
	var upDown = $(".item_ctr");

	upDown.unbind("click").bind({
		"click" : function(e){
			e.preventDefault();

			var item = $(this).closest(itemClass);
			$(this).hasClass("item_up") > 0 ? item.prev().before(item) : item.next().after(item);

			//항목 넘버링
			survey_numbering();
			//문항 ID 변경
			changeId();
		}
	});
}
// 설문 ID 중복 체크
function chkId(html, type){
	var $this = $(html);
	var arr = [];
	var len = $("#surveyItem .item").length;
	$("#surveyItem .item").each(function(){
		var id = $(this).find(".sv_impt input").attr("id");
		// id = id.replace("svitem", "");
		id = id.replace("necessary", "");
		arr.push(id);
	});
	if(len > 0){
		var max = Math.max.apply(Math, arr);
		// svCnt = max+1;
		svCnt = len + 1;
	}

	var title = "title";
	var desc = "desc";
	var item = "item";
	var necessary = "necessary";
	var hidden = "qstnInqTypCd";
	var etc = "etc";

	var tmp = "svitem" + svCnt;
	var file = tmp + "_file";

	// Hidden Field
	var $hdn_txt = $this.find(".hdn_txt");
	$hdn_txt.attr("name", hidden + svCnt);
	$hdn_txt.val(type);

	// Hidden Field - etc
	var $hdn_etc = $this.find(".hdn_etc");
	$hdn_etc.attr("name", etc + svCnt);
	$hdn_etc.val("N");

	// 타이틀
	var $tit_txt = $this.find(".item_tit input");
	$tit_txt.attr("name", title + svCnt).attr("id", title + svCnt);

	// 설명
	var $desc_txt = $this.find(".item_con input, .item_con textarea");
	$desc_txt.attr("name", desc + svCnt).attr("id", desc + svCnt);

	// 답변, 기본 항목
	var $default_item_txt = $this.find(".answer input[type=text], .answer textarea");
	$default_item_txt.attr("name", item + svCnt + "_1").attr("id", item + svCnt + "_1");

	// 필수 체크
	var $necessary_chk = $this.find(".sv_impt input[type=checkbox]");
	$necessary_chk.attr("name", necessary + svCnt).attr("id", necessary + svCnt);

	var $necessary_label = $this.find(".sv_impt label");
	$necessary_label.attr("for", necessary + svCnt);

	$this.find(".answer input[type=radio]").attr("name", item + svCnt + "_1_chk").attr("id", item + svCnt + "_1_chk");
	$this.find(".answer input[type=radio] + label").attr("for", item + svCnt + "_1_chk");
	$this.find(".answer input[type=checkbox]").attr("id", item + svCnt + "_1_chk");
	$this.find(".answer input[type=checkbox] + label").attr("for", item + svCnt + "_1_chk");
	$this.find(".answer input[type=file]").attr("id", file).attr("name", file);
	$this.find(".answer input[type=file] + label").attr("for", file);

	return $this;
}
//설문 수정 시 ID 중복 체크
function chkId02(){
	$(".del_item02").bind({
		"click" : function(){
			$(this).closest(".item").remove();
			survey_numbering();

			var arr = [];
			var len = $("#surveyItem .item").length;

			var title = "title";
			var desc = "desc";
			var item = "item";
			var mndtItmYn = "mndtItmYn";
			var hidden = "qstnInqTypCd";
			var etc = "etc";
			//console.log("len ="+$(".sv_con .item").length);

			$(".sv_con .item").each(function(idx){
				var svCnt = idx + 1;
				var tmp = "svitem" + svCnt;
				var file = tmp + "_file";
				var id = $(this).find(".sv_impt input").attr("id");
				// id = id.replace("svitem", "");
				id = id.replace("mndtItmYn", "");
				//arr.push(id);

				// Hidden Field
				var $hdn_txt = $(this).find(".hdn_txt");
				$hdn_txt.attr("name", hidden + svCnt);

				// Hidden Field - etc
				var $hdn_etc = $(this).find(".hdn_etc");
				$hdn_etc.attr("name", etc + svCnt);

				// 타이틀
				var $tit_txt = $(this).find(".item_tit input");
				$tit_txt.attr("name", title + svCnt).attr("id", title + svCnt);

				// 설명
				var $desc_txt = $(this).find(".item_con input, .item_con textarea");
				$desc_txt.attr("name", desc + svCnt).attr("id", desc + svCnt);

				// 답변, 기본 항목
				var $default_item_txt = $(this).find(".answer input[type=text], .answer textarea");
				$default_item_txt.attr("name", item + svCnt + "_1").attr("id", item + svCnt + "_1");

				// 필수 체크
				var $necessary_chk = $(this).find(".sv_impt input[type=checkbox]");
				$necessary_chk.attr("name", mndtItmYn + svCnt).attr("id", mndtItmYn + svCnt);
				var $necessary_label = $(this).find(".sv_impt label");
				$necessary_label.attr("for", mndtItmYn + svCnt);
				$(this).find(".answer input[type=radio]").attr("name", item + svCnt + "_1_chk").attr("id", item + svCnt + "_1_chk");
				$(this).find(".answer input[type=radio] + label").attr("for", item + svCnt + "_1_chk");
				$(this).find(".answer input[type=checkbox]").attr("id", item + svCnt + "_1_chk");
				$(this).find(".answer input[type=checkbox] + label").attr("for", item + svCnt + "_1_chk");
				$(this).find(".answer input[type=file]").attr("id", file).attr("name", file);
				$(this).find(".answer input[type=file] + label").attr("for", file);
			});
		}
	});
}
// 설문 문항 추가/삭제
var survey = {
	add : function(url, type){
		svCnt = 0;
		item = 1;
		$.ajax({
			url: url,
			cache: false
		}).done(function(html){
			svCnt++;
			svTarget.append(chkId(html, type));

			changeOrder();					//항목 순서변경 활성
			survey_numbering();		//항목 넘버링
			deletion();							//항목 삭제 활성
			chklength();						//글자수 체크
			if(browser() == "Firefox"){
				keyUpTrigger();
			}
			chkfile();								//첨부파일
			addItem();							//문항별 항목 추가/삭제
			addEtc();							//기타항목 추가
			upload_desc_img();				//설문 항목 설명 이미지 업로드
		});
	},
	del : function(_this){
		_this.closest(itemClass).remove();
		survey_numbering();
	}
}
var addItem = function(){
	$(".add_article").unbind("click").bind({
		"click" : function(e){
			e.preventDefault();

			item++;

			var target = $(this).closest(".default");
			var parent = $(this).closest(".answer");
			var len = $(this).closest(".answer").find("input[type=text]").length;
			//console.log(len);

			if(len > 8){
				return;
			}

			// 기본 항목의 Text Field ID 값
			var cloneTxtId = target.find("input[type=text]").attr("id");
			cloneTxtId = cloneTxtId.substr(0, cloneTxtId.indexOf("_") + 1);

			// 기본 항목의 Radio, Checkbox ID 값
			var cloneChkId = target.find("input[type=radio], input[type=checkbox]").attr("id");
			cloneChkId = cloneChkId.substr(0, cloneChkId.indexOf("_") + 1);

			var clone = $(this).closest("p").clone().attr("class", "");
			clone.find("input[type=radio], input[type=checkbox]").attr("id", cloneChkId + item + "_chk");
			clone.find("label").attr("for", cloneChkId + item + "_chk");
			clone.find("input[type=text]").attr("name", cloneTxtId + item).attr("id", cloneTxtId + item);
			clone.find(".add_article").removeClass("add_article").addClass("del_article");
			clone.find(".add_etc").remove();

			// 역순 추가 4,3,2,1
			// target.prepend(clone);
			// target.find(".default input").val("");

			// 정순 추가 1,2,3,4
			target.before(clone);
			// prepend, append, before, after
			target.find("input").val("");

			/*
			이전 ver.
			parent.find("input[type=radio], input[type=checkbox]").each(function(idx){
				$(this).attr("id", cloneChkId + (idx + 1) + "_chk");
				$(this).next("label").attr("for", cloneChkId + (idx + 1) + "_chk");
			});
			parent.find("input[type=text]").each(function(idx){
				if($(this).hasClass("disable")){
					$(this).attr("name", cloneTxtId + (idx + 1) + "_etc").attr("id", cloneTxtId + (idx + 1) + "_etc");
				}else{
					$(this).attr("name", cloneTxtId + (idx + 1)).attr("id", cloneTxtId + (idx + 1));
				}
			});
			*/

			parent.find("input[type=radio], input[type=checkbox]").not(target.find("input[type=radio], input[type=checkbox]")).each(function(idx){
				$(this).attr("id", cloneChkId + (idx + 1) + "_chk");
				$(this).next("label").attr("for", cloneChkId + (idx + 1) + "_chk");
			});
			parent.find("input[type=text]").not(target.find("input[type=text]")).each(function(idx){
				if($(this).hasClass("disable")){
					$(this).attr("name", cloneTxtId + (idx + 1) + "_etc").attr("id", cloneTxtId + (idx + 1) + "_etc");
				}else{
					$(this).attr("name", cloneTxtId + (idx + 1)).attr("id", cloneTxtId + (idx + 1));
				}
			});
			chklength();
			if(browser() == "Firefox"){
				keyUpTrigger();
			}
			delItem();
		}
	});
}
var delItem = function(){
	$(".del_article").unbind("click").bind({
		"click" : function(e){
			e.preventDefault();

			var target = $(this).closest(".answer").find(".default");
			var parent = $(this).closest(".answer");

			//기본 항목의 Text Field ID 값
			var cloneTxtId = target.find("input[type=text]").attr("id");
			cloneTxtId = cloneTxtId.substr(0, cloneTxtId.indexOf("_") + 1);

			//기본 항목의 Radio, Checkbox ID 값
			var cloneChkId = target.find("input[type=radio], input[type=checkbox]").attr("id");
			cloneChkId = cloneChkId.substr(0, cloneChkId.indexOf("_") + 1);

			if($(this).closest("p").attr("class") == "etc"){
				$(this).closest(".item").find(".hdn_etc").val("N");

				$(this).closest("p").find(".add_etc").show();
				$(this).closest("p").find("input[type=text]").remove();
				$(this).closest("p").find(".byte").remove();
				$(this).closest("p").find(".del_article").remove();
			}else{
				$(this).closest("p").remove();
			}

			/*
			이전 ver.
			parent.find("input[type=radio], input[type=checkbox]").each(function(idx){
				$(this).attr("id", cloneChkId+(idx+1)+"_chk");
				$(this).next("label").attr("for", cloneChkId+(idx+1)+"_chk");
			});
			parent.find("input[type=text]").each(function(idx){
				if($(this).hasClass("disable")){
					$(this).attr("name", cloneTxtId+(idx+1)+"_etc").attr("id", cloneTxtId+(idx+1)+"_etc");
				}else{
					$(this).attr("name", cloneTxtId+(idx+1)).attr("id", cloneTxtId+(idx+1));
				}
			});
			*/
			parent.find("input[type=radio], input[type=checkbox]").not(target.find("input[type=radio], input[type=checkbox]")).each(function(idx){
				$(this).attr("id", cloneChkId+(idx+1)+"_chk");
				$(this).next("label").attr("for", cloneChkId+(idx+1)+"_chk");
			});
			parent.find("input[type=text]").not(target.find("input[type=text]")).each(function(idx){
				if($(this).hasClass("disable")){
					$(this).attr("name", cloneTxtId+(idx+1)+"_etc").attr("id", cloneTxtId+(idx+1)+"_etc");
				}else{
					$(this).attr("name", cloneTxtId+(idx+1)).attr("id", cloneTxtId+(idx+1));
				}
			});
		}
	});
}
// 기타항목추가
var addEtc = function(){
	$(".add_etc").unbind("click").bind({
		"click" : function(e){
			e.preventDefault();

			item++;

			var parent = $(this).closest(".etc");
			var defaultEle = $(parent).closest(".answer").find(".default");
			var defaultEleId = defaultEle.find("input[type=text]").attr("id");
			defaultEleId = defaultEleId.substr(0, defaultEleId.indexOf("_") + 1);
			/*
			이전 ver.
			var maxNum = $(parent).closest(".answer").find("input[type=text]").length + 1;
			*/
			var maxNum = $(parent).closest(".answer").find("input[type=text]").not(".default input[type=text]").length + 1;
			var inputTxt = $("<input />", {
				"type" : "text",
				"placeholder" : "기타 항목 추가",
				"class" : "disable",
				"disabled" : "disabled"
			}).appendTo(parent);

			var btn = $("<a />", {
				"href" : "#",
				"class" : "del_article"
			}).appendTo(parent);

			// var byteTxt = $('<span class="byte"><span>0</span>/<em class="count">126</em></span>').appendTo(parent);

			// parent.find("input[type=radio], input[type=checkbox]").attr("id", defaultEleId+"-"+item);
			// parent.find("label").attr("for", defaultEleId+"-"+item);
			parent.find("input[type=radio], input[type=checkbox]").remove();
			parent.find("label").remove();
			parent.find("input[type=text]").attr("name", defaultEleId + maxNum + "_etc").attr("id", defaultEleId + maxNum + "_etc");

			var $hdn_etc = $(this).closest(".item").find(".hdn_etc");
			$hdn_etc.val("Y");
			$(this).hide();
			chklength();
			if(browser() == "Firefox"){
				keyUpTrigger();
			}
			delItem();
		}
	});
	$(".sv_item .etc input[type=text]").live({
		"focusin" : function(){
			$(this).closest(".etc").find("input[type=radio], input[type=checkbox]").prop("checked", true);
		}
	});
}
// 설문 순서 변경시 ID 변경
var changeId = function(){
	var $this = $(".sv_con .item");

	$this.each(function(){
		var num = $(this).find(".side .num").text();
		num = eval(num);

		var title = "title";
		var desc = "desc";
		var item = "item";
		var necessary = "necessary";
		var hidden = "qstnInqTypCd";
		var etc = "etc";
		var tmp = "svitem" + num;
		var file = tmp + "_file";

		// Hidden Field
		var $hdn_txt = $(this).find(".hdn_txt");
		$hdn_txt.attr("name", hidden + num);

		// Hidden Field - etc
		var $hdn_etc = $(this).find(".hdn_etc");
		$hdn_etc.attr("name", etc + num);

		// 타이틀
		var $tit_txt = $(this).find(".item_tit input");
		$tit_txt.attr("name", title + num).attr("id", title + num);

		// 설명
		var $desc_txt = $(this).find(".item_con input, .item_con textarea");
		$desc_txt.attr("name", desc + num).attr("id", desc + num);

		// 답변, 기본 항목
		var $default_item_txt = $(this).find(".answer input[type=text], .answer textarea");
		$default_item_txt.attr("name", item + num + "_1").attr("id", item + num + "_1");

		//단일, 다중 default
		var $default_ele = $(this).find(".answer .default input[type=text]");
		$default_ele.attr("name", item+num+"_0").attr("id", item+num+"_0");

		//필수 체크
		var $necessary_chk = $(this).find(".sv_impt input[type=checkbox]");
		$necessary_chk.attr("name", necessary + num).attr("id", necessary + num);
		var $necessary_label = $(this).find(".sv_impt label");
		$necessary_label.attr("for", necessary + num);

		/*
		이전 ver.
		$(this).find(".answer input[type=radio]").each(function(idx){
			$(this).attr("name", item + num + "_1_chk").attr("id", item + num + "_" + (idx + 1) + "_chk");
			$(this).next("label").attr("for", item + num + "_" + (idx + 1) + "_chk");
		});
		$(this).find(".answer input[type=checkbox]").each(function(idx){
			$(this).attr("name", item + num + "_" + (idx + 1) + "_chk").attr("id", item + num + "_" + (idx + 1) + "_chk");
			$(this).next("label").attr("for", item + num + "_" + (idx + 1) + "_chk");
		});
		$(this).find(".answer input[type=text]").each(function(idx){
			if($(this).hasClass("disable")){
				$(this).attr("name", item + num + "_" + (idx + 1) + "_etc").attr("id", item + num + "_" + (idx + 1) + "_etc");
			}else{
				$(this).attr("name", item + num + "_" + (idx + 1)).attr("id", item + num + "_" + (idx + 1));
			}
		});
		*/
		$(this).find(".answer input[type=radio]").not(".default input[type=radio]").each(function(idx){
			$(this).attr("name", item + num + "_1_chk").attr("id", item + num + "_" + (idx + 1) + "_chk");
			$(this).next("label").attr("for", item + num + "_" + (idx + 1) + "_chk");
		});
		$(this).find(".answer input[type=checkbox]").not(".default input[type=checkbox]").each(function(idx){
			$(this).attr("name", item + num + "_" + (idx + 1) + "_chk").attr("id", item + num + "_" + (idx + 1) + "_chk");
			$(this).next("label").attr("for", item + num + "_" + (idx + 1) + "_chk");
		});
		$(this).find(".answer input[type=text]").not(".default input[type=text]").each(function(idx){
			if($(this).hasClass("disable")){
				$(this).attr("name", item + num + "_" + (idx + 1) + "_etc").attr("id", item + num + "_" + (idx + 1) + "_etc");
			}else{
				$(this).attr("name", item + num + "_" + (idx + 1)).attr("id", item + num + "_" + (idx + 1));
			}
		});

		$(this).find(".answer input[type=file]").attr("id", file).attr("name", file);
		$(this).find(".answer input[type=file] + label").attr("for", file);
	});
}
// 설문 문항 이미지 업로드
var upload_desc_img = function(){
	$(".add_desc_img").bind({
		"click" : function(e){
			e.preventDefault();

			$parent = $(this).closest(".filebox");
			$file = $parent.find("input[type=file]");
			$result = $parent.find("span");

			$file.trigger("click").on({
				"change" : function(e){
					var value = e.target.files[0].name;
					$result.text(value);
					
				}
			});
		}
	});
}
//검색 옵션 초기화
var resetOptions = function(ele){
	var $this = $(ele);
	var chkbox = $this.find("input[type=checkbox]");
	var radio = $this.find("input[type=radio]");
	var input = $this.find("input[type=text]");
	var periodBtn = $this.find(".period .btn");
	var select = $this.find("select");
	var desingSelect = $this.find(".w70, .w99, .w104, .w121, .w170, .w260, .w100p, .sch_sel");

	chkbox.prop("checked", false);				//체크박스 초기화
	radio.prop("checked", false);					//라디오버튼 초기화
	input.val("");												//Input 텍스트 초기화
	periodBtn.removeClass("on");				//기간 선택 버튼(오늘, 1주일, 1개월, 3개월 ...) 비활성화
	for(var i=0; i < select.length; i++){		//셀렉트박스 초기화
		select.eq(i).find("option:eq(0)").attr("selected", "selected").trigger("change");
	}
	for(var i=0; i < desingSelect.length; i++){	//디자인 셀렉트박스 초기화
		//desingSelect.eq(i).selectOrDie("destroy").selectOrDie({customClass: desingSelect.eq(i).attr("class"), size: 10});
		desingSelect.eq(i).selectOrDie("update");
	}
}

//분류관리 List -> Selectbox
var makeSelect = function(w){
	var html = "";
	var scrapWrap = ".scrapbox";
	var basicUl = ".basic_class";
	var customUl = ".user_class";
	var cnt = 0;
	if($(scrapWrap).length > 0){
		if(w < 768){
			html += "<select class='dsel'>";
			$("a", $(basicUl)).each(function(idx){
				var txt = $(this).text();
				html +="<option value='"+cnt+"'>"+txt+"</option>";
				cnt++;
			});
			$("a", $(customUl)).each(function(idx){
				var txt = $(this).text();
				html +="<option value='"+cnt+"'>"+txt+"</option>";
				cnt++;
			});
			html +="</select>";

			$(scrapWrap).find(".dsel").remove();
			$(scrapWrap).append(html);
			$(scrapWrap).find("select.dsel").die("change").live({
				"change" : function(){
					var idx = $(this).find("option").index($(this).find("option:selected"));
					$(".basic_class, .user_class").find("a").eq(idx).trigger("click");
				}
			});

			$(scrapWrap).find(".dsel").selectOrDie({customClass:$(scrapWrap).find(".dsel").attr('class'), size:10});
		}else{
			if($(scrapWrap).find(".dsel").length > 0){
				$(scrapWrap).find(".dsel").remove();
			}
		}
	}
}
//모바일 badge
var mBadge = function(){
	//테이블 리스트형, 설문 제목, 커뮤니티 LNB
	var badge = ".badge, .sv_basic dt img, .tbl_wrap img, .treeview.type02 img";
	if($(badge).length > 0){
		$(badge).each(function(){
			var src = $(this).attr("src");
			if(src){
				var lastIndex = src.lastIndexOf("/");
				var extIndex = src.lastIndexOf(".");
				var fileName = src.substring(lastIndex + 1, extIndex);

				var newTag = $("<i></i>");

				switch (fileName){
				case "badge_urgent":				//긴급
					$(this).replaceWith(newTag.text("긴급").attr("class", "badge_urgent"));
				break;
				case "badge_important":		//중요
					$(this).replaceWith(newTag.text("중요").attr("class", "badge_important"));
				break;
				case "badge_new":					//New
					$(this).replaceWith(newTag.text("신규").attr("class", "badge_new"));
				break;
				case "badge_save":					//저장
					$(this).replaceWith(newTag.text("저장").attr("class", "badge_save"));
				break;
				case "badge_progress":			//진행
					$(this).replaceWith(newTag.text("진행").attr("class", "badge_progress"));
				break;
				case "badge_dis_standby":	//배포대기
					$(this).replaceWith(newTag.text("배포대기").attr("class", "badge_standby"));
				break;
				case "badge_dis_ing":				//배포중
					$(this).replaceWith(newTag.text("배포중").attr("class", "badge_ing"));
				break;
				case "badge_dis_end":			//배포종료
					$(this).replaceWith(newTag.text("배포종료").attr("class", "badge_end"));
				break;
				case "badge_mobile":				//모바일
					$(this).replaceWith(newTag.text("모바일").attr("class", "badge_mobile"));
				break;
				case "badge_operate":				//운영
					$(this).replaceWith(newTag.text("운영").attr("class", "badge_operate"));
				break;
				case "ico_lock":							//비밀글
					$(this).replaceWith(newTag.text("비밀글").attr("class", "badge_lock"));
				break;
				case "ico_file":							//첨부파일
					$(this).replaceWith(newTag.text("첨부파일").attr("class", "badge_file"));
				break;
				}
			}
		});
	}
}
//모바일 - 말머리 들어간 테이블 반응형
var mTbl = function(w){
	var tbl = ".res_tbl";
	var len = $(tbl).length;
	var col1 = ".col1";
	var col2 = ".col2";
	var className = ".ext_txt";

	if(len > 0){
		$(tbl).find("tbody tr").each(function(){
			if(w < 768){
				var span = $("<span />", {
					"class" : className.replace(".", "")
				});
				if($(this).find(col1).hasClass("re")){
					span.removeClass("re").addClass("re");
				}else{
					var txt = $(this).find(col1).text();
					span.html(txt);
				}
				$(this).find(col2).find(className).remove();
				$(this).find(col2).prepend(span);
			}else{
				$(this).find(col2).find(className).remove();
			}
		});
	}
}
//시스템맵
var sysMapTree = function(ele){
	/*
	ele : 대상 class 나 id. ex) ".target", "#target"
	*/
	if($(ele).length > 0){
		var ul = $(ele).find("ul");
		var li = ul.find("li");

		li.each(function(){
			var childNode = $(this).find("ul");
			var childNodeLen = $(this).find("ul").length;
			if(childNodeLen > 0){
				$(this).addClass("sys_closed");

				$(this).find(">a").live({
					"click" : function(e){
						if($(this).closest("li").hasClass("sys_closed") || $(this).closest("li").hasClass("sys_opened")){
							e.preventDefault();
						}
						if($(this).closest("li").hasClass("sys_closed")){
							$(this).closest("li").removeClass("sys_closed").addClass("sys_opened");
						}else{
							$(this).closest("li").removeClass("sys_opened").addClass("sys_closed");
						}

						$(this).closest("li").find("ul").eq(0).slideToggle("fast");
					}
				});
			}
		});
	}
}

var setWatermak = function(text){
	var html = "";
	var opt1 = ' width="920" height="500" ';
	var opt2 = ' width="750" height="500" ';
	var pos1 = ' y="100" x="0" ';
	var pos2 = ' y="350" x="0" ';
	if(text == null || text == ""){
		var opt1 = ' width="900" height="600" ';
		text = "SK Telecom";
	}

	var date = new Date();

	if(getInternetExplorerVersion() != -1 && getInternetExplorerVersion() < 10){
		//console.log("IE 9 이하...");
	}else{
		html = "";
		html += '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style="left:0px;top:0px;right:0px;bottom:0px;position:fixed;z-index:9999;fill-opacity:0.16;pointer-events:none">';
		html += '<defs>';
		//사번
		html += '<pattern id="textstripe" patternUnits="userSpaceOnUse" '+opt1+' patternTransform="rotate(-20)">';
		html += '<text '+pos1+' font-size="120" style="color:#000;font-family:\'맑은 고딕\', \'나눔 고딕\', Dotum, \'droid sans fallback\', \'AppleGothic\', sans-serif">'+text+'</text>';
		html += '</pattern>';
		//날짜
		html += '<pattern id="textstripe2" patternUnits="userSpaceOnUse" '+opt2+' patternTransform="rotate(-20)">';
		html += '<text '+pos2+' font-size="120" style="color:#000;font-family:\'맑은 고딕\', \'나눔 고딕\', Dotum, \'droid sans fallback\', \'AppleGothic\', sans-serif">'+getFormatDate(date)+'</text>';
		html += '</pattern>';
		html += '</defs>';
		html += '<rect width="100%" height="100%" fill="url(#textstripe)" />';
		html += '<rect width="100%" height="100%" fill="url(#textstripe2)" />';
		html += '</svg>';
	}
	var $body = $("body");
	$body.append(html);
}
function getFormatDate(date){
	var year = date.getFullYear();
	var month = (1 + date.getMonth());
	month = month >= 10 ? month : '0' + month;
	var day = date.getDate();
	day = day >= 10 ? day : '0' + day;

	return  year + '-' + month + '-' + day;
}

////////////////////////////////////////////////////////////////////////////////
//                                                                                                                                                        //
//  개발 적용 시 현재 라인 아래로는 소스코드 제거                                                                   //
//                                                                                                                                                        //
////////////////////////////////////////////////////////////////////////////////
//Set Cookie
function setCookie(name, value, expiredays){
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}
//Get Cookie
function getCookie(name){
	var nameOfCookie = name + "=";
	var x = 0;
	while(x <= document.cookie.length){
		var y = (x + nameOfCookie.length);
		if(document.cookie.substring(x, y) == nameOfCookie){
			if((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;

			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if(x == 0)
			break;
	}
	return "";
}
//Delete Cookie
function deleteCookie(name){
	var expireDate = new Date();

	expireDate.setDate(expireDate.getDate() - 1);
	document.cookie = name + "= " + "; path=/; expires=" + expireDate.toGMTString() + ";";
}
/**
 * 메인 화면안에 다이얼 로그 창을 생성후 그안에 사용자 프레임을 로드해 준다.
 * @type void
 * @param strUrl - 표시할 주소, strTitle - 메세지 창의 제목을 입력해준다.
 */
gf_DialogFrame = function(sUrl, sWidth, sHeight, sTitle, sModal, sResize, sOverflow, sData, sCallback, sButtonOpt, today){
	var pBody;
	var dialog;
	var vDate = new Date();
	var vdName = "";
	var dvFrame;
	var iframe;
	var dOpt = new Object();
	var glv_Arg;       ///gv_gArg 변수 대체

	vdName = sUrl;

	var gToday = "";
	if(today != null && today != "") gToday = today;

	if(!gf_isNull(parent)){
		pBody = parent.$("body");
		glv_Arg = parent.gv_gArg;
	}else{
		pBody = $("body");
		glv_Arg = gv_gArg;
	}

	var tW, tH;
	/*
	if(mobilecheck()){
		tW = $(window).outerWidth(true);
		tH = $(window).outerHeight(true);
	}else{
		tW = sWidth;
		tH = sHeight;
	}
	*/

	var bIfrmW = 0;
	if(pBody.find(".ui-dialog iframe").attr("width") != null && pBody.find(".ui-dialog iframe").attr("width") != ""){
		bIfrmW = eval(pBody.find(".ui-dialog iframe").attr("width")) + 5;
	}
	var bIfrmH = 0;
	if(pBody.find(".ui-dialog iframe").attr("height") != null && pBody.find(".ui-dialog iframe").attr("height") != ""){
		bIfrmH = pBody.find(".ui-dialog iframe").attr("height");
	}
	//console.log("bIfrmW = "+bIfrmW);
	//console.log("bIfrmH = "+bIfrmH);

	tW = sWidth;
	//tH = sHeight - 67;
	tH = sHeight;
	if(tH >= $(parent.window.document).outerHeight()){
		tH = $(parent.window.document).outerHeight() - 100;
	}

	if(gf_isNull(sResize)) sResize = false;
	//if(gf_isNull(sModal)) sModal = true;
	if(sModal) sModal = true;

	if(gf_isNull(sOverflow)){
		sOverflow = "no";
	}else{
		sOverflow = "yes";
	}
	dvFrame = $("<div class='divFrame_" + vdName + "' ></div>").css('zIndex', 999).css('overflow', 'hidden');
	dvFrame.css('width', tW).css('height', tH );

	iframe = $('<iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="' + sOverflow + '" class="'+gToday+'"></iframe>');

	dOpt.autoOpen = false;
	dOpt.modal = sModal;
	dOpt.resizable= sResize;
	dOpt.width = "auto";
	dOpt.height = "auto";
	dOpt.title = sTitle;
	dOpt.show = {effect : "fade", duration : 200};
	dOpt.close = function(){
		//parent.gv_gArg.pop();
	};
	dOpt.buttons = sButtonOpt;

	dialog = dvFrame.append(iframe).appendTo(pBody).dialog(dOpt);

	iframe.attr({
		width: +tW,
		height: +tH,
		src: sUrl
	});

	dialog.dialog({
		position: {my: "center top", at: "center top+150", of: parent.window}
		//position: {my: "left top", at: "left+"+bIfrmW+" top", of: parent.window}
	});
	dialog.parent('.ui-dialog').css('zIndex', 999);
	dialog.parent('.ui-dialog').css('overflow', 'hidden');
	dialog.dialog("open");
	//Dialog 닫기 시 해당 ele Remove..
	dialog.dialog({
		close : function(event, ui){
			$(this).dialog("destroy").remove();
		}
	});
	dialog.parent('.ui-dialog').dblclick(function(e){
	if(dialog.parent('.ui-dialog').height() > 67)
		dialog.parent('.ui-dialog').height(67);
	else
		dialog.parent('.ui-dialog').height(dvFrame.height() + 40);
	});

	dialog.parent('.ui-dialog').resize(function(e){
		iframe.attr({width : dvFrame.css('width'), height : dvFrame.css('height') });
	});

	/*
	if(mobilecheck()){
		dialog.dialog({
			width : $(window).outerWidth(true),
			//height: $(window).outerHeight(true),
			postion:{ my:"left top", at:"left top"}
		});
	}
	*/

	if(gf_isNull(sTitle))  dialog.parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

	//glv_Arg.PopID = dialog;
};

/*******************************************************************************
 * Function Name  : gf_confirm
 * Description   : 메세지 확인창  예/아니오를 선택 할수 있다. 
 * Parameter    : title  - 제목,html - 내용,callback - 예 일경우 처리 함수, 
 *        onlyOk - 버튼이 하나만 필요한 경우 true, rvOK - 버튼 표시명, rvNO - 버튼 표시명
 * Return     : void
 * 사 용 법    : gf_confirm("선택팝업 창", "내용을 보고 예/아니오를 선택하세요. ",  사용자 콜백함수 명, false, "예", "아니오")  이렇게 사용하세요.
 *******************************************************************************/
var gf_confirm = function(title,html,callback, onlyOk, rvOK, rvNO){
	var lv_dOpt = new Object();

	if(gf_isNull(onlyOk)) onlyOk = false;
	if(gf_isNull(rvOK)) rvOK = "예";
	if(gf_isNull(rvNO)) rvNO = "아니오";
 
	lv_dOpt.title = title;
	lv_dOpt.dialogClass = "mg-message-dialog";
	lv_dOpt.resizable = false;
	lv_dOpt.autoOpen = false;
	lv_dOpt.width = "auto";
	lv_dOpt.position = "center";
	lv_dOpt.minHeight = 0;
	lv_dOpt.modal = true; 

	if (callback) {
		lv_dOpt.buttons = [{ text: "OK", click: function() { $( this ).dialog( "destroy" ); }}];  
	}else{
		if(onlyOk){
			lv_dOpt.buttons = [{
				text : rvOK,
				click : function() {
					$( this ).dialog( "destroy" );
					callback(true);
					return false;
				}
			}];
		}else{
			lv_dOpt.buttons = {
				OK : {
					text : rvOK,
					click : function() {
					$( this ).dialog( "destroy" );
					callback(true);
					return false;
				}
			},
			NOK : {
				text : rvNO,
					click : function() {
						$( this ).dialog( "destroy" );
						callback(false);
						return false;
					}
				}
			};
		};
	};

	if (callback) {
		var a_dialog = $("<div></div>").dialog(lv_dOpt);
	} else {
		var a_dialog = $("<div></div>").dialog(lv_dOpt);
	}

	a_dialog.dialog("open").html(html).parent().removeClass("ui-corner-all").children(".ui-dialog-titlebar").removeClass("ui-corner-all");
	$(".ui-dialog").css({left:($(window).width() / 2) - (a_dialog.width() /2) + "px", top: ($(window).height() / 2) - a_dialog.height() + "px"});
	a_dialog.find('button').focus();
};

function gf_isNull(val){
	var bool;
	if(val == "" || val == "undefined" || val == null){
		bool = true;
	}else{
		bool = false;
	}
	return bool;
}

var closeDialog = function(ele){
	if(parent.$("body").find(ele).length > 0){
		//parent.$("body").find(ele).closest(".ui-dialog").dialog("close");
		parent.$("body").find(ele).dialog("close");
	}
}