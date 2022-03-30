/**
 * @file Implements tests for my dislikes screen
 */
import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import MyDislikes from "../components/profile/my-dislikes";
import {api, userTogglesTuitDislikes} from "../services/dislikes-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuitByUser, deleteTuitByContent, findTuitById} from "../services/tuits-service";
import {userTogglesTuitLikes} from "../services/likes-service";
import {login, logout, signup} from "../services/auth-service";

/**
 * Mock disliked tuits with stats that contains dislikes count
 */
const MOCKED_DISLIKED_TUITS = [
    {
        tuit: "disliked tuit 1",
        postedBy: {
            username: "Alice",
            password: "alice123",
            email: "alice@weyland.com",
            _id: "123"
        },
        stats: {dislikes: 999},
        likedByMe: true,
        _id: "12"
    },
    {
        tuit: "disliked tuit 2",
        postedBy: {
            username: "Alice",
            password: "alice123",
            email: "alice@weyland.com",
            _id: "123"
        },
        stats: {dislikes: 333},
        likedByMe: true,
        _id: "23"
    },
    {
        tuit: "disliked tuit 3",
        postedBy: {
            username: "Alice",
            password: "alice123",
            email: "alice@weyland.com",
            _id: "123"
        },
        stats: {dislikes: 111},
        likedByMe: true,
        _id: "34"
    }
];

describe('my dislikes screen renders disliked tuit mocked '
         + 'and also displays correct dislikes count', () => {
    const mock = jest.spyOn(api, 'get');

    afterEach(()=> {
        mock.mockRestore();
    })

    test("my dislikes screen renders disliked tuit mocked"
         + "and also displays correct dislikes count", async () => {
        mock.mockImplementation(() => {
            return  Promise.resolve({data: MOCKED_DISLIKED_TUITS});
        });

        // question: why act not work?
        // act(()=> {
        //     render(
        //         <MyDislikes/>
        //     )
        // })

        render(
            <MyDislikes/>
        )

        await waitFor(() => {
            MOCKED_DISLIKED_TUITS.map(eachTuit => {
                let name = eachTuit.postedBy.username
                // console.log(eachTuit)
                const dislikesCount = eachTuit.stats.dislikes
                // substring match, ignore case, same as /alice/i
                // check if all tuits are rendered
                const nameElements =  screen.getAllByText(name, {exact: false});
                const tuitElements =  screen.getAllByText(eachTuit.tuit, {exact: false});
                nameElements.forEach(e => expect(e).toBeInTheDocument());
                tuitElements.forEach(e => expect(e).toBeInTheDocument());
                // check if correct dislikes count is rendered
                expect(screen.getByText(dislikesCount)).toBeInTheDocument();
            })
        })
    })
});