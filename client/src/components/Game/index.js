import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { Field, Toggle, Label, Textarea, Input } from "@zendeskgarden/react-forms";
import { Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/API';
import axios from 'axios';
// import './styles.css'
// // return { init : init };

const styles = {
    description: {
        fontSize: "13px",
        fontStyle: "italic"
    }, 
    textarea: {
        fontSize: "13px"
    }
}
class Game extends Component {

    state = {
        editingNote: false,
        addingTag: false,
        note: "",
        tag: ""
    }

    updateGame = (event) => {
        let usernameToVerify;
        if (this.props.sharingUser) {
            usernameToVerify = this.props.sharingUser;
        } else {
            usernameToVerify = localStorage.getItem("username")
        }
        const property = event.target.value;
        const currentValue = event.target.checked
        axios
            .post('/api/users/me')
            .then(response => {
                const loggedInUser = response.data
                console.log("logged in as " + loggedInUser + " and requesting access as " + usernameToVerify)
                if (loggedInUser === usernameToVerify) {
                    const propertyToUpdate = {
                        property: property,
                        currentValue: currentValue
                    };
                    if (propertyToUpdate.property === this.props.sortOption) {
                        console.log("match");
                        this.props.handleClose();
                        setTimeout(() => {
                            API.updateGame(this.props.id, propertyToUpdate)
                            .then(res=> {
                                this.props.loadGames();
                            })
                            .catch(err => console.log(err));
                        }, 1000);
                    } else {
                        API.updateGame(this.props.id, propertyToUpdate)
                                .then(res=> {
                                this.props.loadGames();
                                })
                                .catch(err => console.log(err));
                    }
                } else {
                    alert("You are not authorized to make changes to another user's collection.")
                }
            })
            .catch(err => console.log(err))
    }

    deleteGame = () => {
        let usernameToVerify;
        if (this.props.sharingUser) {
            usernameToVerify = this.props.sharingUser;
        } else {
            usernameToVerify = localStorage.getItem("username");
        }
        axios
            .post('/api/users/me')
            .then(response => {
                const loggedInUser = response.data
                console.log("logged in as " + loggedInUser + " and requesting access as " + usernameToVerify)
                if (loggedInUser === usernameToVerify) {
                    const answer = window.confirm("Are you sure you want to delete this game from your collection?");
                    if (answer) {
                        API.deleteGame(this.props.id)
                        .then(res=> {
                            this.props.handleClose();
                            setTimeout(() => {this.props.loadGames()}, 1000)
                        })
                        .catch(err => console.log(err));
                    } else {
                        return;
                    }
                } else {
                    alert("You are not authorized to make changes to another user's collection.");
                }
            }) 
    }

    writeNote = (event) => {
        let value = event.target.value;
        this.setState({
          note: value
        });
    }

    writeTag = (event) => {
        let value = event.target.value.trim();
        if (value === " ") {
            return
        } else {
            this.setState({
              tag: value
            });
        }
    }

    updateNote = () => {
        let usernameToVerify;
        if (this.props.sharingUser) {
            usernameToVerify = this.props.sharingUser;
        } else {
            usernameToVerify = localStorage.getItem("username");
        }
        axios
            .post('/api/users/me')
            .then(response => {
                const loggedInUser = response.data
                console.log("logged in as " + loggedInUser + " and requesting access as " + usernameToVerify)
                if (loggedInUser === usernameToVerify) {
                    this.setState(prevState => ({
                        editingNote: !prevState.editingNote,
                        addingTag: false
                    }), () => {
                        console.log(this.state.note)
                        if (!this.state.editingNote) {
                            API.updateNote(this.props.id, {note: this.state.note})
                                .then(res=> {
                                    this.props.loadGames();
                                })
                                .catch(err => console.log(err));
                        }
                    })
                } else {
                    alert("You are not authorized to make changes to another user's collection.");
                }
            })
    }

    updateTag = (event) => {
        event.preventDefault();
        let usernameToVerify;
        if (this.props.sharingUser) {
            usernameToVerify = this.props.sharingUser;
        } else {
            usernameToVerify = localStorage.getItem("username");
        }
        axios
            .post('/api/users/me')
            .then(response => {
                const loggedInUser = response.data
                console.log("logged in as " + loggedInUser + " and requesting access as " + usernameToVerify)
                if (loggedInUser === usernameToVerify) {
                    this.setState(prevState => ({
                        addingTag: !prevState.addingTag,
                        editingNote: false
                    }), () => {
                        console.log(this.state.tag)
                        if (!this.state.editingNote) {
                            API.updateTag(this.props.id, {tag: this.state.tag})
                                .then(res=> {
                                    this.props.loadGames();
                                })
                                .catch(err => console.log(err));
                        }
                    })
                } else {
                    alert("You are not authorized to make changes to another user's collection.");
                }
            })
    }

    render () {
        return (
            <li 
                key={this.props.id} 
                className={(this.props.zIndex === 1  && this.props.clicked ? 'z-index'+this.props.zCounter + 1 : 'z-index'+this.props.zCounter)} 
                onClick = {this.props.handleClick}>
                    <div className={(this.props.gameOpen === 1 && this.props.clicked ? 'bk-game game' + this.props.id +' bk-outside'  : this.props.gameOpen === 2 && this.props.clicked  ? 'bk-game game'+this.props.id+' bk-outside bk-viewinside' : this.props.gameOpen === 3 && this.props.clicked ? 'bk-game game'+this.props.id+' bk-outside bk-viewinside bk-open' :'bk-game game'+ this.props.id)}> 
        
            <div className='bk-front'>
                <div className='bk-cover-back' style={{backgroundImage: 'url('+ this.props.box_art +')'}}></div>
                <div className={('bk-cover '+ this.props.system_type )} style={{backgroundImage: 'url('+ this.props.box_art +')'}}>
                    <h2><span>  {this.props.title}  </span> <span> {this.props.system_type} </span></h2>   
                </div>
            </div>

            <div className='bk-page'>
                <div className={(this.props.page === 1 && this.props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
                    <a href={this.props.gb_url} target="_blank" rel="noopener noreferrer"><h5>{this.props.title}</h5></a>
                    <span>Year Released: {this.props.year_released}</span><br></br>
                    <span style={styles.description}>{this.props.description}</span><br></br><br></br>
                </div>
                <div className={(this.props.page === 2 && this.props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
                    <h5>Media Type</h5>
                    <span>{(this.props.physical) 
                        ? <div><FontAwesomeIcon icon={faCompactDisc} size="lg"/>&nbsp; Physical</div>
                        : <div><FontAwesomeIcon icon={faCloudDownloadAlt} size="lg"/>&nbsp; Digital</div>}
                    </span>    
                    <br></br>
                    <h5>Options</h5>
                    <Field>
                        <Toggle 
                            checked={this.props.favorite}
                            value="favorite"
                            onChange={this.updateGame}>
                            <Label>All-time favorite</Label>
                        </Toggle>
                    </Field>
                    <Field>
                        <Toggle 
                        checked={this.props.backlog}
                        value="backlog"
                        onChange={this.updateGame}>
                            <Label>Backlog</Label>
                        </Toggle>
                    </Field>
                    <Field>
                        <Toggle 
                            checked={this.props.is_beaten}
                            value="is_beaten"
                            onChange={this.updateGame}>
                            <Label>Beaten</Label>
                        </Toggle>
                    </Field>
                    <Field>
                        <Toggle 
                            checked={this.props.cib}
                            value="cib"
                            onChange={this.updateGame}>
                            <Label>Complete in box</Label>
                        </Toggle>
                    </Field>
                    <Field>
                        <Toggle 
                            checked={this.props.now_playing}
                            value="now_playing"
                            onChange={this.updateGame}>
                            <Label>Now playing</Label>
                        </Toggle>
                    </Field>
                    <Field>
                        <Toggle 
                            checked={this.props.wishlist}
                            value="wishlist"
                            onChange={this.updateGame}>
                            <Label>Wishlist</Label>
                        </Toggle>
                    </Field>
                </div>
                <div className={(this.props.page === 3 && this.props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
                    <h5>Notes</h5>
                    {(this.state.editingNote) ? 
                         <div>
                            <Form>
                                <Field>
                                    <Textarea             
                                        rows="3"
                                        style={styles.textarea}
                                        onChange={this.writeNote} 
                                        defaultValue={this.props.note} 
                                        resizable>
                                    </Textarea>
                                </Field>
                            </Form>
                            <br></br>
                            <Button 
                                size="sm"
                                onClick={this.updateNote} 
                                variant="primary">Submit
                            </Button>
                        </div>
                        :
                        <div>
                            <span style={styles.textarea}>{this.props.note}</span>
                            
                            {(this.props.note === "" || !this.props.note) 
                                ?  
                                <div>
                                    <br></br>
                                    <Button 
                                        size="sm"
                                        onClick={this.updateNote} 
                                        variant="primary">Add note
                                    </Button>
                                </div>
                                : 
                                <div>
                                    <br></br>
                                    <Button 
                                        size="sm"
                                        onClick={this.updateNote} 
                                        variant="primary">Update
                                    </Button>
                                </div>}
                        </div>
                    }
                     <br></br>
                     <h5>Tags</h5>
                     {(this.state.addingTag) ? 
                         <div>
                            <Form onSubmit={this.updateTag}>
                                <Field>
                                    <Input 
                                        value={this.state.tag}
                                        onChange={this.writeTag}>
                                    </Input>                 
                                </Field>
                            </Form>
                            <br></br>
                            <Button 
                                size="sm"
                                onClick={this.updateTag} 
                                variant="primary">Submit
                            </Button>
                        </div>
                        :
                        <div>
                            <span style={styles.textarea}>{this.props.tags}</span>
                            
                            {(this.props.tags.length === 0 || !this.props.tags) 
                                ?  
                                <div>
                                    <br></br>
                                    <Button 
                                        size="sm"
                                        onClick={this.updateTag} 
                                        variant="primary">Add tag
                                    </Button>
                                </div>
                                : 
                                <div>
                                    <br></br>
                                    <Button 
                                        size="sm"
                                        onClick={this.updateTag} 
                                        variant="primary">Add another tag
                                    </Button>
                                </div>}
                        </div>
                    }

                </div>
                <div className={(this.props.page === 4 && this.props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
                    <div className="text-center">
                        <FontAwesomeIcon icon={faExclamationTriangle} size="lg"/><br/><br/>
                        <h5>
                            Danger Zone
                        </h5><br/>
                        <Button value={this.props.id} onClick={this.deleteGame} variant="danger">Delete</Button>
                    </div>
                </div>
            <nav>
            <span className="bk-page-1" onClick = {this.props.handlePage1}>&lt;</span>
            <span className="bk-page-2" onClick = {this.props.handlePage2}>&lt;</span>
            <span className="bk-page-3" onClick = {this.props.handlePage3}>&lt;</span>
            <span className="bk-page-4" onClick = {this.props.handlePage4}>&lt;</span>
            
            </nav>
            <nav>
            <span className="bk-page-prev" onClick = {this.props.handlePageLeft}>&lt;</span>
            <span className="bk-page-close" onClick = {this.props.handleClose}>X</span>
            <span className="bk-page-next" onClick = {this.props.handlePageRight}>&gt;</span>
            </nav>

            </div>


            <div className='bk-back'>
                <p>{this.props.title} </p>
                <p>{this.props.description} </p>
            </div>

            <div className='bk-right'></div>

            <div className={('bk-left ' + this.props.system_type)}>
                <h2><span>{this.props.title}</span><span>{this.props.system_type}</span></h2>
            </div>

            <div className='bk-top'></div>

            <div className='bk-bottom'></div>
        
        
            </div>
           
            </li>
         
            
        )
    }
};

export default Game
