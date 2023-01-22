import app, { init } from "./app.js";
var port = process.env.PORT || 4000;
init().then(function () {
    app.listen(port, function () {
        console.log("Server is listening on port ".concat(port, "."));
    });
});
