import React from 'react';
import formatTrackTime from '../utils/formatTime';

interface TrackProgressProps {
    track?: boolean; // is track progress displaying for a track
    left: number;
    right: number;
    onChange: (e) => void
}

const TrackProgress: React.FC<TrackProgressProps> =
    ({
        left, right, track = false, onChange
     }) => {
        return (
            <div style={{display: 'flex'}}>
                <input
                    type="range"
                    min={0}
                    max={right}
                    value={left}
                    onChange={onChange}
                />
                {
                    track
                    ? <div>{formatTrackTime(left)} / {formatTrackTime(right)}</div>
                    : <div>{left} / {right}</div>
                }
            </div>
        );
    };

export default TrackProgress;
