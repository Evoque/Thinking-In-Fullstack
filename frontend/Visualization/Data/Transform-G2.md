
## Transform 数据转换 ([G2](http://antv.alipay.com/zh-cn/g2/3.x/api/transform.html)) 



> 在`G2`中，一个数据视图(`DataSet.View`)通过Transform来进行数据转换操作，语法如下
>
> ```javascript
> dv.transform({
>     type: 'connectorName',
>     ...otherOptions
> });
> 
> // dv =>
> const dv = new DataSet.View();
> // 有时使用source初始化
> const dv = new DataSet.View().source(...);
> ```
>
>





### 静态处理相关

1. 数据过滤

   ```javascript
   dv.transform({
       type: 'filter',
       callback(row){ // 判断某一行是否保留，默认为true
           return row.year > 1998;
       }
   });
   ```

2. 






### 数据形变/数据补全相关
### 数据比例(百分比)相关Transform
### 数据统计相关
### 数据分箱相关
### 核函数相关
### 树相关
### 图相关
### Geo地理数据相关
### 其他