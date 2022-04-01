/**
 * @file Implements test for rendering dislikes button
 * As we already test the dislike functionality, we should
 * focus on testing whether if it can render the dislikes-button
 * with correct dislikes count.
 */
import {render, screen} from "@testing-library/react";
import React from "react";
import Tuit from "../components/tuits/tuit";
import {HashRouter} from "react-router-dom";

/**
 * A Mocked Tuit with stats and dislikes count
 */
const MOCKED_TUIT = {
    tuit: "Sample Tuit",
    postedBy: {
        username: "Alice",
        password: "alice123",
        email: "alice@weyland.com",
        _id: "123"
    },
    stats: {likes: 125, replies: 235, dislikes: 555},
    likedByMe: true,
    _id: "12"
}

/**
 * Testing whether if it can render dislikes-button with correct count
 */
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
