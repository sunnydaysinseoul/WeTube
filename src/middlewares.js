import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteTitle = "WeTube HYS";

  res.locals.loggedIn = Boolean(req.session.loggedIn);
  if (res.locals.loggedIn) {
    res.locals.loggedInUser = req.session.user || {}; //- =user가 없을 때는 빈 object를 저장
  }
  next();
};

export const protectorMiddleware = (req, res, next) => {
  //user가 loggin되어있지 않으면 login화면으로 보내기
  //edit user 등의 화면을 로그인하지않은 사람이 직접입력하는 경우 등 방지
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  //controller가 아닌 router에 사용
  dest: "uploads/avatars/",
  limits: {
    fileSize: 50000000, //bytes
  },
});
export const videoUpload = multer({
  //controller가 아닌 router에 사용
  dest: "uploads/videos/",
  limits: {
    fileSize: 100000000, //bytes }
  },
});
