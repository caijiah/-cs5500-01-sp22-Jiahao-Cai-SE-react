/**
 * @file Implements TuitStats component for displaying tuit's stats
 */
import React, {useEffect} from "react";

/**
 * TuitStats component that will display stats of each tuit
 * @param tuit The tuit
 * @param likeTuit callback function for liking a tuit
 * @param dislikeTuit callback function for disliking a tuit
 */
const TuitStats = ({tuit, likeTuit, dislikeTuit}) => {
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
              <span onClick={() => likeTuit(tuit)}>
                  {
                      tuit.stats && tuit.stats.likes !== undefined &&
                      <i className={"fa-regular fa-thumbs-up me-1"}
                         style={tuit.likedByMe === true ? {color: "blue"} : {}}/>
                  }
                  {tuit.stats && <span>{tuit.stats.likes}</span>}
              </span>
            </div>
            <div className="col">
                <span onClick={()=>dislikeTuit(tuit)}>
                  {
                      tuit.stats && tuit.stats.dislikes !== undefined &&
                      <i className={"fa-regular fa-thumbs-down me-1"}
                         style={tuit.dislikedByMe === true ? {color: "red"} : {}}/>
                  }
                    {tuit.stats && <span>{tuit.stats.dislikes}</span>}
              </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
}
export default TuitStats;