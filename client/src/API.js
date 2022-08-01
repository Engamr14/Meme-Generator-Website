// ********** Auth APIs ********** //

async function login(credentials) {
  let response = await fetch('/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const user = await response.json();
    return user.name;
  }
  else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    }
    catch (err) {
      throw err;
    }
  }
}

async function logout() {
  await fetch('/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
  const response = await fetch('/sessions/current');
  const userInfo = await response.json();

  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}

// **** AddUser API **** //

async function addUser(user) {
  const response = await fetch(('/AddUser'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return response.ok ? null : { 'err': 'POST error' };
}

async function checkUserName(name) {
  let url = '/CheckUserName/' + name;

  const response = await fetch(url);
  const checkResultJson = await response.json();

  if (response.ok) {
    return checkResultJson;
  } else {
    throw checkResultJson;
  }
};

// **** Meme APIs **** //

async function getAllMemes() {
  let url = '/Home/All';

  const response = await fetch(url);
  const MemesJson = await response.json();

  if (response.ok) {
    return MemesJson.map((meme) => ({
      key: meme.key, user: meme.user, title: meme.title, imgID: meme.imgID, text1: meme.text1, text2: meme.text2,
      fontFamily: meme.fontFamily, fontSize: meme.fontSize, fontColor: meme.fontColor, visibility: meme.visibility
    }));
  } else {
    throw MemesJson;
  }
};

async function getPublicMemes() {
  let url = '/Home/Public';

  const response = await fetch(url);
  const MemesJson = await response.json();

  if (response.ok) {
    return MemesJson.map((meme) => ({
      key: meme.key, user: meme.user, title: meme.title, imgID: meme.imgID, text1: meme.text1, text2: meme.text2,
      fontFamily: meme.fontFamily, fontSize: meme.fontSize, fontColor: meme.fontColor, visibility: meme.visibility
    }));
  } else {
    throw MemesJson;
  }
};

async function getMemesByUser(user) {
  let url = '/MyPage/';
  if (user) {
    url += "/" + user;
  }

  const response = await fetch(url);
  const MemesJson = await response.json();

  if (response.ok) {
    return MemesJson.map((meme) => ({
      key: meme.key, user: meme.user, title: meme.title, imgID: meme.imgID, text1: meme.text1, text2: meme.text2,
      fontFamily: meme.fontFamily, fontSize: meme.fontSize, fontColor: meme.fontColor, visibility: meme.visibility
    }));
  } else {
    throw MemesJson;
  }
};

async function addMeme(meme) {
  const response = await fetch(('/CreateMeme'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meme)
  });
  return response.ok ? null : { 'err': 'POST error' };
}

async function deleteMeme(key) {
  return new Promise((resolve, reject) => {
    fetch("/Home/" + key, {
      method: 'DELETE'
    }).then(response => {
      if (response.ok)
        resolve(null);
    }).catch(err => reject({ 'err': 'DELETE error' })); // connection errors
  });
}

const API = { getPublicMemes, getAllMemes, getMemesByUser, addMeme, deleteMeme, login, logout, getUserInfo, addUser, checkUserName };
export default API;
