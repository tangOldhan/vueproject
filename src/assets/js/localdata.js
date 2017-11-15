export default {
    addToLocal(temp){
    //获取原有的数据，将新数据与旧数据合并，然后再存入本地
       var str = localStorage.getItem('carlist');
       str = str || '[]';
       var arr = JSON.parse(str);

       arr.push(temp);

       localStorage.setItem('carlist',JSON.stringify(arr));
    },
    getLocalData(){
        var str = localStorage.getItem('carlist');
        str = str || "[]";
        
        return JSON.parse(str);
    },
    getLocalObj(){
        var arr = this.getLocalData();
        var obj={};
        for(var i=0; i<arr.length; i++){
            var item = arr[i];
            if( !obj[item.goodsid] ){
                obj[item.goodsid] = item.count
            }else{
                obj[item.goodsid] += item.count
            }
        }
        return obj;
    }

}