function updateVarsFromLocalStorage(data) {
  if (data == null) return;
  let siteList = document.getElementById('site-list');
  for (i=0; i < data.length; i++) {
    // Skip if it already has an option tag
    if(siteList.querySelectorAll('[value="'+data[i]+'"]').length > 0) continue;
    let new_option = document.createElement('option');
    new_option.value = data[i];
    siteList.appendChild(new_option);
  }
}
function copy2clipboard(inputField) {
  let copyText = document.getElementById(inputField);
  copyText.type = 'text';
  copyText.select();
  if(document.execCommand('copy')) {
    copyText.type = 'password';
    return true;
  }
  console.log('Could not add password to clipboard.');
  return false;
}
function copy2localStorage(variable) {
  let data = JSON.parse(localStorage.getItem('mhpgVars'));
  if(data.indexOf(variable) == -1) {
    data.push(variable);
    localStorage.setItem('mhpgVars', JSON.stringify(data.sort()));
  }
}
function passwordSwitcher(inputField) {
  let passwordField = document.getElementById(inputField);
  if(passwordField.type == 'text') {
    passwordField.type = 'password';
  } else {
    passwordField.type = 'text';
  }
}
function hash(master, domain) {
  let passwordLength = parseInt(document.getElementById('passwordLength').value);
  let MD5 = new Hashes.MD5;
  let SHA1 = new Hashes.SHA1;
  let SHA256 =  new Hashes.SHA256;
  let SHA512 = new Hashes.SHA512;
  let RMD160 = new Hashes.RMD160;
  switch(document.getElementById('algorithm').selectedIndex) {
    case 0: return pwdHash.getHashedPassword(master, domain).substring(0, passwordLength);
    case 1: return MD5.hex(master + ':' + domain).substring(0, passwordLength);
    case 2: return MD5.b64(master + ':' + domain).substring(0, passwordLength);
    case 3: return SHA1.hex(master + ':' + domain).substring(0, passwordLength);
    case 4: return SHA1.b64(master + ':' + domain).substring(0, passwordLength);
    case 5: return SHA256.hex(master + ':' + domain).substring(0, passwordLength);
    case 6: return SHA256.b64(master + ':' + domain).substring(0, passwordLength);
    case 7: return SHA512.hex(master + ':' + domain).substring(0, passwordLength);
    case 8: return SHA512.b64(master + ':' + domain).substring(0, passwordLength);
    case 9: return RMD160.hex(master + ':' + domain).substring(0, passwordLength);
    case 10: return RMD160.b64(master + ':' + domain).substring(0, passwordLength);
  }
}
function createPwd() {
    const variable = document.getElementById('site').value.toLowerCase();
    const pwd = hash(document.getElementById('password').value, variable);
    document.getElementById('hashedPw').value = '';
    document.getElementById('hashedPw').value = pwd;
    if(copy2clipboard('hashedPw')) {
      let tooltip = document.getElementById('tooltip');
      tooltip.style.opacity = '.75';
      setTimeout(function() {
        document.getElementById('tooltip').style.opacity = '0';
      }, 2000);
      setTimeout(function() {
        document.getElementById('hashedPw').type = 'password';
      }, 25000);
    }
    copy2localStorage(variable);
    updateVarsFromLocalStorage([variable]);
}
window.onload = function() {
  let data = JSON.parse(localStorage.getItem('mhpgVars'));
  updateVarsFromLocalStorage(data);
};
