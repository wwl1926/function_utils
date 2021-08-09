### debounce()    函数防抖

​    控制频繁调用的函数，返回一个函数

---

> 语法：debounce(callback(e), deplay)
>
> 例子： div.addEventListener("scroll",debounce(function(e){
>
>  //函数体
>
> }, 500))



#### 参数

**callback（e）**

​    回调函数，传递一个参书，事件对象event

**deplay**

​    延迟时间



#### 返回值

   返回一个函数 function



#### 描述

类似于输入框搜索等和服务器交互比较频繁的业务，应该控制他们交互的频率来达到节省和减轻服务器压力的效果，使得最后一次才执行





### throttle() 函数节流

  控制频繁调用的函数，一定时间间隔再执行一次，返回一个函数

---

> 语法： 
>
> ​    throttle(functinon(e){}, time)



#### 参数

**callback(e)**

​    回调函数

**time**

​    间隔时间，时间戳一般使用time，延迟一般使用deplay



#### 返回值

返回一个函数



#### 描述

​    目的： 函数节流也是控制函数触发执行的频率，但是并不是最后一次才执行， 而是定当与平均时间内执行函数，类似滚动事件，执行频率不那么高，来达到节约成本和服务器压力的效果。

  思路： 设置一个事件戳，当时间戳到达这个值的时候就执行一次，每次执行完之后更新时间戳



### 数组去重

去除数组中重复的元素，返回一个新的数组

> 语法：
>
> unique(arr)

#### 参数

**arr**

需要去重的数组



#### 返回值

返回一个新的数组



#### 描述

 *   1. 数组循环遍历实现去重

 *   2. 使用对象和数组一起结合实现去重

 *   3. Set数组去重，也是最方便快捷的去重

 */





### chunk()  数组分块

传入一个需要分块的数组，返回一个新的按照size分块的新数组

---

> 语法：
>
>  chunk(arr, size)

#### 参数

**arr**

需要分块的数组元素

**size**

需要分块的大小，默认值为1，不传递就按照默认值为一分块，也就是返回一个深拷贝的数组元素



#### 返回值

返回一个新的的数组



#### 描述

类似于分页效果就可以使用高=该函数来实现，但是需要注意**当数组元素是多维数组的时候返回的就是数组元素的浅拷贝，不适合使用该函数来实现**





### deepclone(obj|array|基本数据类型)  深拷贝

传递需要拷贝的数据（基本数据类型和对象数据类型都可以），返回一个深拷贝的数据对象

---

> 语法：
>
> deepClone(array | object | 基本数据类型)

#### 参数

**obj | array | 基本数据类型**

可以传递任意数据类型进行拷贝



#### 返回值

返回一个深拷贝的数据对象



#### 描述

**深拷贝是需要重点掌握的函数，在实际开发中与大量用途，我们需要深刻理解该函数的实现**

***思路： 使用递归思想实现array数组和object的拷贝，***

***1.首先判断数据类型，严格区分数据类型，判断，基本数据类型就直接返回（这也是为了递归实现考虑）***

***2.判断array类型和object类型，使用什么遍历方法来实现，***

   ***2.1 如果是数组，就foreach循环实现；***

   ***2.2 object就使用keys实现***

```js
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

```





