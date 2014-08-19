var eventUtil = {
	// 添加事件句柄
	addHandle:function(element,type,Handler){
		
		if(element.addEventListener){ // chrome

			element.addEventListener(type,Handler,false);

		}else if(element.attachEvent){ // ie

			element.attachEvent('on'+type,Handler);

		}else{

			element['on' + type] = Handler;

		};
	},
	// 删除事件句柄
	removeHandle:function(element,type,Handler){

		if(element.removeEventListener){ // chrome

			element.removeEventListener(type,Handler,false);

		}else if(element.detachEvent){ // ie

			element.detachEvent('on'+type,Handler);

		}else{

			element['on' + type] = null;

		};

	},
	// 获取事件
	getEvent:function(event){
		return event || window.event;
	},
	// 获取事件类型
	getType:function(event){
		return event.type;
	},
	// 获取事件对象
	getEle:function(event){
		return event.target || event.srcElement;
	},
	// 阻止事件冒泡
	stopPropagation:function(event){ 

		if(event.stopPropagation){ // chrome

			return event.stopPropagation();

		}else{ // ie

			return event.cancelBubble = true;

		}
	},
	// 阻止事件默认行为
	preventDefault:function(event){

		if(event.preventDefault){ // chrome

			return event.preventDefault();

		}else{ //ie

			return event.returnValue = false;

		};
	}
};