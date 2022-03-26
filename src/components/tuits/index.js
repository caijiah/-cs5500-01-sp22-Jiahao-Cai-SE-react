import React, {useEffect, useState} from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likeService from "../../services/likes-service";
import * as tuitService from '../../services/tuits-service';
import * as authService from "../../services/auth-service";
import * as dislikeService from "../../services/dislikes-service"

const Tuits = ({tuits = [], refreshTuits}) => {
    const [profile, setProfile] = useState(undefined);
    const [maintainTuits, setMaintainTuits] = useState(tuits);
    useEffect(async ()=> {
        setMaintainTuits(tuits);
        try {
            const user = await authService.profile();
            setProfile(user);
            const dislikedTuits = await dislikeService.findAllTuitsDislikedByUser("me");
            likeService.findAllTuitsLikedByUser("me")
                .then((likes) => {
                    const likedTuitsIds = likes.map(l => l.tuit._id);
                    const dislikedTuitsIds = dislikedTuits.map(d => d.tuit._id);
                    const fetchTuits = tuits.map((t) => {
                        let copyT = t;
                        if (likedTuitsIds.indexOf(t._id) >= 0) {
                            copyT = {...copyT, likedByMe: true};
                        }
                        if (dislikedTuitsIds.indexOf(t._id) >= 0) {
                            copyT = {...copyT, dislikedByMe: true};
                        }
                        if (t.postedBy._id === profile._id) {
                            copyT = {...copyT, ownedByMe: true}
                        }

                        return copyT;
                    })
                    setMaintainTuits(fetchTuits);
                })
        } catch (e) {
        }
    }, [tuits]);

    const likeTuit = (tuit) => {
        if (profile !== undefined) {
            likeService.userTogglesTuitLikes("me", tuit._id)
                .then(refreshTuits)
                .catch(e => alert(e));
        } else {
            alert("Please log in!")
        }
    }

    const dislikeTuit = (tuit) => {
        if (profile !== undefined) {
            dislikeService.userTogglesTuitDislikes("me", tuit._id)
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