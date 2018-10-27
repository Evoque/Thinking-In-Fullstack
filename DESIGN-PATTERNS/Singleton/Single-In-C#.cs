
internal partial class Singletoner 
{
    private static readonly Lazy<Singletoner> _singleton = new Lazy<Singletoner>(() => new Singletoner());

    public static Singletoner GetInstance() => _singleton.Value;
 
    private Singletoner(){
        // do something
    }

}