import React, {Component} from 'react';
import Badge from 'react-bootstrap/Badge';

const styles = {
    buffer: {
        fontSize: "15px",
        marginRight: "6px",
        marginTop: "3px",
        marginBottom: "3px",
        marginLeft: "0px",
        cursor: "pointer",
    },
    inline: {
        display: "inline-block"
    }
}

class Tags extends Component {
    render() {
            if (this.props.tags === undefined || this.props.tags.length === 0) {
                return(
                    <div>
                       (none)
                    </div>
                )
            } else {
                return(
                    <div>
                    {this.props.tags.map((tag, i) => {
                        return(
                            <div key={i} style={styles.inline}>
                                <Badge 
                                    variant={(this.props.selectedTag === tag) ? 'warning' : 'primary'}
                                    onClick={() => {this.props.deleteTag(tag)}}
                                    value={tag}
                                    title="Click to delete"
                                    style={styles.buffer}>
                                        {tag}
                                    &nbsp;<span aria-hidden="true" >&times;</span>
                                </Badge>
                            </div>
                        )
                    })}
                    </div>
                )
        }
    }
    
}

export default Tags;