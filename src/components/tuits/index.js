import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likeService from "../../services/likes-service";
import * as tuitService from '../../services/tuits-service';

const Tuits = ({tuits = [], refreshTuits}) => {

    const likeTuit = (tuit) =>
        likeService.userTogglesTuitLikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e));

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
                    tuit={tuit}/>
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;