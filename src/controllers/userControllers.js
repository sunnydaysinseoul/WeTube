import User from "../models/User.js";
import Video from "../models/Video.js";
import bcrypt from "bcrypt";

/* URL : / */
export const checkLogin = async (req, res) => {
    if (req.session.loggedIn) {
      const user = req.session.user;
      const videos = await Video.find({});
      return res.render("home", { pageTitle: "Home", videos ,user});
    }
    return res.render("login", { pageTitle: "Login" });
  };
  
/* URL : /join */
export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
  };
export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { username, name, password, password2 } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호 확인이 일치하지 않습니다.",
    });
  }
  try {
    const exists = await User.exists({ username });
    if (exists) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "이미 사용중인 username입니다.",
      });
    }
    await User.create({ username, name, password });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.end();
  }
};


/* URL : /login */
export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  //1.account exists?
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Username does not exists...",
    });
  }
  //2.password check
  const checkPW = await bcrypt.compare(password, user.password);
  if (!checkPW) {
      return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password.",
    });
  } else {
    //3. Login success
    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
  }
};

/* URL : /users/edit */
export const editUser = (req,res)=> {
    return res.send("Edit user page.");
}

/* URL : /users/delete */
export const deleteUser = (req,res)=> {
    return res.send("Delete user page.");
}
/* URL : /users/logout */
export const logout = (req,res)=> {
    req.session.loggedIn = false;
    req.session.user = "";
    return res.redirect("/");
}
/* URL : /users/github/login */
export const startGithubLogin = (req,res)=> {
  const baseUrl = "https://github.com/login/oauth/authorize?client_id=6d3e472414c6ab1f7f16&scope=read:user&allow_signup=false ";
  const config ={
    client_id : process.env.GH_CLIENT,
    scope:"read:user user:email",
    allow_signup:"false"
  };
  const params = new URLSearchParams(config).toString(); //Object를 url param모양으로 만들어줌..
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
}

/* URL : /users/github/finLogin */
export const finishGithubLogin = async(req,res)=> {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id : process.env.GH_CLIENT,
    client_secret : process.env.GH_SECRET,
    code: req.query.code,
  }
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const data = await fetch(finalUrl,{ //js에서 url로 data를 보낼 때 fetch사용
    method:"POST",
    headers:{
      Accept:"application/json"
    }
  });
  const json=await data.json();
  console.log(json);
}

/* URL : /users/:uId/profile */
export const profile = (req,res)=> {
    return res.send(" Profile page.");
}
