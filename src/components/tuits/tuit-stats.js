import React, {useEffect} from "react";

const TuitStats = ({tuit, likeTuit}) => {
    console.log("tuit stats is initialized", tuit.likedbyMe)
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
                  <i className={"fas fa-heart me-1"}
                     style={tuit.likedbyMe === true? {color: "red"} : {}}/>
              }
              {/*{*/}
              {/*    tuit.stats && tuit.stats.likes !== undefined &&*/}
              {/*    <i className="far fa-heart me-1"/>*/}
              {/*}*/}
              {tuit.stats && <span>{tuit.stats.likes}</span>}
          </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"></i>
            </div>
        </div>
    );
}
export default TuitStats;