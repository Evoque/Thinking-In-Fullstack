
> a simple object mapper for .NET

It provides 3 helpers;

### Execute a query and map the results to a strongly typed List

```C#
public static IEnumerable<T> Query<T>(this IDbConnection cnn, string sql, object param = null, SqlTransaction transaction = null, bool buffered = true)
```

Example usage: 

```c#
public class Dog 
{
    public int? Age{ get; set;}
    public Guid Id { get; set;}
    public string Name { get; set; }
    public float? Weight { get; set; }
    public int IgnoredProperty { get { return 1; } }
}

var guid = Guid.NewGuid();
var dog = connection.Query<Dog>("select Age=@Age, Id=@Id", new { Age=(int?)null, Id=guid });

Assert.Equal(1, dog.Count());
Assert.Null(dog.First().Age);
Assert.Equal(guid, dog.First().Id);
```



### Execute a query and map it to a list of dynamic objects

```C#
public static IEnumerable<dynamic> Query(this IDbConnection cnn, string sql, object param = null, SqlTransaction transaction = null, bool buffered = true )
```

### This method will execute SQL and return a dynamic list.

Example usage:

```C#
var rows = connection.Query("select 1 A, 2 B union all select 3, 4");

Assert.Equal(1, (int)rows[0].A);
Assert.Equal(2, (int)rows[0].）)
```



### Literal replacements

Dapper supports literal replacements for bool and numeric types.

```c#
connection.Query("select * from User where UserTypeID={=Admin}", new { UserTypeId.Admin });
```



### Multi Mapping

Dapper allows you to map a single row to multiple objects. This is a key feature if you want to avoid extraneous querying and eager load associations. like:

```c#
class Post 
{
    public int Id { get; set; }
    public User Owner { get; set; }
}

class User 
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

This is the user case for multi mapping. You tell dapper that the query returns a `Post` and a `User` object and then give it a function describing what you to do with each of the rows containing both a `Post` and a `User` object. In our case, we want to take the user object and put it inside the post object. So we write the function:

```C#
(post, user) => { post.Owner = user; return post; }
```

like this: 

```c#
var sql = @"select * from #Posts p left join #Users u on u.Id = p.OwnerId Order by p.Id";
var data = connection.Query<Post,User,Post>(sql, (post, user) => {post.Owner = user; return post;});
var post = data.First();

Assert.Equal("Sams Post1", post.Content);
Assert.Equal(1, post.Id);
Assert.Equal("Sam", post.Owner.Name);

```



### Multiple Results

Dapper allows you to process multiple result grids in a single query.

Example:

```C#
var sql = 
    @"
    select * from Customers where CustomerId=@id
    select * from Orders where CustomerId=@id
    select * from Returns where CustomerId=@id ";

using(var multi = connection.QueryMultiple(sql, new { id=selectedId }))
{
    var customer = multi.Read<Customer>().Single();
    var orders = multi.Read<Order>().ToList();
    var returns = multi.Read<Return>().ToList();
}
```



### Stored Procedures

Dapper fully supports stored procs:

```c#
var user = cnn.Query<User>("spGetUser", new {Id = 1}, commandType: CommandType.StoredProcedure).SingleOrDefault();
```

If you want something more fancy, you can do:

```c#
var p = new DynamicParameters();
p.Add("@a", 11);
p.Add("@b", dbType: DbType.Int32, direction: ParameterDirection.Output);
p.Add("@c", dbType: DbType.Int32, direction: ParameterDirection.ReturnValue);

cnn.Execute("spMagicProc", p, commandType: CommandType.StoredProcedure);

int b = p.Get<int>("@b");
int c = p.Get<int>("@c");
```























