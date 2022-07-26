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
    }
}
