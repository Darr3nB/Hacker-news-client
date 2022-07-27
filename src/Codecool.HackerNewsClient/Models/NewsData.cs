using System.Collections.Generic;

namespace HackerNewsClient.Models;

public class NewsData
{
    public string Name { get; set; }
    public List<Endpoint> Endpoints { get; set; }
    public List<UrlBody> UrlBody { get; set; }
}