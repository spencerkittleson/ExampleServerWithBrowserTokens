async function main() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("start")) {
    const userInfo = await apiRequest(
      "https://custom-dictionary.mindtouch.es/@api/deki/users/current"
    );
    const homeInfo = await apiRequest(
      "https://custom-dictionary.mindtouch.es/@api/deki/pages/home/info"
    );
    document.querySelector("#userInfo").innerText = JSON.stringify(userInfo);
    document.querySelector("#homePage").innerText = JSON.stringify(homeInfo);
  }
}

async function apiRequest(url) {
  
  // https://success.mindtouch.com/Integrations/API/Authorization_Tokens/Use_a_Browser_API_Token_With_an_Integration
  const key =
    "-";
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      "X-Deki-Token": key,
    },
  });
  const data = await response.text();
  return data;
}

main();
