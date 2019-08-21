import React, { Fragment } from 'react';
import { Button } from "reactstrap";

const styles = {
    boxArt: {
      width: "125px"
    },
    gameTitle: {
      width: "50%"
    },
    wideButton: {
      width: "100%"
    }
  }

function SearchResults({children}) {
    const chooseGame = children[1]
    return(
        <tbody>
        {children[0].map((item, i) => {
          return (
            <Fragment key={item.site_detail_url}>
              <tr key={item.id}>
                <th 
                  key={item.guid} 
                  scope="row">
                  {i + 1}
                </th>
                <td 
                  key={item.api_detail_url}>
                    <img 
                      key={item.image.date_added}
                      style={styles.boxArt} 
                      src={item.image.medium_url}/>
                </td>
                <td 
                  key={item.name}
                  style={styles.gameTitle}>
                  {item.name}
                </td>
                <td 
                  key={item.date_last_updated}>
                    <Button onClick={() => {chooseGame(i)}}
                      color="secondary" style={styles.wideButton}
                      >
                        select
                    </Button>
                </td>
              </tr>
            </Fragment>
          )
        })}
      </tbody>
    )
}

export default SearchResults;