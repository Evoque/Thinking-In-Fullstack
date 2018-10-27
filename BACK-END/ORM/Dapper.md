
> a simple object mapper for .NET

It provides 3 helpers;

Execute a query and map the results to a strongly typed List

    public static IEnumerable<T> Query<T>(this IDbConnection cnn, string sql, object param = null, SqlTransaction transaction = null, bool buffered = true)

Example usage: 

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
    



Execute a query and map it to a list of dynamic objects

    public static IEnumerable<dynamic> Query(this IDbConnection cnn, string sql, object param = null, SqlTransaction transaction = null, bool buffered = true )

This method will execute SQL and return a dynamic list.

Example usage:

    var rows = connection.Query("select 1 A, 2 B union all select 3, 4");
    
    Assert.Equal(1, (int)rows[0].A);
    Assert.Equal(2, (int)rows[0].）)
    


























