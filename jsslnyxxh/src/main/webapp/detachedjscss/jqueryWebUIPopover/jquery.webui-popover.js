;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = 'webuiPopover';
		var pluginClass = 'webui-popover';
		var pluginType = 'webui.popover';
		var	defaults = {
					placement:'auto',
					width:'auto',
					height:'auto',
					trigger:'click',
					style:'',
					delay:300,
					cache:true,
					multi:false,
					arrow:true,
					title:'',
					content:'',
					closeable:false,
					padding:true,
					url:'',
					type:'html',//iframe html
					// edit by le jun cheng 2017.4.25 9:28
					onShown : function(){},
					onHiden : function(){},
					// end edit
					template:'<div class="webui-popover" style="z-index:9999;">'+
								'<div class="arrow"></div>'+
								'<div class="webui-popover-inner">'+
									'<a href="#" class="close"></a>'+
									'<h3 class="webui-popover-title"></h3>'+
									'<div class="webui-popover-content" style="overflow:hidden;"><i class="glyphicon glyphicon-refresh"></i> <p></p></div>'+
								'</div>'+
							'</div>'
		};


		// The actual plugin constructor
		function WebuiPopover ( element, options ) {
				this.$element = $(element);
				this.options = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();

		}

		WebuiPopover.prototype = {
				//init webui popover
				init: function () {
					//init the event handlers
					if (this.options.trigger==='click'){
						this.$element.off('click').on('click',$.proxy(this.toggle,this));
					}else{
						this.$element.off('mouseenter mouseleave')
										.on('mouseenter',$.proxy(this.mouseenterHandler,this))
										.on('mouseleave',$.proxy(this.mouseleaveHandler,this));
					}
					this._poped = false;
					this._inited = true;
				},
				/* api methods and actions */
				destroy:function(){
					this.hide();
					this.$element.data('plugin_'+pluginName,null);
					this.$element.off();
					if (this.$target){
						this.$target.remove();
					}
				},
				hide:function(event){
					if (event){event.preventDefault();}
					var e = $.Event('hide.' + pluginType);
					this.$element.trigger(e);

					if (this.$target){this.$target.removeClass('in').hide();}
					this.$element.trigger('hidden.'+pluginType);
					this.options.onHiden();
				},
				toggle:function(e){
					if (e) {e.preventDefault();}
					this[this.getTarget().hasClass('in') ? 'hide' : 'show']();
				},
				hideAll:function(){
					$('div.webui-popover').removeClass('in').hide();
				},
				/*core method ,show popover */
				show:function(){
					var
						//element postion
						elementPos = this.getElementPosition(),
						//target postion
						$target = this.getTarget().removeClass().addClass(pluginClass),
						//target content
						$targetContent = this.getContentElement(),
						//target Width
					    targetWidth = $target[0].offsetWidth,
					    //target Height
						targetHeight = $target[0].offsetHeight,
						//placement
						placement = 'bottom',
						e = $.Event('show.' + pluginType);

					if (!this.options.multi){
						this.hideAll();
					}
					//if (this.hasContent()){
						this.$element.trigger(e);
					//}
					// use cache by default, if not cache setted  , reInit the contents 
					if (!this.options.cache||!this._poped){
						if (!this.isAsync()){
							this.setContent(this.getContent());
						}else{
							this.setContentASync(this.options.content);
						}
						this.setTitle(this.getTitle());
						if (!this.options.closeable){
							$target.find('.close').off('click').remove();
						}
						$target.show();
					}
					if (this.options.width!=='auto') {$target.width(this.options.width);}
					if (this.options.height!=='auto'){$targetContent.height(this.options.height);}

					//init the popover and insert into the document body
					if (!this.options.arrow){
						$target.find('.arrow').remove();
					}
					$target.remove().css({ top: -1000, left: -1000, display: 'block' }).appendTo(document.body);
					targetWidth = $target[0].offsetWidth;
					targetHeight = $target[0].offsetHeight;
					placement = this.getPlacement(elementPos,targetHeight);
					this.initTargetEvents();
				    var postionInfo = this.getTargetPositin(elementPos,placement,targetWidth,targetHeight);
					this.$target.css(postionInfo.position).addClass(placement).addClass('in');

					if (this.options.type==='iframe'){
						var $iframe = $target.find('iframe');
						$iframe.width($target.width()).height($iframe.parent().height());
					}

					if (this.options.style){
						this.$target.addClass(pluginClass+'-'+this.options.style);
					}
					if (!this.options.padding){
						//fixed position offset bug
						$targetContent.css('height',$targetContent.outerHeight());
						this.$target.addClass('webui-no-padding');
					}
					if (!this.options.arrow){
						this.$target.css({'margin':0});
					}
					if (this.options.arrow&&postionInfo.arrowOffset){
						this.$target.find('.arrow').css(postionInfo.arrowOffset);
					}
					this._poped = true;
					this.$element.trigger('shown.'+pluginType);
					
					this.options.onShown();
				},
				/*getter setters */
				getTarget:function(){
					if (!this.$target){
						this.$target = $(this.options.template);
					}
					return this.$target;
				},
				getTitleElement:function(){
					return this.getTarget().find('.'+pluginClass+'-title');
				},
				getContentElement:function(){
					return this.getTarget().find('.'+pluginClass+'-content');
				},
				getTitle:function(){
					return this.options.title||this.$element.attr('data-title')||this.$element.attr('title');
				},
				setTitle:function(title){
					var $titleEl = this.getTitleElement();
					if (title){
						$titleEl.html(title);
					}else{
						$titleEl.remove();
					}
				},
				hasContent:function () {
					return this.getContent();
				},
				getContent:function(){
					if (this.options.url){
						if (this.options.type==='iframe'){
							this.content = $('<iframe frameborder="0"></iframe>').attr('src',this.options.url);
						}
					}else if (!this.content){
						var content='';
						if ($.isFunction(this.options.content)){
							content = this.options.content.apply(this.$element[0],arguments);
						}else{
							content = this.options.content;
						}
						this.content = this.$element.attr('data-content')||content;
					}
					return this.content;
				},
				setContent:function(content){
					var $target = this.getTarget();
					this.getContentElement().html(content);
					this.$target = $target;
				},
				isAsync:function(){
					return this.options.type==='async';
				},
				setContentASync:function(content){
					var that = this;
					$.ajax({
						url:this.options.url,
						type:'GET',
						cache:this.options.cache,
						success:function(data){
							if (content&&$.isFunction(content)){
								that.content = content.apply(that.$element[0],[data]);
							}else{
								that.content = data;
							}
							that.setContent(that.content);
						}
					});
				},
				/* event handlers */
				mouseenterHandler:function(){
					var self = this;
					if (self._timeout){clearTimeout(self._timeout);}
					if (!self.getTarget().is(':visible')){self.show();}
				},
				mouseleaveHandler:function(){
					var self = this;
					//key point, set the _timeout  then use clearTimeout when mouse leave
					self._timeout = setTimeout(function(){
						self.hide();
					},self.options.delay);
				},
				//reset and init the target events;
				initTargetEvents:function(){
					if (this.options.trigger!=='click'){
						this.$target.off('mouseenter mouseleave')
									.on('mouseenter',$.proxy(this.mouseenterHandler,this))
									.on('mouseleave',$.proxy(this.mouseleaveHandler,this));
					}
					this.$target.find('.close').off('click').on('click', $.proxy(this.hide,this));
				},
				/* utils methods */
				//caculate placement of the popover
				getPlacement:function(pos,targetHeight){
					var
						placement,
						de = document.documentElement,
						db = document.body,
						clientWidth = de.clientWidth,
						//clientHeight = de.clientHeight,
						scrollTop = Math.max(db.scrollTop,de.scrollTop),
						scrollLeft = Math.max(db.scrollLeft,de.scrollLeft),
						pageX = Math.max(0,pos.left - scrollLeft),
						pageY = Math.max(0,pos.top - scrollTop),
						arrowSize = 20;

					//if placement equals auto，caculate the placement by element information;
					if (typeof(this.options.placement)==='function'){
						placement = this.options.placement.call(this, this.getTarget()[0], this.$element[0]);
					}else{
						placement = this.$element.data('placement')||this.options.placement;
					}

					if (placement==='auto'){
						if (pageX<clientWidth/3){
							placement= pageY>targetHeight+arrowSize?'top-right':'bottom-right';
						}else if (pageX<clientWidth*2/3){
							placement = pageY>targetHeight+arrowSize?'top':'bottom';
						}else{
							placement = pageY>targetHeight+arrowSize?'top-left':'bottom-left';
						}
					}
					return placement;
				},
				getElementPosition:function(){
					return $.extend({},this.$element.offset(), {
				        width: this.$element[0].offsetWidth,
				        height: this.$element[0].offsetHeight
				    });
				},

				getTargetPositin:function(elementPos,placement,targetWidth,targetHeight){
					var pos = elementPos,
						elementW = this.$element.outerWidth(),
						position={},
						arrowOffset={},
						arrowSize = this.options.arrow?0:0;
					switch (placement) {
			          case 'bottom':
			            position = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - targetWidth / 2};
			            break;
			          case 'top':
			            position = {top: pos.top - targetHeight-arrowSize, left: pos.left + pos.width / 2 - targetWidth / 2};
			            break;
			          case 'left':
		        	    var height = document.documentElement.clientHeight;
			        	var postop = pos.top-targetHeight/2<0?20:pos.top-targetHeight/2;
			            if(postop+targetHeight>=height){postop = height-targetHeight-10;}
			            position = {top: postop, left: pos.left - targetWidth -arrowSize};
			            $('.webui-popover > .arrow').css('top',pos.top-postop+pos.height/2);
			            break;
			          case 'right':
			        	//only code for this project
			        	var height = document.documentElement.clientHeight;
			        	var postop = pos.top-targetHeight/2<0?20:pos.top-targetHeight/2;
			            if(postop+targetHeight>=height){postop = height-targetHeight-10;}
	        	    	position = {top: postop, left: pos.left + pos.width-20};
	        	    	$('.webui-popover > .arrow').css('top',pos.top-postop+pos.height/2);
			            break;
			          case 'top-right':
			            position = {top: pos.top - targetHeight -arrowSize, left: pos.left};
			            arrowOffset = {left: elementW /2 };
			            break;
			          case 'top-left':
			            position = {top: pos.top - targetHeight -arrowSize, left: pos.left -targetWidth +pos.width+10};
			            arrowOffset = {left: targetWidth - elementW /2 };
			            break;
			          case 'bottom-right':
			            position = {top: pos.top + pos.height, left: pos.left};
			            arrowOffset = {left: elementW /2};
			            break;
					  case 'bottom-left':
			            position = {top: pos.top + pos.height, left: pos.left -targetWidth +pos.width};
			            arrowOffset = {left: targetWidth- elementW /2};
			            break;
			        }
			        return {position:position,arrowOffset:arrowOffset};
				}
		};
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						var webuiPopover = $.data( this, 'plugin_' + pluginName );
						if (!webuiPopover) {
								if (!options){
									webuiPopover = new WebuiPopover( this, null);
								}else if (typeof options ==='string'){
									if (options!=='destroy'){
										webuiPopover = new WebuiPopover( this, null );
										webuiPopover[options]();
									}
								}else if (typeof options ==='object'){
									webuiPopover = new WebuiPopover( this, options );
								}
								$.data( this, 'plugin_' + pluginName, webuiPopover);
						}else{
							if (options==='destroy'){
								webuiPopover.destroy();
							}else if (typeof options ==='string'){
								webuiPopover[options]();
							}
						}
				});
		};

})( jQuery, window, document );


