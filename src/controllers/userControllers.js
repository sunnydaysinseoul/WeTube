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
  const { username,email, name, password, password2 } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호 확인이 일치하지 않습니다.",
    });
  }
  try {
    const nameExists = await User.exists({ username });
    if (nameExists) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "이미 사용중인 username입니다.",
      });
    }
    const emailExists = await User.exists({ email });
    if (emailExists) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "이미 사용중인 email입니다.",
      });
    }
    await User.create({ username,email, name, password });
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
  const baseUrl = "https://github.com/login/oauth/authorize";
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

  const tokenRequest = await(
    await fetch(finalUrl,{ //js에서 url로 data를 보낼 때 fetch사용
    method:"POST",
    headers:{
      Accept:"application/json" //github에서 text가 아닌 json형식으로 받기위함
    }
  })).json();

  if("access_token" in tokenRequest){ //user가 승인버튼을 눌렀을 때
    //access github api
    const{access_token}=tokenRequest;
    const apiUrl = "https://api.github.com";

    const userData = await (
      await fetch(`${apiUrl}/user`, {
        //데이터에 따라 GET해야할 URL은 Github docs에서.
        headers: {
          Authorization: `token  ${access_token}`,
        },
      })
    ).json();
    // console.log(userData);

    const emailData = await(
      await fetch(`${apiUrl}/user/emails`,{
      headers: {
        Authorization : `token  ${access_token}`,
      }
    })).json();
    // console.log(emailData);

    const emailObj = emailData.find(
      (email)=>email.primary === true && email.verified ===true);
       //github email data중에 primary이고 verified된 email이 없으면
      if(!emailObj){
        return res.redirect("/login"); //나중에 여기에서 error notification도 보내줄거임
      }


      const existingUser = await User.findOne({email:emailObj.email}); //해당 email로 가입된 계정이 있는지
        console.log(existingUser);
      if(existingUser) {
        const hasPw = await User.findOne({email:emailObj.email},'password');
        console.log(hasPw);
        if(hasPw){
          /**case2)github email이 usersDB에 존재하고, password도 등록되어있을 때 ->로그인*/
          req.session.loggedIn=true;
          req.session.user=existingUser;
          return res.redirect("/");
        }
      }else{
        /**case3)github email이 usersDB에 없을 때 -> Join페이지로 (깃허브 email,username 자동입력)*/
       return res.render("join",{ pageTitle: "Login" ,userData,emailObj});
      }

  }else{
    return res.redirect("/login");
  }
}

/* URL : /users/:uId/profile */
export const profile = (req,res)=> {
    return res.send(" Profile page.");
}
