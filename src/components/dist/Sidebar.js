"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Chatlist_1 = require("./Chatlist");
var Sidebar = function (_a) {
    var onNewChat = _a.onNewChat, chats = _a.chats, onSelectChat = _a.onSelectChat;
    return (react_1["default"].createElement("div", { className: "w-1/4 bg-gray-100 h-full p-4 border-r" },
        react_1["default"].createElement("button", { onClick: onNewChat, className: "w-full bg-blue-500 text-white py-2 rounded mb-4" }, "New Chat"),
        react_1["default"].createElement(Chatlist_1["default"], { chats: chats, onSelectChat: onSelectChat })));
};
exports["default"] = Sidebar;
