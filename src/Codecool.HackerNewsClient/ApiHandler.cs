using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Codecool.HackerNewsClient;

public class ApiHandler
{
    public async Task<T> GetDataByUrl<T>(string url)
    {
        string apiUrl = url;

        using (HttpClient client = new HttpClient())
        {
            client.BaseAddress = new Uri(apiUrl);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(apiUrl);
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var table = Newtonsoft.Json.JsonConvert.DeserializeObject<T>(data);
                return table;

            }
        }

        throw new NotImplementedException();
    }
}