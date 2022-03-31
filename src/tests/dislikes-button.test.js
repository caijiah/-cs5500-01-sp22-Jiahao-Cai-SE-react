import {render, screen} from "@testing-library/react";
import React from "react";
import Tuit from "../components/tuits/tuit";
import {HashRouter} from "react-router-dom";

const MOCKED_TUIT = {
    tuit: "Sample Tuit",
    postedBy: {
        username: "Alice",
        password: "alice123",
        email: "alice@weyland.com",
        _id: "123"
    },
    stats: {dislikes: 555},
    likedByMe: true,
    _id: "12"
}

describe("render dislikes-button with static tuit", () => {
    render(
        <HashRouter>
            <Tuit tuit={MOCKED_TUIT}/>
        </HashRouter>
    )

    test("render dislikes-button with static tuit", () => {
        const dislikesButton = screen.getByText('555', {exact: true})
        expect(dislikesButton).toBeInTheDocument();
    })
})