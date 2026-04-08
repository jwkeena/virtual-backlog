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
            if (this.props.possiblePlatforms[0] === "NONE") {
                const suggestions = this.props.allSystemAbbreviations || [];
                return(
                    <div>
                       {this.props.platformChosen ?
                           <Badge pill variant='primary' style={styles.buffer}>
                               {this.props.platformChosen}
                           </Badge>
                       : null}
                       <input
                           type="text"
                           list="platform-suggestions"
                           placeholder="Enter platform (e.g. PS5, NSW, PC)"
                           onChange={(e) => this.props.choosePlatform(e.target.value.toUpperCase())}
                           style={{padding: "4px 8px", marginTop: "4px"}}
                       />
                       <datalist id="platform-suggestions">
                           {suggestions.map((abbr, i) => (
                               <option key={i} value={abbr} />
                           ))}
                       </datalist>
                    </div>
                )
            } else {
                const suggestions = this.props.allSystemAbbreviations || [];
                const customChosen = this.props.platformChosen && !this.props.possiblePlatforms.includes(this.props.platformChosen);
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
                    {customChosen ?
                        <Badge pill variant='primary' style={styles.buffer}>
                            {this.props.platformChosen}
                        </Badge>
                    : null}
                    <br/>
                    <input
                        type="text"
                        list="platform-suggestions"
                        placeholder="Or type a platform"
                        onChange={(e) => this.props.choosePlatform(e.target.value.toUpperCase())}
                        style={{padding: "4px 8px", marginTop: "6px", fontSize: "13px"}}
                    />
                    <datalist id="platform-suggestions">
                        {suggestions.map((abbr, i) => (
                            <option key={i} value={abbr} />
                        ))}
                    </datalist>
                    </div>
                )
        }
    }
    
}

export default PlatformPills;