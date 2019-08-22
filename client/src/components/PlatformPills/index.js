import React, {Component} from 'react';
import Badge from 'react-bootstrap/Badge';

const styles = {
    buffer: {
        fontSize: "15px",
        margin: "3px",
        padding: "6px",
        cursor: "pointer"
    }
}

class PlatformPills extends Component {
    render() {
            if (this.props.possiblePlatforms === "NONE") {
                return(
                    <div>
                       <Badge pill variant='danger' style={styles.buffer}>NONE</Badge>
                    </div>
                )
            } else {
                return(
                    <div>
                    {this.props.possiblePlatforms.map((platform, i) => {
                        return(
                            <Badge 
                                pill 
                                variant={(this.props.platformChosen === platform) ? 'primary' : 'danger'}
                                onClick={() => {this.props.choosePlatform(platform)}}
                                key={i} 
                                value={platform}
                                style={styles.buffer}>
                                    {platform}
                            </Badge>
                        )
                    })}
                    </div>
                )
        }
    }
    
}

export default PlatformPills;