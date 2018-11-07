## Filter 

- 设计模式
- 应用场景
- 类库思想



specific points `in the request processing state`,  They allow us to register our custom logic and have it run at specific points.

we can register different types of filters and inject custom logic at certain points of the request processing stage.

Filters are often .NET attributes that implement certain interfaces but they definitely don't have to be attributes. The reason why they are often attributes is to enable them to be easily applicable to individual controllers or even controller methods. 



- Authorization: IAuthorizationFilter ; 
- Action: IActionFilter, run before the controller action is invoked.
- Exception: IExceptionFilter, run when an exception occurs.

`IFilter` interface. `AllowMultiple`: This property determines whether a filter can be applied multiple times to a scope.

The execution order inside the processing pipeline.

Every filter has a scope behind the scenes depending on where it is registered; The scope of a filter is indicated by the `FilterScope` enum 

```c#
public enum FilterScope {
    Global = 0,
    Controller = 10,
    Action = 20
}
```



The scope of a filter doesn't change the filter type execution order. The filter scope determines only the execution order for the same types of filters.



```c#
/// 使用ConcurrentDictionary，在添加时仍要进行Lock
private static object _incLock = new object();
readonly static ConcurrentDictionary<int, Car> _carsDictionary;

public Car Add(Car car) {
    lock(_incLock){
        car.Id = _nextId;
        _carsDictionary.TryAdd(car.Id, car);
        _nextId++;
    }
    return car;
}

// 但是`TryRemove` 和 `TryUpdate`不用lock
```



## The difference between filters and message handlers

Using a message handler is a great choice to run logics that have to be executed for every request, including authentication. Also, by providing continuations inside the message handlers, you get a last chance to examine the response and perform some specific actions before the response goes out through the ASP.NET Web API pipeline.



`AuthorizeAttribute` checks against the `Thread.CurrentPrincipal`, 

With `AuthorizeAttribute`, you can be very specific in deciding which controller or action allows access to which users or roles.



the Web API framewok offers `default implementation classes` of those filters. These `abstract` classes are intended to make it easier to create custom filters, `especially when we don't need to perform any asynchronous processing`.

- IAuthorizationFilter, AuthorizationFilterAttribute
- IActionFilter, ActionFilterAttribute
- IExceptionFilter, ExceptionFilterAttribute

`FilterAttribute` also properly sets the `AllowMultiple` property according to the `AttributeUsage` attribute's `AllowMultiple` property.



`System.Net.Http` is for client-side HTTp programming. `System.Web.Http` is for **server-side ** HTTP programming.














