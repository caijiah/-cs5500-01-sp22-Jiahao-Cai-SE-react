/**
 * @file Implements Tuits component to display a list of tuit
 * It will contain a list of Tuit component
 */
import React, {useEffect, useState} from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likeService from "../../services/likes-service";
import * as tuitService from '../../services/tuits-service';
import * as authService from "../../services/auth-service";
import * as dislikeService from "../../services/dislikes-service"

const Tuits = ({tuits = [], refreshTuits}) => {
    const [profile, setProfile] = useState(undefined);
    useEffect(async ()=> {
        try {
            const user = await authService.profile();
            if (user) {
                setProfile(user);
            }
        } catch (e) {
        }
    }, []);

    /**
     * Callback function to fetch API to toggle likes of a tuit
     * when user clicks like button
     * @param tuit Tuit that was liked
     */
    const likeTuit = (tuit) => {
        if (profile !== undefined) {
            likeService.userTogglesTuitLikes("me", tuit._id)
                .then(refreshTuits)
                .catch(e => alert(e));
        } else {
            alert("Please log in!")
        }
    }

    /**
     * Callback function to fetch API to toggle dislikes of a tuit
     * when user clicks dislike button
     * @param tuit Tuit that was disliked
     */
    const dislikeTuit = (tuit) => {
        if (profile !== undefined) {
            dislikeService.userTogglesTuitDislikes("me", tuit._id)
                .then(refreshTuits)
                .catch(e => alert(e));
        } else {
            alert("Please log in!")
        }
    }

    /**
     * Callback function to fetch API to delete a tuit
     * when user clicks delete button
     * @param tid Tuit's primary key
     */
    const deleteTuit = (tid) =>
        tuitService.deleteTuit(tid)
            .then(refreshTuits);

    return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          tuits.map && tuits.map(tuit => {
            return (
              <Tuit key={tuit._id}
                    deleteTuit={deleteTuit}
                    likeTuit={likeTuit}
                    dislikeTuit={dislikeTuit}
                    tuit={tuit}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;