import User, { Token } from "../models/User.js";
import Video from "../models/Video.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

/* URL : / */
export const checkLogin = async (req, res) => {
  const videos = await Video.find({});
  if (req.session.loggedIn) {
    const user = req.session.user;
    return res.render("home", { pageTitle: "Home", videos, user });
  }
  // return res.render("login", { pageTitle: "Login" });

  //테스트용
  return res.render("home", { pageTitle: "Home", videos });
};

/* URL : /join */
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { username, email, name, password, password2, isVerified } =
    req.body;
  
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "비밀번호 확인이 일치하지 않습니다.",
    }); ///=========깃허브로그인할때 안되니 나중에, render하지 말고 그냥 알림창 띄우고 return으로 바꾸기!!!=============
  }
  try {
    const nameExists = await User.exists({ username });
    if (nameExists) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "이미 사용중인 username입니다.", ///=========깃허브로그인할때 안되니 나중에, render하지 말고 그냥 알림창 띄우고 return으로 바꾸기!!!=============
      });
    }
    const emailExists = await User.exists({ email });
    if (emailExists) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "이미 사용중인 email입니다.", ///=========깃허브로그인할때 안되니 나중에, render하지 말고 그냥 알림창 띄우고 return으로 바꾸기!!!=============
      });
    }
    await User.create({
      username,
      email,
      name,
      password,
      isVerified,
      avatarUrl,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.render("404");
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

/* URL : /users/:userId/edit */
export const getEditUser = (req, res) => {
  const {user} = req.session;
  return res.render("editProfile", { PageTitle: " Edit Profile",user });
};

/* URL : /users/:userId/edit */
export const postEditUser = async(req, res) => {
  //form 내용 user에 저장
  const {
    session:{
      user:{_id,avatarUrl},
    },
    body : {password,password2},
    file
  } =req;

  const user = await User.findById(_id);
    if (password !== password2) {
      return res.status(400).render("join", {
        pageTitle,
        errorMessage: "비밀번호 확인이 일치하지 않습니다.",
      }); ///=========나중에 render하지 말고 그냥 알림창 띄우고 return으로 바꾸기!!!=============
    }
    user.avatarUrl = avatarUrl;
    user.password = password;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { password,
        avatarUrl:file? file.path:avatarUrl},
      { new: true }
    );
    req.session.user = updatedUser;
    user.password = updatedUser.password;
    await user.save(); //findByIdAndUpdate를 하면 User Schema의 pre("save",())가 안탐
    
  return res.redirect(`/users/${_id}/profile`);
};

/* URL : /users/${user._id}/profile */
export const profile = async(req, res) => {
  const {userId}= req.params;
  const user = await User.findById(userId);
  return res.render("viewProfile", { PageTitle: " Profile",user });
};

/* URL : /users/delete */
export const deleteUser = (req, res) => {
  return res.send("Delete user page.");
};
/* URL : /users/logout */
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
/* URL : /users/github/login */
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    scope: "read:user user:email",
    allow_signup: "false",
  };
  const params = new URLSearchParams(config).toString(); //Object를 url param모양으로 만들어줌..
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
/* URL : /confirmation/:email/:token (이미 가입된 email로 github로그인 첫 시도할 떄. Email verification)*/
export const confirmEmail = async (req, res, next) => {
  await Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired
    if (!token) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please try again.",
      });
    }
    // if token is found then check valid user
    else {
      User.findOne(
        { _id: token._userId, email: req.params.email },
        function (err, user) {
          // not valid user
          if (!user) {
            return res.status(401).send({
              msg: "We were unable to find a user for this verification. Please SignUp!",
            });
          }
          // user is already verified
          else if (user.isVerified) {
            return res
              .status(200)
              .send("User has been already verified. Please Login");
          }
          // verify user
          else {
            // change isVerified to true
            user.isVerified = true;
            user.save(function (err) {
              // error occur
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              // account successfully verified
              else {
                return res
                  .status(200)
                  .send("Your account has been successfully verified");
              }
            });
          }
        }
      );
    }
  });
};

/* URL : /users/github/finLogin */
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code, //user가 승인하면 github에서 /github/finLogin?code=xxx 이렇게 redirect해줌
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      //js에서 url로 data를 보낼 때 fetch사용
      //우리는 github API(finalUrl)로 POST request를 보낼 것
      method: "POST",
      headers: {
        Accept: "application/json", //github에서 text가 아닌 json형식으로 받기위함
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    //위에서 API로 POST request를 보내고 문제가없으면 access_token값을 return받게될 것.
    //access github api
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";

    const gitUserData = await (
      await fetch(`${apiUrl}/user`, {
        //데이터에 따라 GET해야할 URL은 Github docs에서.
        headers: {
          Authorization: `token  ${access_token}`, //받은 access_token을 이용해 API에게 user정보 요청하기
        },
      })
    ).json();
    console.log(gitUserData);

    const gitEmailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token  ${access_token}`, //받은 access_token을 이용해 API에게 user email정보 요청하기
        },
      })
    ).json();
    // console.log(gitEmailData);

    const gitEmailObj = gitEmailData.find(
      (email) => email.primary === true && email.verified === true
    );
    //github email data중에 primary이고 verified된 email이 없으면
    if (!gitEmailObj) {
      return res.redirect("/login"); //=======나중에 여기에서 error notification도 보내줄거임
    }

    const existingUser = await User.findOne({ email: gitEmailObj.email }); //해당 email로 가입된 계정이 있는지
    console.log("해당email로 가입된 계정" + existingUser);
    if (existingUser) {
      const isVerifiedObj = await User.findOne(
        { email: gitEmailObj.email },
        "isVerified"
      );
      console.log(isVerifiedObj);
      if (isVerifiedObj.isVerified) {
        /**case1)github email이 usersDB에 존재하고, isVerified=true일 때 ->로그인성공*/
        req.session.loggedIn = true;
        req.session.user = existingUser;
        return res.redirect("/");
      } else {
        /**case1)github email이 usersDB에 존재하는데, isVerified=false일 때 ->alert띄워서 email verification후 isVerified=true로 업데이트*/
        /** Alert : "It seemed like you already made an account without Github. Please verify your email to login with Github." */
        var token = new Token({
          _userId: existingUser._id,
          token: crypto.randomBytes(16).toString("hex"),
        });
        token.save(function (err) {
          if (err) {
            console.log("tokensave error!");
            res.end();
          } // Send email (use credintials of SendGrid)
          var mailer = nodemailer.createTransport({
            service: "Sendgrid",
            auth: {
              user: process.env.SENDGRID_USERNAME,
              pass: process.env.SENDGRID_PASSWORD,
            },
          });
          var mailOptions = {
            from: "no-reply@wetubeHYS.com",
            to: gitEmailObj.email,
            subject: "Account Verification Link",
            text:
              "Hello, " +
              ",\n\n" +
              "Please verify your account by clicking the link: \nhttp://" +
              req.headers.host +
              "/confirmation/" +
              gitEmailObj.email +
              "/" +
              token.token +
              "\n\nThank You!\n",
          };
          mailer.sendMail(mailOptions, function (err) {
            if (err) {
              return res.status(500).send({ msg: err.message });
            }
            return res.status(200).send(
              `A verification email has been sent to
                  ${gitEmailObj.email}. It will be expire after one hour.`
            );
          });
        });
      }
    } else {
      /**case3)github email이 usersDB에 없을 때 -> Join페이지로 (깃허브 email,username 자동입력)*/
      return res.render("join", {
        pageTitle: "Join",
        gitUserData,
        gitEmailObj,
      });
    }
  } else {
    return res.redirect("/login");
  }
};
