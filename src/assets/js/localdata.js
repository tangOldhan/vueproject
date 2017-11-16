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
    },
    updateData(obj){
        var arr = this.getLocalData(); //获得当前loaclStorage中的数据

        var count = 1;
        if(obj.type == "add"){
            //加一条数据
            arr.push({goodsid:obj.goodsid,count:count})
        }else {
            //本地数据对应的count减一 或者 把count为1的数据删除
            for(var i=0; i<arr.length; i++){
                if(arr[i].goodsid == obj.goodsid){
                    if(arr[i].count>1){
                        arr[i].count--
                    }else{
                        arr.splice(i,1);
                        break;//删除之后跳出循环
                    }
                }
            }
        }
        //将处理结束的数组 保存到本地
        localStorage.setItem('carlist',JSON.stringify(arr));
    }

}