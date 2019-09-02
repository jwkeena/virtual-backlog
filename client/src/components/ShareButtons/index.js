import React, { Component } from 'react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton,RedditShareButton, TumblrShareButton, EmailShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, LinkedinIcon, RedditIcon, TumblrIcon, EmailIcon} from 'react-share';
import './style.css';
  
const title = "Virtual Backlog"

class ShareButtons extends Component {
    render() {
        return (
            <div className="Demo__container">
                <div className="Demo__some-network">
                    <FacebookShareButton
                    url={this.props.customLink}
                    quote={title}
                    className="Demo__some-network__share-button">
                    <FacebookIcon
                        size={32}
                        round />
                    </FacebookShareButton>
                </div>
    
                <div className="Demo__some-network">
                    <TwitterShareButton
                    url={this.props.customLink}
                    title={title}
                    className="Demo__some-network__share-button">
                    <TwitterIcon
                        size={32}
                        round />
                    </TwitterShareButton>
    
                    <div className="Demo__some-network__share-count">
                    &nbsp;
                    </div>
                </div>
    
                <div className="Demo__some-network">
                    <LinkedinShareButton
                    url={this.props.customLink}
                    windowWidth={750}
                    windowHeight={600}
                    className="Demo__some-network__share-button">
                    <LinkedinIcon
                        size={32}
                        round />
                    </LinkedinShareButton>
                </div>
    
                <div className="Demo__some-network">
                    <RedditShareButton
                    url={this.props.customLink}
                    title={title}
                    windowWidth={660}
                    windowHeight={460}
                    className="Demo__some-network__share-button">
                    <RedditIcon
                        size={32}
                        round />
                    </RedditShareButton>
    
                </div>
    
                <div className="Demo__some-network">
                    <TumblrShareButton
                    url={this.props.customLink}
                    title={title}
                    windowWidth={660}
                    windowHeight={460}
                    className="Demo__some-network__share-button">
                    <TumblrIcon
                        size={32}
                        round />
                    </TumblrShareButton>
                </div>
    
                <div className="Demo__some-network">
                    <EmailShareButton
                    url={this.props.customLink}
                    subject={title}
                    body="body"
                    className="Demo__some-network__share-button">
                    <EmailIcon
                        size={32}
                        round />
                    </EmailShareButton>
                </div>
            </div>
        )
    }
}

export default ShareButtons;