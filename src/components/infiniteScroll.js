import React, {useEffect, useRef, useState} from 'react';
import {throttle} from 'throttle-debounce';
import './infiniteScroll.css';
// Reusable scroll component
export const InfinteScroll = function ({getData, dataLength, children, limit, elementHeight, scollThreshold, loader}){
    const scrollRef = useRef(null);
    const [showLoader, setShowLoader] = useState(false);

    const handleOnScrollEvent = (event)=>{
        if (scrollRef.current) {
            const { scrollTop, scrollHeight } = scrollRef.current;
            const scrollablHeight = scrollHeight - elementHeight;
            
            if(scollThreshold * scrollablHeight < scrollTop){
                setShowLoader(true);
                getData(limit, dataLength);
            }
        }
    }

    const throttledScrollEvent  = throttle(200,handleOnScrollEvent);
    
    useEffect(()=>{
        // All checks
        if(dataLength === undefined){
            throw new Error(`"dataLength" cant be undefinded` );
        } 
        if(scollThreshold === undefined){
            throw new Error(`threshold cant be undefinded` );
        } 
        if(scollThreshold >= 1 ){
            throw new Error(`threshold cant be >= 1` );
        }

        if(getData === undefined){
            throw new Error(`getData cant be undefinded` );
        }
        setShowLoader(false);

    },[dataLength, getData, scollThreshold]);

    return(
    <div className='infiniteScroll-outerDiv'>
        {/**  on Scroll   */}
        <div className='infiniteScroll' ref={scrollRef} onScroll={throttledScrollEvent} style={{height:elementHeight, border:`1px solid black`, overflowY:'auto', position:'fixed'}}>
            {children}
        </div>
        {showLoader ? loader: ''}
    </div>);


}