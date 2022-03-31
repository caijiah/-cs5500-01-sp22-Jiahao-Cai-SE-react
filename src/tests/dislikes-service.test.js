/**
 * @file Implements tests for dislikes API
 */
import {createUser, deleteUsersByUsername} from "./services";
import {createTuitByUser, deleteTuitByContent, findTuitById} from "../services/tuits-service";
import {userTogglesTuitDislikes} from "../services/dislikes-service";
import {userTogglesTuitLikes} from "../services/likes-service";

describe('user can dislike a tuit with REST API', () => {
    // sample tuit to insert
    const sampleTuit = {
        tuit: "Unique sample tuit for test!",
        postedOn: "2022-03-09T00:00:00.000Z"
    }

    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    }

    let uid = null;
    let tid = null;
    let newTuit = null;

    // setup test before running test
    beforeAll(async ()=> {
        let promises = []
        // remove user and tuit before we create our new user and tuit
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuitByContent(sampleTuit.tuit));
        await Promise.all(promises);
        // create a new user
        const author = await createUser(ripley);
        uid = author._id
        // create a new tuit
        newTuit = await createTuitByUser(author._id, sampleTuit);
        tid = newTuit._id;
    })

    // clean up after test runs
    afterAll(async () => {
        // make sure we remove the dislike after the test
        if (newTuit.stats.dislikes > 0) {
            await userTogglesTuitDislikes(uid, tid);
        }
        let promises = []
        // remove testing data
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuitByContent(sampleTuit.tuit));
        return Promise.all(promises);
    })

    test("user can dislike a tuit",async () => {
        // new tuit should have 0 dislike
        expect(newTuit.stats.dislikes).toEqual(0);
        // do the dislike
        const dislike = await userTogglesTuitDislikes(uid, tid);
        newTuit = await findTuitById(tid);
        // user dislikes this tuit
        expect(newTuit.stats.dislikes).toEqual(1);
    })

});

describe('user can un-dislikes a tuit with REST API '
         + 'if they already disliked the tuit', () => {
    // sample tuit to insert
    const sampleTuit = {
        tuit: "Unique sample tuit for test!",
        postedOn: "2022-03-09T00:00:00.000Z"
    }

    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    }

    let uid = null;
    let tid = null;
    let newTuit = null;

    // setup test before running test
    beforeAll(async ()=> {
        let promises = []
        // remove user and tuit before we create our new user and tuit
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuitByContent(sampleTuit.tuit));
        await Promise.all(promises);
        // create a new user and a new tuit
        const author = await createUser(ripley);
        uid = author._id
        newTuit = await createTuitByUser(author._id, sampleTuit);
        tid = newTuit._id;
        // make user already dislikes the tuit
        const dislike = await userTogglesTuitDislikes(uid, tid);
    })

    // clean up after test runs
    afterAll(async () => {
        let promises = []
        // remove our testing data
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuitByContent(sampleTuit.tuit));
        return Promise.all(promises);
    })

    test("user can un-dislike a tuit "
         + "if they already disliked the tuit",async () => {
        newTuit = await findTuitById(tid);
        // user already dislikes the tuit, so count of dislikes is 1.
        expect(newTuit.stats.dislikes).toEqual(1);
        // undo the dislike
        const undoDislike = await userTogglesTuitDislikes(uid, tid);
        newTuit = await findTuitById(tid);
        // dislike should be 0 as user undo the dislike
        expect(newTuit.stats.dislikes).toEqual(0);
    })
})

describe("user can dislike a tuit when they already likes the tuit with API", () => {
    // sample tuit to insert
    const sampleTuit = {
        tuit: "Unique sample tuit for test!",
        postedOn: "2022-03-09T00:00:00.000Z"
    }

    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    }

    let uid = null;
    let tid = null;
    let newTuit = null;

    // setup test before running test
    beforeAll(async ()=> {
        let promises = []
        // remove user and tuit before we create our new user and tuit
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuitByContent(sampleTuit.tuit));
        await Promise.all(promises);
        // create a new user and a new tuit
        const author = await createUser(ripley);
        uid = author._id
        newTuit = await createTuitByUser(author._id, sampleTuit);
        tid = newTuit._id;
        // make user already dislikes the tuit
        const doLike = await userTogglesTuitLikes(uid, tid);
    })

    // clean up after test runs
    afterAll(async () => {
        // make sure we remove the dislike after the test
        if (newTuit.stats.dislikes > 0) {
            await userTogglesTuitDislikes(uid, tid);
        }
        let promises = []
        // remove our testing data
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuitByContent(sampleTuit.tuit));
        return Promise.all(promises);
    })

    test("user can dislike a tuit when "
         + "they already likes the tuit with API",async () => {
        newTuit = await findTuitById(tid);
        // user already likes the tuit, so count of likes is 1, count of dislikes is 0.
        expect(newTuit.stats.likes).toEqual(1);
        expect(newTuit.stats.dislikes).toEqual(0);
        // do dislike
        const doDislike = await userTogglesTuitDislikes(uid, tid);
        newTuit = await findTuitById(tid);
        // count of likes should be 0, and dislikes will be 1
        expect(newTuit.stats.likes).toEqual(0);
        expect(newTuit.stats.dislikes).toEqual(1);
    })
})