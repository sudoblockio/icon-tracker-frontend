import React, { useEffect, useState, useRef } from 'react';
import styles from './Tooltip.module.scss';

const Tooltip = ({ targetId, content, position = 'top' }) => {
    const [visible, setVisible] = useState(false);
    const [positionStyle, setPositionStyle] = useState({});
    const tooltipRef = useRef(null);

    useEffect(() => {
        const targetElement = document.getElementById(targetId);

        if (!targetElement) {
            console.warn(`Element with id "${targetId}" not found.`);
            return;
        }

        const handleMouseEnter = () => {
            setVisible(true);

            // Wait for tooltip to render and then position it
            requestAnimationFrame(() => {
                if (tooltipRef.current) {
                    const targetRect = targetElement.getBoundingClientRect();
                    const tooltipRect = tooltipRef.current.getBoundingClientRect();

                    let top, left;

                    switch (position) {
                        case 'top':
                            top = targetRect.top - tooltipRect.height - 8;
                            left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                            break;
                        case 'right':
                            top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                            left = targetRect.right + 8;
                            break;
                        case 'bottom':
                            top = targetRect.bottom + 8;
                            left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                            break;
                        case 'left':
                            top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                            left = targetRect.left - tooltipRect.width - 8;
                            break;
                        default:
                            top = targetRect.top - tooltipRect.height - 8;
                            left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                    }

                    // Apply styles with position correction to avoid overflow
                    setPositionStyle({
                        top: `${Math.max(top, 0)}px`,
                        left: `${Math.max(left, 0)}px`
                    });
                }
            });
        };

        const handleMouseLeave = () => setVisible(false);

        targetElement.addEventListener('mouseenter', handleMouseEnter);
        targetElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            targetElement.removeEventListener('mouseenter', handleMouseEnter);
            targetElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [targetId, position]);

    return visible ? (
        <div ref={tooltipRef} className={styles.tooltip} style={positionStyle}>
            {content}
        </div>
    ) : null;
};

export default Tooltip;
