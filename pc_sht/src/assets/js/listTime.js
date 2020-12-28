var mydate = new Date();
var weekday = '';
function getFirstDayOfWeek (mydate) {
	weekday = mydate.getDay()||7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
	// mydate.setDate(mydate.getDate()-weekday+1);//往前算（weekday-1）天，年份、月份会自动变化
	if(weekday<3){
		mydate.setDate(mydate.getDate()+3 - weekday);
	}else if(weekday>3){
		mydate.setDate(mydate.getDate()+10 - weekday);
	}
	return timeFormat(mydate);
}
function timeFormat(date) {
	if (!date || typeof(date) === "string") {
		 this.error("参数异常，请检查...");
	}
	var y = date.getFullYear(); //年
	var m = date.getMonth() + 1; //月
	var d = date.getDate(); //日
	 return y + "-" + m + "-" + d;
}
// function timeFormat(date) {
// 	if (!date || typeof(date) === "string") {
// 		 this.error("参数异常，请检查...");
// 	}
// 	var y = date.getFullYear(); //年
// 	var m = date.getMonth() + 1; //月
// 	var d = date.getDate()-3; //日
// 	 return y + "-" + m + "-" + d;
// }
var date1 = getFirstDayOfWeek(mydate);
var date = '2020-10-22'; 
function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2017-9-25格式 
	var aDate, oDate1, oDate2, iDays
	aDate = sDate1.split("-")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为9-25-2017格式 
	aDate = sDate2.split("-")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
	return iDays
}
	//获取两个日期之间的所有日期
　　Date.prototype.format = function() {
　　　　　var s = '';
　　　　　var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));
　　　　　var day = this.getDate()>=10?this.getDate():('0'+this.getDate());
　　　　　s += this.getFullYear() + '-'; // 获取年份。
　　　　　s += mouth + "-"; // 获取月份。
　　　　　s += day; // 获取日。
　　　　return (s); // 返回日期。
　　};
	 
　　function getAll(begin, end) {
　　　　var arr = [];
　　　　var ab = begin.split("-");
　　　　var ae = end.split("-");
　　　　var db = new Date();
　　　　db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
　　　　var de = new Date();
　　　　de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
　　　　var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
　　　　var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
　　　　for (var k = unixDb; k <= unixDe;) {
　　　　　　//console.log((new Date(parseInt(k))).format());
　　　　　　k = k + 24 * 60 * 60 * 1000;
　　　　　　arr.push((new Date(parseInt(k))).format());
　　　　}
	return arr;
}
	//分离日期
	function group(source, step) { 
	if (source.length == 1) return [source];//这个情况要单独写一下
	var group = source.reduce((total, current, index) => {
		if (index == 1) {
			//init 第一次 total 是1 current 是 2
			if (step == 1) {
				total = [[total], [current]];
			} else {
				total = [[total, current]];
			}
		} else {
			var last = total[total.length - 1];
			if (last.length < step) {
				last.push(current);
			} else {
				total.push([current]);
			}
		}
		return total;
	});
	return group;
}
var source = getAll(date,date1);
var step = 7;
var listTime = group(source,step).reverse();
let timeObj = {
	list:listTime,
	weekday:weekday
}
export default timeObj;
