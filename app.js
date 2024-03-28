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
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}/upload.html`
      }
    });
};

const logout = () => {
  
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

document.getElementById('loginButton').addEventListener('click',function(){login();});


document.getElementById('logoutButton').addEventListener('click',function(){logout();});

document.getElementById('uploadButton').addEventListener('click',function(){uploadImage();});

function uploadImage(){
    var input = document.getElementById('input');
    var file = input.files[0];
    

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


            