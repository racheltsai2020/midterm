let auth0Client = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
  
    auth0Client = await auth0.createAuth0Client({
      domain: config.domain,
      clientId: config.clientId
    });
};

const updateUI = async () => {
    const isAuthenticated = await auth0Client.isAuthenticated();
  
    document.getElementById("logout").disabled = !isAuthenticated;
    document.getElementById("login").disabled = isAuthenticated;
};

const login = async () => {
  if(!auth0Client){
    console.error('Auth0 client not initialized yet');
    return;
  }
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/upload.html`
      }
    });
};

const logout = () => {
  if(!auth0Client){
    console.error('Auth0 client not initialized yet');
    return;
  }
    auth0Client.logout({
      logoutParams: {
        returnTo: `${window.location.origin}/index.html`
      }
    });
};

window.onload = async () => {
    await configureClient();
    updateUI();

    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
        return;
    }

    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0Client.handleRedirectCallback();
        updateUI();
        window.history.replaceState({}, document.title, "/");
    }
};

const loginBut = document.getElementById('loginButton');
if(loginBut){
  loginBut.addEventListener('click',function(){login();});
};

const logoutBut = document.getElementById('logoutButton');
if(logoutBut){
  logoutBut.addEventListener('click',function(){logout();});
};

const uploadBut = document.getElementById('uploadButton');
if(uploadBut){
  uploadBut.addEventListener('click',function(){uploadImage();});
};

function uploadImage(){
    var input = document.getElementById('input');
    if(input.files[0] != null){
      var file = input.files[0];
    }
    

    if(!file){
        alert('No file was choosen or the file was invalid');
        return;
    }

    var parm = {
        Bucket: 'cs218midterm',
        Key: file.name,
        Body: file,
    };

    s3.upload(parm, function(err,data){
        if(err){
            console.error('Error', err);
            return;
        }
        console.log('Image uploaded. URL', data.Location);
        alert('Image upload Successfully');
    });
}

module.exports = {
  login,
  logout,
  uploadImage
};

            