"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorHandling(app) {
    app.use((req, res) => {
        // this middleware runs whenever requested page is not available
        res.status(404).json({ message: "This route does not exist" });
    });
    app.use((req, res) => {
        // only render if the error ocurred before sending the response
        if (!res.headersSent) {
            res.status(500).json({
                message: "Internal server error. Check the server console",
            });
        }
    });
}
exports.default = ErrorHandling;
//# sourceMappingURL=index.js.map