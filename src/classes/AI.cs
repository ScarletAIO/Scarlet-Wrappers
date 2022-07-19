using ScarletAI.DTOs;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Text;

namespace ScarletAI;
public class AI
{
    public async Task Analyze(string content)
    {
        // check for URL in content
        var regex = new Regex(@"http(s)?://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?");
        if (regex.IsMatch(content)) {
            var url = regex.Match(content).Value;
            await Task.Run(async () => {
            // Send a post request to the Scarlet API.
            var httpClient = new HttpClient();
            var response = await httpClient.PostAsync(
                "https://api.scarletai.xyz/v3/analyze/link", 
                new StringContent(JsonConvert.SerializeObject(new GlobalDto {
                    domain = url,
                }), Encoding.UTF8, "application/json")
            );
            var responseString = await response.Content.ReadAsStringAsync();
            JsonConvert.DeserializeObject(responseString);
            Console.WriteLine(responseString); // Print the response. DEBUG ONLY.

            return responseString;
        });

        await Task.Delay(0);
        } else {
            await Task.Run(async () => {
                // Send a post request to the Scarlet API.
                var httpClient = new HttpClient();
                var response = await httpClient.PostAsync(
                    "https://api.scarletai.xyz/v3/analyze/msg", 
                    new StringContent(JsonConvert.SerializeObject(new GlobalDto {
                        content = content
                    }), Encoding.UTF8, "application/json")
                );
                var responseString = await response.Content.ReadAsStringAsync();
                JsonConvert.DeserializeObject(responseString);
                Console.WriteLine(responseString); // Print the response. DEBUG ONLY.

                return responseString;
            });

            await Task.Delay(0);
        }
    }
}