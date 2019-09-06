import React, {Component} from 'react';
import Badge from 'react-bootstrap/Badge';

const styles = {
    buffer: {
        fontSize: "15px",
        marginRight: "6px",
        marginTop: "3px",
        marginBottom: "3px",
        padding: "6px",
        cursor: "pointer"
    }
}

class Tags extends Component {
    render() {
            if (this.props.tags === undefined || this.props.tags.length === 0) {
                return(
                    <div>
                       <Badge variant='secondary' style={styles.buffer}>NONE</Badge>
                    </div>
                )
            } else {
                return(
                    <div>
                    {this.props.tags.map((tag, i) => {
                        return(
                            <Badge 
                                variant={(this.props.selected === tag) ? 'warning' : 'info'}
                                onClick={() => {this.props.chooseTag(tag)}}
                                key={i} 
                                value={tag}
                                style={styles.buffer}>
                                    {tag}
                            </Badge>
                        )
                    })}
                    </div>
                )
        }
    }
    
}

export default Tags;