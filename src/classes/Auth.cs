using ScarletAI.DTOs;
using Newtonsoft.Json;
using System.Text;

namespace ScarletAI;
public class Auth {
    [JsonProperty("username")]
    public string? Username { get; set; }
    [JsonProperty("password")]
    public string? Password { get; set; }
    [JsonProperty("id")]
    public string? Id { get; set; }
    [JsonProperty("refreshKey")]
    public string? RefreshKey { get; set; }
    
public int? Age { get; set; }
    /// <summary>
    /// Authenticates a user with the Scarlet API.
    /// </summary>
    public async Task Register(GlobalDto user) 
    {
        await Task.Run(async () => {
            // Send a post request to the Scarlet API.
            var httpClient = new HttpClient();
            var response = await httpClient.PostAsync(
                "https://api.scarletai.xyz/v3/auth/token", 
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

    /// <summary>
    /// Generates a new Token for the user. Requires the user to be authenticated.
    /// </summary>

    public async Task RefreshToken(GlobalDto user) 
    {
        await Task.Run(async () => {
            // Send a post request to the Scarlet API.
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + user.token);
            var response = await httpClient.PostAsync(
                "https://api.scarletai.xyz/v3/auth/refresh-token", 
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
};