import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import CSS from "./ImageCompare.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Image } from '@nextui-org/react';


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
        firstImgSrc = "/static/images/photos/pool-photo-03.webp",
        secondImgSrc = "/static/images/photos/pool-photo-02.webp",
        separatorImg = "/static/images/compare/Icon.png",
        containerClass = "",
        cursor = "pointer",
        vertical = false,}: ImageCompareProps)  => {

    const services = useSelector((state: RootState) => state.config.services);


    const separatorRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const diffImgRef = useRef<HTMLImageElement>(null);
    const resizeRef = useRef<HTMLDivElement>(null);
    const [isDown, setIsDown] = useState(false);
    const [offset, setOffset] = useState([0, 0]);
    const [minWidth, setMinWidth] = useState(0);
    const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints;

    
    const handleEvent = (e: MouseEvent | TouchEvent) => {
        console.log("Handle Event")
        if((e as TouchEvent).changedTouches !== undefined )
        {
            return (e as TouchEvent).changedTouches[0]
        }
        return (e as MouseEvent);
    }
    
    
    useEffect(() => {
        const down = () => setIsDown(false);
    
        const dragStart = (e: any) => {
            const event = handleEvent(e);
            console.log("Drag")
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
            console.log("move")

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
            console.log("Is Out of RangeY: " + isOutOfRangeY)
            if (isOutOfRangeY) return;
            console.log("Y Range" + (yPos + offset[1]) + "px")
            separatorRef.current!.style.top = yPos + offset[1] + "px";
            resizeRef.current!.style.height = yPos + offset[1] + "px";
        };
        // console.log(window.screen.availWidth -25)
        // console.log(document.getElementById("beforeImage")!.clientWidth)
        const handleHorizontal = (xPos: number) => {
            const isOutOfRangeX = xPos + offset[0] > (document.getElementById("beforeImage")!.clientWidth) || xPos + offset[0] < 0; //xPos + offset[0] > minWidth || xPos + offset[0] < 0
            console.log("Is Out of RangeX: " +isOutOfRangeX)
            if (isOutOfRangeX) return;
            console.log("X Range" + (xPos + offset[0]) + "px")
            separatorRef.current!.style.left = xPos + offset[0] + "px";
            resizeRef.current!.style.width = xPos + offset[0] + "px";
        };
        const separator = separatorRef.current!;
        separator.addEventListener('mousedown', dragStart, false);
        document.addEventListener('mouseup', down, false);
        document.addEventListener('mousemove', moveDrag, false);    
        separator.addEventListener('touchstart', dragStart, false);
        document.addEventListener('touchend', down, false);
        document.addEventListener('touchmove', moveDrag, false);    

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
            separator.removeEventListener('mousedown', dragStart);
            document.removeEventListener('mouseup', down);
            document.removeEventListener('mousemove', moveDrag);
            separator.removeEventListener('touchstart', dragStart);
            document.removeEventListener('touchend', down);
            document.removeEventListener('touchmove', moveDrag);

        };
      }, [isDown,vertical, offset, minWidth, supportsTouch ]);

    
    return (
<div className={CSS.main}>
    <div ref={wrapRef} className={`${CSS.beforeAfterWrap} ${containerClass}`}>
        <Image id="beforeImage" className={`${CSS.nextImage}`} src={firstImgSrc} alt="Dirty Pool" />
        {/* <img className={CSS.image} src={firstImgSrc} alt="Dirty Pool" /> */}
        <div className={vertical ? `${CSS.resize} ${CSS.vertical}` : `${CSS.resize} ${CSS.horizontal}`} ref={resizeRef}>
            {/* <img ref={diffImgRef}  className={`${CSS.image} ${CSS.second}`} src={secondImgSrc} alt="Clean Pool" /> */}
            <Image ref={diffImgRef} className={`${CSS.nextImage} ${CSS.second}`} src={secondImgSrc} alt="Clean Pool" />
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
