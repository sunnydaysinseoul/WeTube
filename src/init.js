/**  각종 import와 시작명령어들을 포함할 곳 */
import "dotenv/config";
import "./db.js";
import "./models/Video.js";
import "./models/User.js";
import "./models/Comment.js";
import app from "./server.js";

const PORT =process.env.PORT || ;

//Port를열고 외부 접속(request)을 listen하기
const handleListening = () => 
    console.log(`✅Server listening on port ${PORT}.👍`);
app.listen(PORT,'0.0.0.0',handleListening);
