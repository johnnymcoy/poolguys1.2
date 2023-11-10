import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
// import config from "@/api/config/config.json";
import CSS from "./ImageCompare.module.css";
// import Image from 'next/image';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


interface ImageCompareProps {
    firstImgSrc?: string;
    secondImgSrc?: string;
    containerClass?: string;
    cursor?: string;
    separatorImg?: string;
    vertical?: boolean;
    imageSize?: [];
};

export const ImageCompare: React.FC<ImageCompareProps> = ({
        firstImgSrc = "/static/images/photos/pool-photo-02.webp",
        secondImgSrc = "/static/images/photos/pool-photo-03.webp",
        separatorImg = "/static/images/compare/Icon.png",
        containerClass = "",
        cursor = "pointer",
        vertical = false,}: ImageCompareProps)  => {

    const services = useSelector((state: RootState) => state.config.services);
    // const services = config.services;


    const separatorRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const diffImgRef = useRef<HTMLImageElement>(null);
    const resizeRef = useRef<HTMLDivElement>(null);
    const [isDown, setIsDown] = useState(false);
    const [offset, setOffset] = useState([0, 0]);
    const [minWidth, setMinWidth] = useState(0);
    const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints;

    
    const handleEvent = (e: MouseEvent | TouchEvent) => {
        return supportsTouch ? (e as TouchEvent).changedTouches[0] : (e as MouseEvent);
    }
    
    
    useEffect(() => {
        const down = () => setIsDown(false);
    
        const dragStart = (e: any) => {
            const event = handleEvent(e);
            const separator = separatorRef.current!;
            setOffset([
                separator.offsetLeft - event.pageX,
                separator.offsetTop - event.pageY
            ]);
            setIsDown(true);
        };
        const moveDrag = (e: any) => {
            e.preventDefault();
            if (!isDown) return;

            const event = handleEvent(e);
            const xPos = event.pageX;
            const yPos = event.pageY;
            if (vertical) {
                handleVertical(yPos);
            } else {
                handleHorizontal(xPos);
            }
        };
        const handleVertical = (yPos: number) => {
            const isOutOfRangeY = yPos + offset[1] > 475 || yPos + offset[1] < 0;
            // console.log("Is Out of RangeY: " + isOutOfRangeY)
            if (isOutOfRangeY) return;
            // console.log("Y Range" + (yPos + offset[1]) + "px")
            separatorRef.current!.style.top = yPos + offset[1] + "px";
            resizeRef.current!.style.height = yPos + offset[1] + "px";
        };
        
        const handleHorizontal = (xPos: number) => {
            const isOutOfRangeX = xPos + offset[0] > 475 || xPos + offset[0] < 0; //xPos + offset[0] > minWidth || xPos + offset[0] < 0
            // console.log("Is Out of RangeX: " +isOutOfRangeX)
            if (isOutOfRangeX) return;
            // console.log("X Range" + (xPos + offset[0]) + "px")
            separatorRef.current!.style.left = xPos + offset[0] + "px";
            resizeRef.current!.style.width = xPos + offset[0] + "px";
        };
        const separator = separatorRef.current!;
        separator.addEventListener(supportsTouch ? 'touchstart' : 'mousedown', dragStart, false);
        document.addEventListener(supportsTouch ? 'touchend' : 'mouseup', down, false);
        document.addEventListener(supportsTouch ? 'touchmove' : 'mousemove', moveDrag, false);    

        const matches = document.querySelectorAll(`.${CSS.beforeAfterWrap} .${CSS.image}`);
            // If there are at least two images, calculate the minimum width
        if (matches.length >= 2) {
            const minWidthCalc = Math.min(
                (matches[0] as HTMLImageElement).naturalWidth, 
                (matches[1] as HTMLImageElement).naturalWidth
            );
            // Only update state if the minWidth has changed
            if (minWidth !== minWidthCalc) {
                const wrap = wrapRef.current;
                const diffImg = diffImgRef.current;

                if (wrap && diffImg) {
                    wrap.style.width = `${minWidthCalc}px`;
                    diffImg.style.width = `${minWidthCalc}px`;
                    setMinWidth(minWidthCalc);
                }
            }
        }
        return () => {
            separator.removeEventListener(supportsTouch ? 'touchstart' : 'mousedown', dragStart);
            document.removeEventListener(supportsTouch ? 'touchend' : 'mouseup', down);
            document.removeEventListener(supportsTouch ? 'touchmove' : 'mousemove', moveDrag);
        };
      }, [isDown,vertical, offset, minWidth, supportsTouch ]);

    
    return (
<div className={CSS.main}>

    <div ref={wrapRef} className={`${CSS.beforeAfterWrap} ${containerClass}`}>
        <img className={CSS.image} src={firstImgSrc} alt="Dirty Pool" />
        <div className={vertical ? `${CSS.resize} ${CSS.vertical}` : `${CSS.resize} ${CSS.horizontal}`} ref={resizeRef}>
            <img ref={diffImgRef}  className={`${CSS.image} ${CSS.second}`} src={secondImgSrc} alt="Clean Pool" />
        </div>
        <div
          ref={separatorRef}
          style={{ cursor: cursor }}
          className={vertical ? `${CSS.beforeAfterSeperator} ${CSS.vertical}` : `${CSS.beforeAfterSeperator} ${CSS.horizontal}`}
        >
          <div className={vertical ? `${CSS.beforeAfterSeperatorImg} ${CSS.vertical}` : `${CSS.beforeAfterSeperatorImg} ${CSS.horizontal}`}>
            {/* <img className={CSS.image} src={separatorImg} alt="arrow to move icon"/> */}
          </div>
        </div>
    </div>
</div>
);};
