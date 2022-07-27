using HackerNewsClient.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Codecool.HackerNewsClient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        [Route("newshome")]
        public async Task<List<Endpoint>> NewsHome()
        {
            var apiHandler = new ApiHandler();
            return (await apiHandler.GetDataByUrl<NewsData>("https://api.hnpwa.com/v0")).Endpoints;
        }

        [Route("top")]
        public async Task<List<UrlBody>> TopNews(int pageNumber=1)
        {
            var apiHandler = new ApiHandler();
            return await apiHandler.GetDataByUrl<List<UrlBody>>($"https://api.hnpwa.com/v0/news/{pageNumber}.json");
        }
    }
}
