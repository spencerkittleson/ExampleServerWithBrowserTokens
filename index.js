const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.static("public"));

// GET method route
app.get("/@api/token", (req, res) => {
  const redirect = encodeURIComponent("https://custom-dictionary.mindtouch.es/Redirect");
  const signature = encodeURI(getUserSig("admin"));

  // https://success.mindtouch.com/Integrations/API/Authorization_Tokens/Use_a_Server_API_Token_With_an_Integration?mt-learningpath=integrations-server
  // https://{hostname}/@api/deki/users/authenticate?x-deki-token={signature}&redirect={redirect}
  res.redirect(
    "https://custom-dictionary.mindtouch.es/@api/deki/users/authenticate?x-deki-token=" +
      signature +
      "&redirect=" +
      redirect
  );
});

app.listen(3004, () => {
  console.log(`Example app listening on port 3004`);
});

function getUserSig(userName) {
  // Server API Token key and secret are available from API token management dashboard when Server API Token is generated
  const key =
    "-";
  const secret =
    "-";

  // include username prefixed with '='
  let user = "=" + userName;

  // hash time, key, user with secret

  const hmac = crypto.createHmac("sha256", secret);
  const epoch = Math.floor(Date.now() / 1000);
  hmac.update(`${key}_${epoch}_${user}`);
  const hash = hmac.digest("hex");
  const token = `tkn_${key}_${epoch}_${user}_${hash}`;
  return token;
}
