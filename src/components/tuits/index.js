import React, {useEffect, useState} from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likeService from "../../services/likes-service";
import * as tuitService from '../../services/tuits-service';
import * as authService from "../../services/auth-service";

const Tuits = ({tuits = [], refreshTuits}) => {
    const [profile, setProfile] = useState({});
    const [maintainTuits, setMaintainTuits] = useState(tuits);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(async ()=> {
        try {
            const user = await authService.profile();
            setProfile(user);
            setLoggedIn(true);
            likeService.findAllTuitsLikedByUser("me")
                .then((likes) => {
                    const likedTuitsIds = likes.map(l => l.tuit._id);
                    console.log(likedTuitsIds);
                    const fetchLikesTuits = tuits.map((t) => {
                        console.log(likedTuitsIds.indexOf(t._id));
                        if (likedTuitsIds.indexOf(t._id) >= 0) {
                            return {...t, likedbyMe: true};
                        }
                        return t;
                    })
                    setMaintainTuits(fetchLikesTuits);
                })
        } catch (e) {
            setLoggedIn(false)
        }
    }, [tuits]);

    const likeTuit = (tuit) => {
        console.log(profile === {})
        if (profile !== undefined || profile !== {}) {
            likeService.userTogglesTuitLikes("me", tuit._id)
                .then(refreshTuits)
                .catch(e => alert(e));
        } else {
            alert("Please log in!")
        }
    }

    const deleteTuit = (tid) =>
        tuitService.deleteTuit(tid)
            .then(refreshTuits);

    return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          maintainTuits.map && maintainTuits.map(tuit => {
            return (
              <Tuit key={tuit._id}
                    loggedIn={loggedIn}
                    deleteTuit={deleteTuit}
                    likeTuit={likeTuit}
                    tuit={tuit}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;