import User, { Token } from "../models/User.js";
import Video from "../models/Video.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

/* URL : / */
export const checkLogin = async (req, res) => {
  const videos = await Video.find({}).populate("owner");
  // console.log(videos);
  if (req.session.loggedIn) {
    const user = req.session.user;
    return res.render("home", { pageTitle: "Home", videos, user });
  }
  return res.render("home", { pageTitle: "Home", videos });
};

export const sendEmail = (uid, uemail, req, res, resend) => {
  //필요: user._id, 이메일주소 (gitEmailObj.email)

  var token = new Token({
    _userId: uid,
    token: crypto.randomBytes(16).toString("hex"),
  });
  token.save(function (err) {
    if (err) {
      console.log("tokensave error!");
      res.end();
    }
    const setApiKey = () => sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    console.log("sendEmail함수안 :" + uemail);
    setApiKey();
    const msg = {
      from: "youngsunhan.kr@gmail.com",
      to: uemail,
      subject: "Account Verification Link",
      text:
        "Hello, " +
        "\n\n" +
        "Please verify your account by clicking the link: \nhttp://" +
        req.headers.host +
        "/confirmation/" +
        uemail +
        "/" +
        token.token +
        "\n\nThank You!\n",
    };
    // console.log(msg.text);
    (async () => {
      try {
        await sgMail.send(msg);
        if (resend == true) {
          req.flash("info", "인증링크 재발송완료");
        }
        return res.status(401).render("emailAuth", {
          msg: `${uemail}로 인증링크가 발송되었습니다.`,
          id: uid,
        });
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
          return res.render("404");
        }
      }
    })();
  });
};


/* URL : /users/reauth */
export const reauth = async (req, res) => {
  const user = await User.findById(req.body.id);
  if (user.isVerified == true) {
    req.flash("error", "이미 이메일 인증이 완료된 아이디입니다.");
    return res.redirect("/login");
  }
  // console.log("======================="+user);
  // console.log(user.id, user.email);
  sendEmail(user._id, user.email, req, res, true);
};
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { username, email, name, password, password2, isVerified, avatarUrl } =
    req.body;

  if (password !== password2) {
    req.flash("error", "비밀번호 확인이 일치하지 않습니다.");
    return res
      .status(406)
      .render("join", { pageTitle: "Join", temp: req.body });
  } else {
    try {
      const nameExists = await User.exists({ username });
      if (nameExists) {
        req.flash("error", "이미 사용중인 ID입니다.");
        return res
          .status(406)
          .render("join", { pageTitle: "Join", temp: req.body });
      }
      const emailExists = await User.exists({ email });
      if (emailExists) {
        req.flash("error", "이미 사용중인 email입니다..");
        return res
          .status(406)
          .render("join", { pageTitle: "Join", temp: req.body });
      }
      const newUser = await User.create({
        username,
        email,
        name,
        password,
        isVerified,
        avatarUrl,
      });
      if (newUser.isVerified !== true) {
        sendEmail(newUser._id, email, req, res, false);
      } else {
        req.flash("info", "회원가입 완료");
        return res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
      return res.render("404");
    }
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
    req.flash("error", "존재하지 않는 아이디입니다.");
    return res.status(400).render("login", {
      pageTitle,
    });
  }
  //2.password check
  const checkPW = await bcrypt.compare(password, user.password);
  if (!checkPW) {
    req.flash("error", "비밀번호가 틀립니다.");
    return res.status(400).render("login", {
      pageTitle,
    });
  }

  if (user.isVerified == false) {
    return res
      .status(401)
      .render("emailAuth", { email: user.email, id: user._id });
  } else {
    //3. Login success
    req.session.loggedIn = true;
    req.session.user = user;
    req.flash("info", "로그인되었습니다.");
    return res.redirect("/");
  }
};

/* URL : /users/:userId/edit */
export const getEditUser = (req, res) => {
  const { user } = req.session; //현재 로그인된 유저
  return res.render("editProfile", { pageTitle: " Edit Profile", user });
};

/* URL : /users/:userId/edit */
export const postEditUser = async (req, res) => {
  //form 내용 user에 저장
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { password, password2 },
    file,
  } = req;

  const user = await User.findById(_id);
  if (password !== password2) {
    req.flash("error", "비밀번호 확인이 일치하지 않습니다");
    // return res.redirect(`/users/${user._id}/edit`);
    console.log("비밀번호 오류");
    return res.status(406);
  } else {
    user.avatarUrl = avatarUrl;
    user.password = password;
    user.avatarUrl = file ? file.path : avatarUrl;
    user.new = true;
    // const updatedUser = await User.findByIdAndUpdate(
    //   _id,
    //   { avatarUrl: file ? file.path : avatarUrl },
    //   { new: true }
    // );
    await user.save(); //findByIdAndUpdate를 하면 User Schema의 pre("save",())가 안탐
    req.session.user = user;
    req.flash("info", "회원정보가 저장되었습니다.");
    return res.redirect(`/users/${_id}/edit`);
  }
};

/* URL : /users/${user._id}/profile */
export const profile = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("videos");
  if (!user) {
    req.flash("error", "잘못된 접근입니다.");
    return res.status(404).render("404");
  }
  return res.render("viewProfile", {
    pageTitle: `${user.name}의 Profile`,
    user,
  });
};

/* URL : /users/:userId/delete */
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  // console.log(`============${typeof(req.session.user._id)}==========${typeof(user._id)}=================`);
  if (String(req.session.user._id) !== String(user._id)) {
    req.flash("error", "잘못된 접근입니다.");
    return res.status(404).render("404");
  }

  await Video.findOneAndDelete({ owner: user._id });
  await User.findByIdAndDelete(userId);
  req.flash("info", "회원탈퇴처리되었습니다.");
  req.session.destroy();
  res.redirect("/");
};

/* URL : /users/logout */
export const logout = (req, res) => {
  req.flash("info", "로그아웃되었습니다.");
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

/* URL : /confirmation/:email/:token (이미 가입된 email로 github로그인 첫 시도할 때. Email verification)*/
export const confirmEmail = async (req, res, next) => {
  const token = await Token.findOne({ token: req.params.token });

  // token is not found into database i.e. token may have expired
  if (!token) {
    req.flash("error", "알 수 없는 오류가 발생하였습니다.");
    return res.status(400).redirect("/");
  }
  // if token is found then check valid user
  else {
    User.findOne(
      { _id: token._userId, email: req.params.email },
      function (err, user) {
        // not valid user
        if (req.session.loggedIn == true) {
          req.flash("error", "접근권한이 없습니다.");
          return res.status(400).redirect("/");
        }
        if (!user) {
          req.flash("error", "인증요청 내용을 찾을 수 없습니다. 가입해주세요.");
          return res.status(401).redirect("/join");
        }
        // user is already verified
        else if (user.isVerified) {
          req.flash("info", "이미 인증이 완료되었습니다. 로그인해주세요.");
          return res.status(200).redirect("/login");
        }
        // verify user
        else {
          // change isVerified to true
          user.isVerified = true;
          user.save(function (err) {
            // error occur
            if (err) {
              req.flash("error", "서버에 일시적인 문제가 발생했습니다.");
              console.log(err.message);
              return res.status(500).redirect("/");
            }
            // account successfully verified
            else {
              req.flash(
                "info",
                "정상적으로 인증이 완료되었습니다. 로그인해주세요."
              );
              return res.status(200).redirect("/login");
            }
          });
        }
      }
    );
  }

  // console.log(token.token);
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
    // console.log(gitUserData);

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
      req.flash(
        "error",
        "Github 계정 설정에서 email 본인인증을 먼저 해주세요."
      );
      return res.redirect("/login");
    }

    const existingUser = await User.findOne({ email: gitEmailObj.email }); //해당 email로 가입된 계정이 있는지
    // console.log("해당email로 이미 가입된 계정" + existingUser);
    if (existingUser) {
      const isVerifiedObj = await User.findOne(
        { email: gitEmailObj.email },
        "isVerified"
      );
      // console.log(isVerifiedObj);
      if (isVerifiedObj.isVerified) {
        /**case1)github email이 usersDB에 존재하고, isVerified=true일 때 ->로그인성공*/
        req.session.loggedIn = true;
        req.session.user = existingUser;
        req.flash("info", "로그인되었습니다.");
        return res.redirect("/");
      }
    }
    /**case2)github email이 usersDB에 없을 때 -> Join페이지로 (깃허브 email,username 자동입력)*/
    return res.render("join", {
      pageTitle: "Join",
      gitUserData,
      gitEmailObj,
    });
  }
};
