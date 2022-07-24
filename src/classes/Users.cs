using System.Text;
using Newtonsoft.Json;
using ScarletAI.DTOs;
namespace ScarletAI;
public class User
{
    [JsonProperty("username")]
    public string? Username { get; set; }
    [JsonProperty("password")]
    public string? Password { get; set; }
    [JsonProperty("email")]
    public string? Email { get; set; }
    [JsonProperty("firstName")]
    public string? FirstName { get; set; }
    [JsonProperty("age")]
    public int? Age { get; set; }

    public async Task Create(CreateUserDto user)
    {   
        await Task.Run(async () => {
            // Send a post request to the Scarlet API.
            var httpClient = new HttpClient();
            var response = await httpClient.PostAsync(
                "https://api.scarletai.xyz/v3/users", 
                new StringContent(JsonConvert.SerializeObject(user),
                Encoding.UTF8, "application/json"
            ));
            var responseString = await response.Content.ReadAsStringAsync();
            JsonConvert.DeserializeObject(responseString);
            Console.WriteLine(responseString); // Print the response. DEBUG ONLY.

            return responseString;
        });

        await Task.Delay(0);
    }

    public async Task Update(string id, GlobalDto toUpdate)
    {
        if (new Auth().CheckIfTokenIsExpired(toUpdate).Result == (true || false)) {
            await Task.Run(async () => {
                // Send a post request to the Scarlet API.
                var httpClient = new HttpClient();
                var response = await httpClient.PutAsync(
                    "https://api.scarletai.xyz/v3/users/" + id, 
                    new StringContent(JsonConvert.SerializeObject(toUpdate), 
                    Encoding.UTF8, "application/json"
                ));
                var responseString = await response.Content.ReadAsStringAsync();
                JsonConvert.DeserializeObject(responseString);
                Console.WriteLine(responseString); // Print the response. DEBUG ONLY.

                return responseString;
            });
        }

        await Task.Delay(0);
    }

    public async Task Delete(GlobalDto user)
    {
        if (new Auth().CheckIfTokenIsExpired(user).Result == (true || false)) {
            await Task.Run(async () => {
            // Send a post request to the Scarlet API.
                var httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + user.token);
                var response = await httpClient.DeleteAsync(
                    "https://api.scarletai.xyz/v3/users/" + user.id
                );
                var responseString = await response.Content.ReadAsStringAsync();
                JsonConvert.DeserializeObject(responseString);
                Console.WriteLine(responseString); // Print the response. DEBUG ONLY.

                return responseString;
            });
        }

        await Task.Delay(0);
    }

    public async Task Get(GlobalDto user) {
        if (new Auth().CheckIfTokenIsExpired(user).Result == (true || false)) {
            await Task.Run(async () => {
                // Send a post request to the Scarlet API.
                var httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders
                    .Add("Authorization", "Bearer " + user.token);
                httpClient.DefaultRequestHeaders
                    .Add("Refresh-Key", user.refreshKey);
                var response = await httpClient.GetAsync(
                    "https://api.scarletai.xyz/v3/users/" + user.id
                );
                var responseString = await response.Content.ReadAsStringAsync();
                JsonConvert.DeserializeObject(responseString);
                Console.WriteLine(responseString); // Print the response. DEBUG ONLY.

                return responseString;
            });
        }

        await Task.Delay(0);
    }
};