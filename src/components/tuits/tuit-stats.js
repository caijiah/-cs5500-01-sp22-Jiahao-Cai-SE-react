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
                {tuit.stats &&
                 <span className='ttr-stats-replies'>{tuit.stats.replies}</span>}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {tuit.stats &&
                 <span className='ttr-stats-retuits'>{tuit.stats.retuits}</span>}
            </div>
            <div className="col">
              <span className='ttr-like-tuit-click'
                  onClick={() => likeTuit(tuit)}>
                  {
                      tuit.stats && tuit.stats.likes !== undefined &&
                      <i className={"fa-regular fa-thumbs-up tuit-button me-1"}
                         style={tuit.likedByMe === true ? {color: "blue"} : {}}/>
                  }
                  {tuit.stats &&
                   <span className='ttr-stats-likes'>{tuit.stats.likes}</span>}
              </span>
            </div>
            <div className="col">
                <span className='ttr-dislike-tuit-click'
                    onClick={()=>dislikeTuit(tuit)}>
                  {
                      tuit.stats && tuit.stats.dislikes !== undefined &&
                      <i className={"fa-regular fa-thumbs-down tuit-button me-1"}
                         style={tuit.dislikedByMe === true ? {color: "red"} : {}}/>
                  }
                    {tuit.stats &&
                     <span className='ttr-stats-dislikes'>{tuit.stats.dislikes}</span>}
              </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
}
export default TuitStats;