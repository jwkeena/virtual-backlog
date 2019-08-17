import React from 'react';
import './styles.css'




function Init(){    
    var transEndEventNames = {
        'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition' : 'transitionend',
        'OTransition' : 'oTransitionEnd',
        'msTransition' : 'MSTransitionEnd',
        'transition' : 'transitionend'
    }, 

    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    GameList = $('#bk-list > li > div.bk-game'),gamesCount = 13, currentGame = -1, counter = 0;  


GameList.forEach(function(){
    let gameCase = this
    let parent = gameCase.parent()
    let page = gameCase.children('div.bk-page')
    let content = page.children('div.bk-content')
    current = 0;
    
    
    if (counter === 13){
        counter =0;
    }
    
    if(counter < gamesCount /2){
        parent.css('z-index', counter).attr( 'data-stackval', counter );
        counter ++;
    }
    
    else {
        parent.css( 'z-index', gamesCount - 1 - counter ).attr( 'data-stackval', gamesCount - 1 - counter );
        counter ++;	
    }
    

    gameCase.on( 'click', function() {
if (currentGame !== -1 && currentGame !== parent.index()){
    closeCurrent();
}

if(gameCase.hasClass('bk-open')){
    $( this ).removeClass( 'bk-open' ); 
}

else if(gameCase.hasClass('bk-outside' && 'bk-viewinside')){
    $( this ).addClass( 'bk-open' ); 
}

else {			
    gameCase.data( 'opened', true ).addClass( 'bk-outside' ).on( transEndEventName, function() {
        $( this ).off( transEndEventName ).addClass( 'bk-viewinside' );  
        parent.css( 'z-index', gamesCount );
        currentGame = $parent.index();
        console.log("Current Game " + currentgame)
    } );
    current = 0;
    content.removeClass( 'bk-content-current').eq( current ).addClass( 'bk-content-current' );
    
}
})


if (content.length > 1){
    var $navPrev = $( '<span class="bk-page-prev">&lt;</span>' ),
    $navClose =$( '<span class="bk-page-close">X</span>' ),
    $navNext = $( '<span class="bk-page-next">&gt;</span>' );

page.append( $( '<nav></nav>' ).append( $navPrev, $navClose, $navNext ) );

$navPrev.on( 'click', function() {
    if( current > 0 ) {
        --current;
        content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
    }
    return false;
} );

$navNext.on( 'click', function() {
    if( current < content.length - 1 ) {
        ++current;
        content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
    }
    return false;
} );
$navClose.on( 'click', function() {
    
    if( gameCase.data( 'opened' ) ) {
        gameCase.data( 'opened', false ).removeClass( 'bk-viewinside' ).on( transEndEventName, function() {
            $( this ).off( transEndEventName ).removeClass( 'bk-outside' );
            parent.css( 'z-index', parent.data( 'stackval' ) );
            currentGame = -1;
            
        });
    }
  });

 }
})

function closeCurrent(){
    console.log("Closing other books")
    
    var gameCase = gameList.eq( currentGame),
    parent = gameCase.parent();
    console.log(gameCase)
    
    gameCase.removeClass('bk-open');
    gameCase.data( 'opened', false ).removeClass( 'bk-viewinside' ).on( transEndEventName, function(e) {
        $( this ).off( transEndEventName ).removeClass( 'bk-outside');
        parent.css( 'z-index', parent.attr( 'data-stackval' ) );
    } );
    
    }
    

}

// return { init : init };


const Game = props => (
    <li>
    <div className='bk-game game'> 
   
    <div className='bk-front'>
        <div className='bk-cover-back'></div>
        <div className='bk-cover' background_image={props.box_art}>
            <h2><span>  {props.title}  </span> <span> {props.system_type} </span></h2>   
        </div>
    </div>

    <div className='bk-page'>
        <div className='bk-content bk-content-current'>
            <p>{props.description}</p>
        </div>
        <div className='bk-content'>
            <p>{props.is_physical}</p>
            <p>{props.is_beaten}</p>
            <p>{props.personal_rating}</p>
        </div>
        <div className='bk-content'>
            <p>{props.developer}</p>
        </div>
    </div>

    <div className='bk-back'>
        <p>{props.title} </p>
        <p>{props.description} </p>
    </div>

    <div className='bk-right'></div>

    <div className='bk-left' className={props.system_type}>
        <h2><span>{props.title}</span><span>{props.system_type}</span></h2>
    </div>

    <div className='bk-top'></div>

    <div className='bk-bottom'></div>
   
   
    </div>
    </li>
);

export default Game