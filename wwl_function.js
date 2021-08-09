/***
 * @ wwl 2021 8.9 
 */

 /**
  * debounce(callback, deplay)   function()    函数防抖
  *   使用： callback 函数传递一个参数 e|| event
  *   思路：类似于输入框搜索等和服务器交互比较频繁的业务，应该控制他们交互的频率
  * 来达到节省和减轻服务器压力的效果，使得最后一次才执行
  */
 function debounce(callback, deplay){
     //创建一个定时器对象，达到函数闭包，保存变量
     let timer = null ;

     return function(e){   //传递一个事件对象event

        //判断，如果函数在定时器事件内还没有执行就清空定时器
        if(timer !== null){
            clearTimeout(timer);
        }

        timer = setTimeout(()=>{
            //箭头函数本身没有this，上一层的this，本身返回一个函数，谁调用this就是谁
            callback.call(this,e);

            timer = null;
             
        },deplay)

     }
 };

 /**
  * throttle(callback, time) function()   函数节流
  *   使用： callback 函数传递一个参数 e|| event
  *   目的： 函数节流也是控制函数触发执行的频率，但是并不是最后一次才执行，
  * 而是定当与平均时间内执行函数，类似滚动事件，执行频率不那么高，来达到节约成本和服务器压力的效果。
  * 
  *   思路： 设置一个事件戳，当时间戳到达这个值的时候就执行一次，每次执行完之后更新时间戳
  */
 function throttle(callback, time){
     let start = 0;

     return function(e){
         let now  = Date.now();

         //判断，当时间差值大于设置的时间戳就执行函数
         if(now - start >= time){
             callback.call(this,e);
             //修改开始时间
             start = now;
         }

     }
    };

/**
 * unique(arr)   数组去重
 * 
 *   1. 数组循环遍历实现去重
 *   2. 使用对象和数组一起结合实现去重
 *   3. Set数组去重，也是最方便快捷的去重
 */
function unique(arr){
    return [...new Set(arr)]
};



/**
 * chunk(arr, size)  array   数组分块
 * 
 */
function chunk(arr, size=1){
    let result = [];
    let temp = [];

    //循环遍历数组元素
    arr.forEach(element => {
        //判断temp临时数组是否为空，为空就压入result数组中，这里运用到数组的浅拷贝，值传递，保存的是地址值
        // 是一个引用，然后向其中添加元素，当元素符合条件就清空，然后再次循环
        if(temp.length === 0){
            result.push(temp)
        }
        temp.push(element);

        if(temp.length === size){
            temp = [];
        }
        
    });

    return result;
}

/**
 * deepClone(obj)  深拷贝
 * 
 * 
 */
// 这个只是初级版本，还可以对循环进行优化，严格区分array和object对象的循环
function deepClone2(obj,map = new Map()){
    let result;
    //首先判断数据类型，如果是普通数据类型（基本数据类型除object外）就直接返回
    if(typeof obj === 'object' && typeof obj !== null){
        //进来之前先获取map属性值，如果有值就不拷贝了，没有就循环拷贝
        let cache = map.get(obj);
        if(cache){
            return cache;
        }
        //判断是array还是object类型
         result = Array.isArray(obj) ? [] : {};
         //给map对象添加属性和值
         map.set(obj,result);
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                //第二次递归调用map是需要传递的，因为不传递就会新创建一个，就是空
                result[key] = deepClone(obj[key],map);
                
            }
        }

        return result;

    }else{
        // 基本数据类型直接返回
        return obj;    
    }
};

//优化版本，区别array和object，使用object.keys来循环
function deepClone(obj,map = new Map()){
    let result;
    //首先判断数据类型，如果是普通数据类型（基本数据类型除object外）就直接返回
    if(typeof obj === 'object' && typeof obj !== null){
        //进来之前先获取map属性值，如果有值就不拷贝了，没有就循环拷贝
        let cache = map.get(obj);
        if(cache){
            return cache;
        }
        //判断是array还是object类型
        let isArray = Array.isArray(obj);
         result = isArray ? [] : {};
         //给map对象添加属性和值
         map.set(obj,result);
         
         //循环遍历，严格区分array和Object
         if(isArray){
             obj.forEach((item, index)=>{
                {
                    result[index] = deepClone(item,map);
                }
             })
         }else{
             //否则就代表是object对象类型
             Object.keys(obj).forEach(item => {
                 result[item] = deepClone(obj[item],map)
             })
         }

        

        return result;

    }else{
        // 基本数据类型直接返回
        return obj;    
    }
}





