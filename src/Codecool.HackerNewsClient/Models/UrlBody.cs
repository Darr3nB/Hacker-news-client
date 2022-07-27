namespace HackerNewsClient.Models;

public class UrlBody
{
    public int? Id { get; set; }
    public string Title { get; set; }
    public int? Points { get; set; }
    public string User { get; set; }
    public int? Time { get; set; }
    public string TimeAgo { get; set; }
    public int? CommentCount { get; set; }
    public string Type { get; set; }
    public string Url { get; set; }
    public string Domain { get; set; }
}