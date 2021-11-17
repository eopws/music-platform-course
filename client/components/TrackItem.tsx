import React from 'react';
import {ITrack} from "../types/track";
import {Card, Grid, IconButton} from "@material-ui/core";
import styles from '../styles/TrackItem.module.scss'
import {Delete, Pause, PlayArrow} from "@material-ui/icons";
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import { useTypedSelector } from '../hooks/useTypedSelector';
import formatTrackTime from '../utils/formatTime';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const { currentTime, pause } = useTypedSelector(state => state.player)

    const play = (e) => {
        e.stopPropagation()

        if (!active) {
            setActiveTrack(track)
            playTrack()
        } else {
            pause ? playTrack() : pauseTrack()
        }
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {active && (pause
                    ? <PlayArrow/>
                    : <Pause/>)
                 ||
                 <PlayArrow/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active
                ? <div>{formatTrackTime(currentTime)} / {formatTrackTime(track.duration)}</div>
                : <div>{formatTrackTime(track.duration)}</div>
            }
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;
