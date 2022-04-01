/**
 * @file Implements UI test for rendering dislikes button
 * As we already test the dislike functionality, we should
 * focus on testing whether if it can render the dislikes-button
 * with correct dislikes count.
 */
import React from "react";
import {act, create} from "react-test-renderer";
import TuitStats from "../components/tuits/tuit-stats";

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
    stats: {likes: 125, replies: 235, retuits: 345, dislikes: 555},
    likedByMe: true,
    _id: "12"
}


/**
 * Unit Test whether if it can render dislikes-button with correct count
 */
describe("render dislikes-button with static tuit", () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345,
        dislikes: 555
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                tuit={{...MOCKED_TUIT, stats: stats}}/>
        );
    })

    test("render dislikes-button with static tuit", () => {
        const root = tuitStats.root;
        const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
        let dislikesText = dislikesCounter.children[0];
        expect(dislikesText).toBe('555')
    })
})

/**
 * Unit Test to check if user can dislike a tuit assuming they didn't dislike before
 * By clicking dislike button, the dislikes count of tuit should be added 1
 */
test("Click dislikes button should add 1 to the dislikes count for the tuit"
         + "if user didn't dislike the tuit before", () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345,
        dislikes: 555
    }
    const dislikeTuit = () => {
        act(() => {
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{...MOCKED_TUIT, stats: stats}}
                    dislikeTuit={()=>{}}>
                </TuitStats>
            )
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={dislikeTuit}
                tuit={{...MOCKED_TUIT, stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
    const dislikeTuitButton = root.findByProps({className: 'ttr-dislike-tuit-click'})

    let dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('555')

    act(() => {dislikeTuitButton.props.onClick()})
    dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('556');
})

/**
 * Unit Test to check if user can un-dislike a tuit if they already disliked the tuit
 * By clicking dislike button again, the dislikes count of tuit should be deducted by 1
 */
test("Click dislikes button should add 1 to the dislikes count for the tuit"
     + "if user didn't dislike the tuit before", () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345,
        dislikes: 555
    }
    const dislikeTuit = () => {
        act(() => {
            stats.dislikes--;
            tuitStats.update(
                <TuitStats
                    tuit={{...MOCKED_TUIT, stats: stats}}
                    dislikeTuit={()=>{}}>
                </TuitStats>
            )
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={dislikeTuit}
                tuit={{...MOCKED_TUIT, stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
    const dislikeTuitButton = root.findByProps({className: 'ttr-dislike-tuit-click'})

    let dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('555')

    act(() => {dislikeTuitButton.props.onClick()})
    dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('554');
})

/**
 * Unit Test to check if user can dislike a tuit if they already liked the tuit
 * By clicking dislike button, the likes count of tuit should be deducted by 1 and
 * the dislikes count of tuit should be added by 1
 */
/**
 * Unit Test to check if user can un-dislike a tuit if they already disliked the tuit
 * By clicking dislike button again, the dislikes count of tuit should be deducted by 1
 */
test("Click dislikes button should add 1 to the dislikes count for the tuit"
     + "if user didn't dislike the tuit before", () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345,
        dislikes: 555
    }
    const dislikeTuit = () => {
        act(() => {
            stats.likes--;
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{...MOCKED_TUIT, stats: stats}}
                    dislikeTuit={()=>{}}>
                </TuitStats>
            )
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={dislikeTuit}
                tuit={{...MOCKED_TUIT, stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'})
    const likesCounter = root.findByProps({className: 'ttr-stats-likes'});
    const dislikeTuitButton = root.findByProps({className: 'ttr-dislike-tuit-click'})

    let dislikesText = dislikesCounter.children[0];
    let likesText = likesCounter.children[0];
    expect(dislikesText).toBe('555')
    expect(likesText).toBe('123');

    act(() => {dislikeTuitButton.props.onClick()})
    dislikesText = dislikesCounter.children[0];
    likesText = likesCounter.children[0];
    expect(likesText).toBe('122')
    expect(dislikesText).toBe('556');
})