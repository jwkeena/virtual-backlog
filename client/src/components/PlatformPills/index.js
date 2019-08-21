import React from 'react';
import Badge from 'react-bootstrap/Badge';

const styles = {
    buffer: {
        margin: "3px",
        padding: "6px"
    }
}

function PlatformPills({children}) {
    console.log(children)
    if (children[0] === "NONE") {
        return(
            <div>
               <Badge pill variant='danger' style={styles.buffer}>NONE</Badge>
            </div>
        )
    } else {
        return(
            <div>
            {children.map((platform, i) => {
                return(
                    <Badge pill variant='primary' key={i} style={styles.buffer}>{platform}</Badge>
                )
            })}
            </div>
        )
    }
}

export default PlatformPills;